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
          'Simulation: simulation\n\nRuntime: 0:0:0.0'
        )
      })
    })

    describe('with one passing scenario with one passing step', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            avg: 0,
            min: 0,
            max: 0,
            cnt: 0,
            testCases: [
              {
                name: 'test case',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
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
          'Simulation: simulation\nGroup: a.feature cnt:0 avg:0.0000 min:0 max:0 \n\tScenario: test case cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\nRuntime: 0:0:0.0'
        )
      })
    })

    describe('with one passing scenario with one step and hook', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            avg: 0,
            min: 0,
            max: 0,
            cnt: 0,
            testCases: [
              {
                name: 'test case',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
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
          'Simulation: simulation\nGroup: a.feature cnt:0 avg:0.0000 min:0 max:0 \n\tScenario: test case cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\nRuntime: 0:0:0.0'
        )
      })
    })

    describe('with one passing scenario with multiple passing steps', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            avg: 0,
            min: 0,
            max: 0,
            cnt: 0,
            testCases: [
              {
                name: 'test case',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
                  },
                  {
                    sourceLocation: { uri: 'a.feature', line: 3 },
                    status: Status.PASSED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
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
          'Simulation: simulation\nGroup: a.feature cnt:0 avg:0.0000 min:0 max:0 \n\tScenario: test case cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\nRuntime: 0:0:0.0'
        )
      })
    })

    describe('with one of every kind of scenario', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            avg: 0,
            min: 0,
            max: 0,
            cnt: 0,
            testCases: [
              {
                name: 'tc passed',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PASSED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                name: 'tc failed',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.FAILED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                name: 'tc ambigious',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.AMBIGUOUS,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                name: 'tc pending',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.PENDING,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                name: 'tc skipped',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.SKIPPED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
                  },
                ],
              },
              {
                name: 'tc undefined',
                cnt: 0,
                avg: 0,
                min: 0,
                max: 0,
                sourceLocation: { uri: 'a.feature', line: 1 },
                steps: [
                  {
                    sourceLocation: { uri: 'a.feature', line: 2 },
                    status: Status.UNDEFINED,
                    cnt: 0,
                    avg: 0,
                    min: 0,
                    max: 0,
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
          'Simulation: simulation\nGroup: a.feature cnt:0 avg:0.0000 min:0 max:0 \n\t' +
            'Scenario: tc passed cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
            'Scenario: tc failed cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
            'Scenario: tc ambigious cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
            'Scenario: tc pending cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
            'Scenario: tc skipped cnt:0 avg:0.0000 min:0 max:0 \n\t\tStep: undefined cnt:0 avg:0.0000 min:0 max:0 \n\t' +
            'Scenario: tc undefined cnt:0 avg:0.0000 min:0 max:0 \n\t\t' +
            'Step: undefined cnt:0 avg:0.0000 min:0 max:0 \n\nRuntime: 0:0:0.0'
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
          'Simulation: simulation\n\nRuntime: 0:0:0.123'
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
          'Simulation: simulation\n\nRuntime: 0:0:12.300'
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
          'Simulation: simulation\n\nRuntime: 0:2:3.0'
        )
      })
    })
  })
})
