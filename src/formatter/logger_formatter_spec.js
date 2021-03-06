import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import LoggerFormatter from './logger_formatter'
import { formatterHelpers, Status } from 'cucumber'

import getColorFns from './get_color_fns'
import { EventEmitter } from 'events'
import fs from 'mz/fs'
import path from 'path'

describe('loggerFormatter', () => {
  describe('using stdout', () => {
    beforeEach(function() {
      this.output = ''
      const logFn = data => {
        this.output += data
      }
      this.eventBroadcaster = new EventEmitter()
      this.loggerFormatter = new LoggerFormatter({
        colorFns: getColorFns(true),
        eventBroadcaster: this.eventBroadcaster,
        eventDataCollector: new formatterHelpers.EventDataCollector(
          this.eventBroadcaster
        ),
        log: logFn,
        stream: process.stdout,
        options: [],
      })
    })
    it('verify output', function() {
      expect(this.output).to.eql(
        'No output path was specified! Unable to log plan execution results.'
      )
    })
  })
  describe('using out file', () => {
    beforeEach(async function() {
      this.eventBroadcaster = new EventEmitter()
      const fd = await fs.open(
        path.resolve(process.cwd(), '/test/log.txt'),
        'w'
      )
      let stream = fs.createWriteStream(null, { fd })
      this.loggerFormatter = new LoggerFormatter({
        colorFns: getColorFns(true),
        eventBroadcaster: this.eventBroadcaster,
        eventDataCollector: new formatterHelpers.EventDataCollector(
          this.eventBroadcaster
        ),
        log: ::stream.write,
        stream: stream,
        options: [],
      })
    })
    describe('cuke-run finished', () => {
      beforeEach(function() {
        let data = {
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
          start: '2019-06-04T14:10:24Z',
          stop: '2019-06-04T16:10:24Z',
          duration: 270,
          success: true,
        }
        let group = {
          count: 2,
          runners: 2,
          maxRunners: 2,
          ran: 1,
          running: 1,
          text: 'a.feature',
          processId: 0,
          arguments: [],
          testCases: [],
        }
        this.eventData = { result: data, group }
        this.eventBroadcaster.emit('cuke-run-finished', {
          data: this.eventData,
        })
      })

      it('verify output', async function() {
        // expect(this.output).to.eql('')
        let res = await fs.readFile(
          path.resolve(process.cwd(), '/test/log.txt')
        )
        let json = JSON.parse(res)
        expect(json).to.eql(this.eventData)
      })

      describe('cuke-run finished 2', () => {
        beforeEach(function() {
          let data = {
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
                    stop: '2019-06-04T14:50:24Z',
                    sourceLocation: { line: 3, uri: 'a.feature' },
                    actionLocation: { line: 4, uri: 'steps.js' },
                    duration: 75,
                    status: Status.PASSED,
                    text: 'step a',
                  },
                ],
                start: '2019-06-04T14:10:24Z',
                stop: '2019-06-04T14:50:24Z',
                duration: 75,
                sourceLocation: { line: 2, uri: 'a.feature' },
                name: 'tc b',
                status: Status.PASSED,
              },
            ],
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T15:10:24Z',
            duration: 200,
            success: true,
          }
          let group = {
            count: 2,
            runners: 2,
            maxRunners: 2,
            ran: 2,
            running: 0,
            text: 'a.feature',
            processId: 0,
            arguments: [],
            testCases: [],
          }
          // ...data
          let eventData2 = { result: data, group }
          this.eventBroadcaster.emit('cuke-run-finished', { data: eventData2 })
          this.eventData = [this.eventData, eventData2]
        })

        it('verify output', async function() {
          // expect(this.output).to.eql('')
          let res = await fs.readFile(
            path.resolve(process.cwd(), '/test/log.txt')
          )
          let json = JSON.parse('[' + res + ']')
          expect(json).to.eql(this.eventData)
        })

        describe('using input file', () => {
          beforeEach(function(done) {
            this.timeout(4000)
            this.output = ''
            this.eventBroadcaster = new EventEmitter()
            const logFn = data => {
              this.output += data
            }
            this.eventBroadcaster.on('simulation-run-finished', data => {
              this.eventData = data
              done()
            })

            this.loggerFormatter = new LoggerFormatter({
              colorFns: getColorFns(false),
              cwd: process.cwd(),
              eventBroadcaster: this.eventBroadcaster,
              eventDataCollector: new formatterHelpers.EventDataCollector(
                this.eventBroadcaster
              ),
              log: logFn,
              stream: process.stdout,
              options: ['/test/log.txt'],
            })
            this.eventBroadcaster.emit('perf-run-started')
          })

          it('verify output', function() {
            expect(this.eventData.data).include({
              start: '2019-06-04T14:10:24Z',
              stop: '2019-06-04T16:10:24Z',
              name: null,
              success: true,
            })
          })
        })
      })
    })
  })
})
