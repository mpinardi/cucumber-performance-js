import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import getColorFns from './get_color_fns'
import { Status, formatterHelpers } from 'cucumber'
import SummaryFormatter from './summary_formatter'
import figures from 'figures'
import { EventEmitter } from 'events'
import Gherkin from 'gherkin'
import moment from 'moment'

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
          start: moment.utc().format(),
          stop: moment.utc().format(),
          duration: moment.duration(1000),
          name: 'example',
          groups: [
            {
              start: moment.utc().format(),
              stop: moment.utc().format(),
              avg: 0,
              min: 0,
              max: 0,
              cnt: 0,
              sum: 0,
              uri: 'a.feature',
              testCases: [
                {
                  steps: [
                    {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      sum: 0,
                      sourceLocation: {},
                      actionLocation: {},
                      text: 'Given a step',
                      status: null,
                    },
                  ],
                  line: 2,
                  name: 'b',
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  sum: 0,
                  sourceLocation: {},
                },
              ],
              chartPoints: [],
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
            'Simulation: example\n' +
              'Group: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
              'Scenario: b cnt:0 avg:0.0000 min:0 max:0 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.0000 min:0 max:0 \n\n' +
              'Runtime: 0:0:1.0\n' +
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
            'Simulation: example\n' +
              'Group: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
              'Scenario: b cnt:0 avg:0.0000 min:0 max:0 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.0000 min:0 max:0 \n\n' +
              'Runtime: 0:0:1.0\n' +
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
            'Simulation: example\n' +
              'Group: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
              'Scenario: b cnt:0 avg:0.0000 min:0 max:0 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.0000 min:0 max:0 \n\n' +
              'Runtime: 0:0:1.0\n' +
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
            'Simulation: example\n' +
              'Group: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
              'Scenario: b cnt:0 avg:0.0000 min:0 max:0 \n\t\t' +
              'Step: Given a step cnt:0 avg:0.0000 min:0 max:0 \n\n' +
              'Runtime: 0:0:1.0\n' +
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
