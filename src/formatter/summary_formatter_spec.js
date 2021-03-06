import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import getColorFns from './get_color_fns'
import { Status, formatterHelpers } from 'cucumber'
import SummaryFormatter from './summary_formatter'
import figures from 'figures'
import { EventEmitter } from 'events'
import Gherkin from 'gherkin'
import moment from 'moment'
import { statType } from './statistics'

describe('SummaryFormatter', () => {
  beforeEach(function() {
    this.output = ''
    const logFn = data => {
      this.output += data
    }
    this.eventBroadcaster = new EventEmitter()
    this.summaryFormatter = new SummaryFormatter({
      colorFns: getColorFns(false),
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new formatterHelpers.EventDataCollector(
        this.eventBroadcaster
      ),
      log: logFn,
      stream: process.stdout,
      options: [],
    })
  })

  describe('features', () => {
    beforeEach(function() {
      const events = Gherkin.generateEvents(
        'Feature: a\nScenario: b\nGiven a step',
        'a.feature'
      )
      events.forEach(event => {
        this.eventBroadcaster.emit(event.type, event)
        if (event.type === 'pickle') {
          this.eventBroadcaster.emit('pickle-accepted', {
            type: 'pickle-accepted',
            pickle: event.pickle,
            uri: event.uri,
          })
        }
      })
      this.testCase = { sourceLocation: { uri: 'a.feature', line: 2 } }
    })

    describe('results', () => {
      beforeEach(function() {
        this.result = {
          start: '2019-06-04T14:10:24Z',
          stop: '2019-06-04T22:10:24Z',
          duration: moment.duration(1000),
          name: 'example',
          statTypes: {
            cnt: statType.COUNT,
            avg: statType.AVERAGE,
            min: statType.MINIMUM,
            max: statType.MAXIMUM,
            cncrnt: statType.CONCURRENCY,
          },
          groups: [
            {
              start: moment.utc().format(),
              stop: moment.utc().format(),
              stats: {
                cnt: 0,
                // eslint-disable-next-line prettier/prettier
                avg: 0.000,
                min: 0,
                max: 0,
                // eslint-disable-next-line prettier/prettier
                cncrnt: 0.000,
              },
              uri: 'a.feature',
              testCases: [
                {
                  steps: [
                    {
                      stats: {
                        cnt: 0,
                        // eslint-disable-next-line prettier/prettier
                        avg: 0.000,
                        min: 0,
                        max: 0,
                        // eslint-disable-next-line prettier/prettier
                        cncrnt: 0.000,
                      },
                      sourceLocation: {},
                      actionLocation: {},
                      text: 'Given a step',
                      status: null,
                    },
                  ],
                  line: 2,
                  name: 'b',
                  stats: {
                    cnt: 0,
                    // eslint-disable-next-line prettier/prettier
                    avg: 0.000,
                    min: 0,
                    max: 0,
                    // eslint-disable-next-line prettier/prettier
                    cncrnt: 0.000,
                  },
                  sourceLocation: {},
                },
              ],
            },
          ],
        }
      })

      describe('with a failing scenario', () => {
        beforeEach(function() {
          this.eventBroadcaster.emit('test-case-prepared', {
            sourceLocation: this.testCase.sourceLocation,
            steps: [
              {
                sourceLocation: { uri: 'a.feature', line: 2 },
                actionLocation: { uri: 'steps.js', line: 4 },
              },
            ],
          })
          this.result.groups[0].hasIssues = true
          this.result.groups[0].testCases[0].hasIssues = true
          this.result.groups[0].testCases[0].steps[0].issues = [
            { exception: 'error', cnt: 10, status: Status.FAILED },
          ]
          this.result.groups[0].testCases[0].steps[0].sourceLocation = {
            uri: 'a.feature',
            line: 3,
          }
          this.result.groups[0].testCases[0].sourceLocation = {
            uri: 'a.feature',
            line: 2,
          }
          this.result.groups[0].testCases[0].steps[0].actionLocation = {
            uri: 'steps.js',
            line: 4,
          }
          this.eventBroadcaster.emit(
            'simulation-statistics-finished',
            this.result
          )
        })

        it('logs the issue', function() {
          expect(this.output).to.eql(
            '\nSimulation: example Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:1.0\n' +
              'Group: undefined cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t' +
              'Scenario: b cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\n' +
              'Issues:\n' +
              '1) Scenario: b # a.feature:2\n' +
              `   ${figures.cross} Given a step # steps.js:4\n` +
              '       1) Count: 10\n' +
              '          error\n'
          )
        })
      })

      describe('with an ambiguous step', () => {
        beforeEach(function() {
          this.eventBroadcaster.emit('test-case-prepared', {
            sourceLocation: this.testCase.sourceLocation,
            steps: [
              {
                sourceLocation: { uri: 'a.feature', line: 2 },
                actionLocation: { uri: 'steps.js', line: 4 },
              },
            ],
          })
          this.result.groups[0].hasIssues = true
          this.result.groups[0].testCases[0].hasIssues = true
          this.result.groups[0].testCases[0].steps[0].issues = [
            {
              exception:
                'Multiple step definitions match:\n' +
                '  pattern1        - steps.js:3\n' +
                '  longer pattern2 - steps.js:4',
              cnt: 5,
              status: Status.AMBIGUOUS,
            },
          ]
          this.result.groups[0].testCases[0].steps[0].sourceLocation = {
            uri: 'a.feature',
            line: 3,
          }
          this.result.groups[0].testCases[0].sourceLocation = {
            uri: 'a.feature',
            line: 2,
          }
          this.result.groups[0].testCases[0].steps[0].actionLocation = {
            uri: 'steps.js',
            line: 4,
          }
          this.eventBroadcaster.emit(
            'simulation-statistics-finished',
            this.result
          )
        })

        it('logs the issue', function() {
          expect(this.output).to.eql(
            '\nSimulation: example Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:1.0\n' +
              'Group: undefined cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t' +
              'Scenario: b cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\n' +
              'Issues:\n' +
              '1) Scenario: b # a.feature:2\n' +
              `   ${figures.cross} Given a step # steps.js:4\n` +
              '       1) Count: 5\n' +
              '          Multiple step definitions match:\n' +
              '            pattern1        - steps.js:3\n' +
              '            longer pattern2 - steps.js:4\n'
          )
        })
      })

      describe('with an undefined step', () => {
        beforeEach(function() {
          this.eventBroadcaster.emit('test-case-prepared', {
            sourceLocation: this.testCase.sourceLocation,
            steps: [
              {
                sourceLocation: { uri: 'a.feature', line: 3 },
                actionLocation: { uri: 'steps.js', line: 4 },
              },
            ],
          })
          this.result.groups[0].hasIssues = true
          this.result.groups[0].testCases[0].hasIssues = true
          this.result.groups[0].testCases[0].steps[0].issues = [
            { cnt: 20, status: Status.UNDEFINED },
          ]
          this.result.groups[0].testCases[0].steps[0].sourceLocation = {
            uri: 'a.feature',
            line: 3,
          }
          this.result.groups[0].testCases[0].sourceLocation = {
            uri: 'a.feature',
            line: 2,
          }
          this.result.groups[0].testCases[0].steps[0].actionLocation = {
            uri: 'steps.js',
            line: 4,
          }
          this.eventBroadcaster.emit(
            'simulation-statistics-finished',
            this.result
          )
        })

        it('logs the issue', function() {
          expect(this.output).to.eql(
            '\nSimulation: example Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:1.0\n' +
              'Group: undefined cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t' +
              'Scenario: b cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\n' +
              'Issues:\n' +
              '1) Scenario: b # a.feature:2\n' +
              `   ? Given a step # steps.js:4\n` +
              '       1) Count: 20\n' +
              '          Undefined. Implement this step.\n'
          )
        })
      })

      describe('with a pending step', () => {
        beforeEach(function() {
          this.eventBroadcaster.emit('test-case-prepared', {
            sourceLocation: this.testCase.sourceLocation,
            steps: [
              {
                sourceLocation: { uri: 'a.feature', line: 3 },
                actionLocation: { uri: 'steps.js', line: 4 },
              },
            ],
          })
          this.result.groups[0].hasIssues = true
          this.result.groups[0].testCases[0].hasIssues = true
          this.result.groups[0].testCases[0].steps[0].issues = [
            { cnt: 20, status: Status.PENDING },
          ]
          this.result.groups[0].testCases[0].steps[0].sourceLocation = {
            uri: 'a.feature',
            line: 3,
          }
          this.result.groups[0].testCases[0].sourceLocation = {
            uri: 'a.feature',
            line: 2,
          }
          this.result.groups[0].testCases[0].steps[0].actionLocation = {
            uri: 'steps.js',
            line: 4,
          }
          this.eventBroadcaster.emit(
            'simulation-statistics-finished',
            this.result
          )
        })

        it('logs the issue', function() {
          expect(this.output).to.eql(
            '\nSimulation: example Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:1.0\n' +
              'Group: undefined cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t' +
              'Scenario: b cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.000 min:0 max:0 cncrnt:0.000 \n\n' +
              'Issues:\n' +
              '1) Scenario: b # a.feature:2\n' +
              `   ? Given a step # steps.js:4\n` +
              '       1) Count: 20\n' +
              '          Pending\n'
          )
        })
      })
    })
  })
})
