import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import { createMock } from './test_helpers'
import getColorFns from './get_color_fns'
import { Status, formatterHelpers } from 'cucumber'
import ProgressFormatter from './progress_formatter'
import { EventEmitter } from 'events'

describe('ProgressFormatter', () => {
  beforeEach(function() {
    this.output = ''
    const logFn = data => {
      this.output += data
    }
    this.eventBroadcaster = new EventEmitter()
    this.progressFormatter = new ProgressFormatter({
      colorFns: getColorFns(true),
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new formatterHelpers.EventDataCollector(
        this.eventBroadcaster
      ),
      log: logFn,
      snippetBuilder: createMock({ build: 'snippet' }),
    })
  })

  describe('results', () => {
    beforeEach(function() {
      this.result = {
        start: '2019-06-04T14:10:24Z',
        stop: '2019-06-04T22:10:24Z',
        duration: 0,
        testCases: [
          {
            steps: [
              {
                start: '2019-06-04T14:10:24Z',
                stop: '2019-06-04T16:10:24Z',
                sourceLocation: { line: 3, uri: 'a.feature' },
                actionLocation: { line: 4, uri: 'steps.js' },
                duration: 150,
                status: Status.PASSED,
                text: 'step a',
              },
            ],
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T16:10:24Z',
            duration: 150,
            sourceLocation: { line: 2, uri: 'a.feature' },
            name: 'tc a',
            status: Status.PASSED,
          },
          {
            steps: [
              {
                start: '2019-06-04T14:10:24Z',
                stop: '2019-06-04T15:10:24Z',
                sourceLocation: { line: 3, uri: 'a.feature' },
                actionLocation: { line: 4, uri: 'steps.js' },
                duration: 120,
                status: Status.PASSED,
                text: 'step a',
              },
            ],
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T15:10:24Z',
            duration: 120,
            sourceLocation: { line: 2, uri: 'a.feature' },
            name: 'tc b',
            status: Status.PASSED,
          },
        ],
        success: true,
      }
      this.group = {
        count: 10,
        runners: 2,
        maxRunners: 4,
        ran: 4,
        running: 2,
        text: 'a.feature',
        processId: 1,
      }
    })

    describe('start', () => {
      beforeEach(function() {
        this.result.sucess = false
        const group = this.group
        const eventData = { group }
        this.eventBroadcaster.emit('cuke-run-started', { data: eventData })
      })
      it('logs the issue', function() {
        expect(this.output).to.eql('\ra:2-4>4')
      })
    })

    describe('finished with passed group', () => {
      beforeEach(function() {
        const group = this.group
        const result = this.result
        const eventData = { result, group }
        this.eventBroadcaster.emit('cuke-run-finished', { data: eventData })
      })

      it('logs the issue', function() {
        expect(this.output).to.eql('\ra:2-4>\u001b[32m4\u001b[39m')
      })
    })

    describe('finished with failing group', () => {
      beforeEach(function() {
        this.result.success = false
        const group = this.group
        const result = this.result
        const eventData = { result, group }
        this.eventBroadcaster.emit('cuke-run-finished', { data: eventData })
      })

      it('logs the issue', function() {
        expect(this.output).to.eql('\ra:2-4>\u001b[31m4\u001b[39m')
      })
    })

    describe('finished with passed and new runner', () => {
      beforeEach(function() {
        this.group.running = 3
        this.group.runners = 3
        this.group.ran = 5
        const group = this.group
        const result = this.result
        const eventData = { result, group }
        this.eventBroadcaster.emit('cuke-run-finished', { data: eventData })
      })

      it('logs the issue', function() {
        expect(this.output).to.eql('\ra:3-4>\u001b[32m5\u001b[39m')
      })

      describe('started new group', () => {
        beforeEach(function() {
          this.group.running = 1
          this.group.runners = 1
          this.group.ran = 0
          this.group.text = 'b.feature'
          const group = this.group
          const eventData = { group }
          this.eventBroadcaster.emit('cuke-run-started', { data: eventData })
        })

        it('logs the issue', function() {
          expect(this.output).to.eql('\ra:3-4>\u001b[32m5\u001b[39m\rb:1-4>0')
        })
      })
    })
  })
})
