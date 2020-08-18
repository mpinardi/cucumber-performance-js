import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import getColorFns from '../get_color_fns'
import { formatSummary } from './summary_helpers'
import { Status } from 'cucumber'
import Moment from 'moment'

describe('SummaryHelpers', () => {
  describe('formatSummary', () => {
    beforeEach(function() {
      this.testRun = {
        duration: Moment.duration(0),
        name: 'simulation',
        groups: [],
        start: '2019-06-04T14:10:24Z',
        stop: '2019-06-04T22:10:24Z',
        statTypes: {
          avg: {
            abbrivation: 'avg',
            dataType: 'NANOS',
            fullname: 'Average',
            isFloatingPoint: true,
            key: 'avg',
            shortName: 'Avg',
          },
          cncrnt: {
            abbrivation: 'cncrnt',
            dataType: 'OTHER',
            fullName: 'Concurrency',
            isFloatingPoint: true,
            key: 'cncrnt',
            shortName: 'Concurrency',
          },
          cnt: {
            abbrivation: 'cnt',
            dataType: 'COUNT',
            fullname: 'Count',
            isFloatingPoint: false,
            key: 'cnt',
            shortName: 'Count',
          },
          max: {
            abbrivation: 'max',
            dataType: 'NANOS',
            fullname: 'Maximum',
            isFloatingPoint: false,
            key: 'max',
            shortName: 'Max',
          },
          min: {
            abbrivation: 'min',
            dataType: 'NANOS',
            fullname: 'Minimum',
            isFloatingPoint: false,
            key: 'min',
            shortName: 'Min',
          },
        },
      }
      this.options = {
        colorFns: getColorFns(false),
        testRun: this.testRun,
      }
    })

    describe('with no test cases', () => {
      beforeEach(function() {
        this.result = formatSummary(this.options)
      })

      it('outputs step totals, scenario totals, and duration', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:0.0\n'
        )
      })
    })

    describe('with one passing scenario with one passing step', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            stats: {
              avg: 0,
              min: 0,
              max: 0,
              cnt: 0,
              cncrnt: 0,
            },
            testCases: [
              {
                name: 'test case',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
            ],
            duration: 0,
          },
        ]
        this.result = formatSummary(this.options)
      })

      it('outputs the totals and number of each status', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:0.0\nGroup: a.feature avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\tScenario: test case avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n'
        )
      })
    })

    describe('with one passing scenario with one step and hook', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            stats: {
              avg: 0,
              min: 0,
              max: 0,
              cnt: 0,
              cncrnt: 0,
            },
            testCases: [
              {
                name: 'test case',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
            ],
            duration: 0,
          },
        ]
        this.result = formatSummary(this.options)
      })

      it('filter out the hooks', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:0.0\nGroup: a.feature avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\tScenario: test case avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n'
        )
      })
    })

    describe('with one passing scenario with multiple passing steps', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            stats: {
              avg: 0,
              min: 0,
              max: 0,
              cnt: 0,
              cncrnt: 0,
            },
            testCases: [
              {
                name: 'test case',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                  {
                    sourceLocation: { uri: 'a.feature', line: 3 },
                    status: Status.PASSED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
            ],
            duration: 0,
          },
        ]
        this.result = formatSummary(this.options)
      })

      it('outputs the totals and number of each status', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:0.0\nGroup: a.feature avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\tScenario: test case avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n'
        )
      })
    })

    describe('with one of every kind of scenario', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            stats: {
              avg: 0,
              min: 0,
              max: 0,
              cnt: 0,
              cncrnt: 0,
            },
            testCases: [
              {
                name: 'tc passed',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
              {
                name: 'tc failed',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.FAILED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
              {
                name: 'tc ambigious',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                text: 'step a',
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.AMBIGUOUS,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
              {
                name: 'tc pending',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PENDING,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
              {
                name: 'tc skipped',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.SKIPPED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
              {
                name: 'tc undefined',
                stats: {
                  avg: 0,
                  min: 0,
                  max: 0,
                  cnt: 0,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.UNDEFINED,
                    stats: {
                      avg: 0,
                      min: 0,
                      max: 0,
                      cnt: 0,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                ],
              },
            ],
            duration: 0,
          },
        ]
        this.result = formatSummary(this.options)
      })

      it('outputs the totals and number of each status', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:0.0\nGroup: a.feature avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t' +
            'Scenario: tc passed avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t' +
            'Scenario: tc failed avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t' +
            'Scenario: tc ambigious avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t' +
            'Scenario: tc pending avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t' +
            'Scenario: tc skipped avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\tStep: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t' +
            'Scenario: tc undefined avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n\t\t' +
            'Step: step a avg:0.000 cncrnt:0.000 cnt:0 max:0 min:0 \n'
        )
      })
    })

    describe('with a duration of 123 milliseconds', () => {
      beforeEach(function() {
        this.testRun.duration = Moment.duration(123)
        this.result = formatSummary(this.options)
      })

      it('outputs the duration as 0m00.123s', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:0.123\n'
        )
      })
    })

    describe('with a duration of 12.3 seconds', () => {
      beforeEach(function() {
        this.testRun.duration = Moment.duration(123 * 100)
        this.result = formatSummary(this.options)
      })

      it('outputs the duration as 0m12.300s', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:0:12.300\n'
        )
      })
    })

    describe('with a duration of 120.3 seconds', () => {
      beforeEach(function() {
        this.testRun.duration = Moment.duration(123 * 1000)
        this.result = formatSummary(this.options)
      })

      it('outputs the duration as 2m03.000s', function() {
        expect(this.result).to.contain(
          'Simulation: simulation Start: 2019-06-04T14:10:24Z Stop: 2019-06-04T22:10:24Z Duration: 0:2:3.0\n'
        )
      })
    })
  })
})
