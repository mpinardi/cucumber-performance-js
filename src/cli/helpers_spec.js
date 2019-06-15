import { beforeEach, describe, it } from 'mocha'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { getSimulationsFromFilesystem } from './helpers'
import { promisify } from 'bluebird'
import EventEmitter from 'events'
import fsExtra from 'fs-extra'
import path from 'path'
import VeggieFilter from '../veggie_filter'
import tmp from 'tmp'

chai.use(sinonChai)

describe('helpers', () => {
  describe('getSimulationsFromFilesystem', () => {
    beforeEach(async function() {
      this.onSource = sinon.stub()
      this.onSaladDocument = sinon.stub()
      this.onVeggie = sinon.stub()
      this.onVeggieAccepted = sinon.stub()
      this.onVeggieRejected = sinon.stub()
      this.eventBroadcaster = new EventEmitter()
      this.eventBroadcaster.on('source', this.onSource)
      this.eventBroadcaster.on('salad-document', this.onSaladDocument)
      this.eventBroadcaster.on('veggie', this.onVeggie)
      this.eventBroadcaster.on('veggie-accepted', this.onVeggieAccepted)
      this.eventBroadcaster.on('veggie-rejected', this.onVeggieRejected)
    })

    describe('empty plan', () => {
      beforeEach(async function() {
        this.tmpDir = await promisify(tmp.dir)()
        this.relativeplanPath = path.join('plans', 'a.plan')
        const planPath = path.join(this.tmpDir, 'plans', 'a.plan')
        await fsExtra.outputFile(planPath, '')
        this.result = await getSimulationsFromFilesystem({
          cwd: this.tmpDir,
          eventBroadcaster: this.eventBroadcaster,
          planPaths: [planPath],
          order: 'defined',
          veggieFilter: new VeggieFilter({}),
        })
      })

      it('returns an empty array', function() {
        expect(this.result).to.eql([])
      })

      it('emits a source event', function() {
        expect(this.onSource).to.have.callCount(1)
        expect(this.onSource).to.have.been.calledWith({
          data: '',
          media: {
            encoding: 'utf-8',
            type: 'text/x.cucumber-perf.salad+plain',
          },
          uri: this.relativeplanPath,
        })
      })

      it('emits a salad-document event', function() {
        expect(this.onSaladDocument).to.have.callCount(1)
        const arg = this.onSaladDocument.firstCall.args[0]
        expect(arg).to.have.keys(['document', 'uri'])
        expect(arg.uri).to.eql(this.relativeplanPath)
      })

      it('does not emit Veggie events', function() {
        expect(this.onVeggie).to.have.callCount(0)
        expect(this.onVeggieAccepted).to.have.callCount(0)
        expect(this.onVeggieRejected).to.have.callCount(0)
      })
    })

    describe('plan with Simulation that does not match the filter', () => {
      beforeEach(async function() {
        this.tmpDir = await promisify(tmp.dir)()
        this.relativeplanPath = path.join('plans', 'a.plan')
        const planPath = path.join(this.tmpDir, 'plans', 'a.plan')
        await fsExtra.outputFile(
          planPath,
          'Plan: a\nSimulation: b\nGroup test.feature'
        )
        this.result = await getSimulationsFromFilesystem({
          cwd: this.tmpDir,
          eventBroadcaster: this.eventBroadcaster,
          planPaths: [planPath],
          order: 'defined',
          veggieFilter: new VeggieFilter({
            planPaths: [`${this.relativeplanPath}:5`],
          }),
        })
      })

      it('returns an empty array', function() {
        expect(this.result).to.eql([])
      })

      it('emits a source event', function() {
        expect(this.onSource).to.have.callCount(1)
        expect(this.onSource).to.have.been.calledWith({
          data: 'Plan: a\nSimulation: b\nGroup test.feature',
          media: {
            encoding: 'utf-8',
            type: 'text/x.cucumber-perf.salad+plain',
          },
          uri: this.relativeplanPath,
        })
      })

      it('emits a Salad-document event', function() {
        expect(this.onSaladDocument).to.have.callCount(1)
        const arg = this.onSaladDocument.firstCall.args[0]
        expect(arg).to.have.keys(['document', 'uri'])
        expect(arg.uri).to.eql(this.relativeplanPath)
      })
    })

    describe('plan with Simulation that matches the filter', () => {
      beforeEach(async function() {
        this.tmpDir = await promisify(tmp.dir)()
        this.relativeplanPath = path.join('plans', 'a.plan')
        const planPath = path.join(this.tmpDir, 'plans', 'a.plan')
        await fsExtra.outputFile(
          planPath,
          'Plan: a\nSimulation: b\nGroup test.feature'
        )
        this.result = await getSimulationsFromFilesystem({
          cwd: this.tmpDir,
          eventBroadcaster: this.eventBroadcaster,
          planPaths: [planPath],
          order: 'defined',
          veggieFilter: new VeggieFilter({}),
        })
      })

      it('returns the test case', function() {
        expect(this.result).to.have.lengthOf(1)
        expect(this.result[0]).to.have.keys(['veggie', 'uri'])
        expect(this.result[0].uri).to.eql(this.relativeplanPath)
      })

      it('emits a source event', function() {
        expect(this.onSource).to.have.callCount(1)
        expect(this.onSource).to.have.been.calledWith({
          data: 'Plan: a\nSimulation: b\nGroup test.feature',
          media: {
            encoding: 'utf-8',
            type: 'text/x.cucumber-perf.salad+plain',
          },
          uri: this.relativeplanPath,
        })
      })

      it('emits a Salad-document event', function() {
        expect(this.onSaladDocument).to.have.callCount(1)
        const arg = this.onSaladDocument.firstCall.args[0]
        expect(arg).to.have.keys(['document', 'uri'])
        expect(arg.uri).to.eql(this.relativeplanPath)
      })

      it('emits a Veggie and Veggie-accepted event', function() {
        expect(this.onVeggie).to.have.callCount(1)
        expect(this.onVeggieAccepted).to.have.callCount(1)
        expect(this.onVeggieRejected).to.have.callCount(0)
        const onVeggieArg = this.onVeggie.firstCall.args[0]
        expect(onVeggieArg).to.have.keys(['veggie', 'uri'])
        expect(onVeggieArg.uri).to.eql(this.relativeplanPath)
        const onVeggieAcceptedArg = this.onVeggieAccepted.firstCall.args[0]
        expect(onVeggieAcceptedArg).to.eql(onVeggieArg)
      })
    })
  })
})
