import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import getColorFns from '../get_color_fns'
import Moment from 'moment'
import { formatCSV } from './csv_helpers'
import { HEADER, ORDER } from '../taurus_formatter'

describe('CSVHelpers', () => {
  describe('formatCSV', () => {
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
        heading: HEADER,
        statOrder: ORDER,
        testRun: this.testRun,
      }
    })

    describe('with no test cases', () => {
      beforeEach(function() {
        this.result = formatCSV(this.options)
      })

      it('outputs step totals, scenario totals, and duration', function() {
        expect(this.result).to.contain(
          'label,avg_ct,avg_lt,avg_rt,bytes,concurrency,fail,stdev_rt,succ,throughput,perc_0.0,perc_50.0,perc_90.0,perc_95.0,perc_99.0,perc_99.9,perc_100.0,rc_200'
        )
      })
    })

    describe('as strict', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T22:10:24Z',
            stats: {
              avg: 325.25,
              min: 260,
              max: 410,
              cnt: 10,
              cncrnt: 2.345,
            },
            testCases: [
              {
                name: 'tc a',
                stats: {
                  avg: 325.25,
                  min: 260,
                  max: 410,
                  cnt: 10,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 8 },
                steps: [
                  {
                    actionLocation: { uri: 'a_steps.js', line: 10 },
                    sourceLocation: { uri: 'a.feature', line: 9 },
                    stats: {
                      avg: 125.25,
                      min: 100,
                      max: 150,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                  {
                    actionLocation: { uri: 'a_steps.js', line: 15 },
                    sourceLocation: { uri: 'a.feature', line: 10 },
                    stats: {
                      avg: 200.605,
                      min: 160,
                      max: 260,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    text: 'step b',
                  },
                ],
              },
            ],
            durations: [],
          },
        ]
        this.result = formatCSV(this.options)
      })

      it('outputs the expected csv format', function() {
        expect(this.result).to.contain(
          'label,avg_ct,avg_lt,avg_rt,bytes,concurrency,fail,stdev_rt,succ,throughput,perc_0.0,perc_50.0,perc_90.0,perc_95.0,perc_99.0,perc_99.9,perc_100.0,rc_200' +
            '\n"a.feature",0.000,0.000,325.250,0,2.345,0,0.000,0,10,260,0.000,0.000,0.000,0.000,0.000,410,0\n"a.feature.tc a",0.000,0.000,325.250,0,0.000,0,0.000,0,10,260,0.000,0.000,0.000,0.000,0.000,410,0\n"a.feature.tc a.step a",0.000,0.000,125.250,0,0.000,0,0.000,0,10,100,0.000,0.000,0.000,0.000,0.000,150,0\n"a.feature.tc a.step b",0.000,0.000,200.605,0,0.000,0,0.000,0,10,160,0.000,0.000,0.000,0.000,0.000,260,0\n'
        )
      })
    })

    describe('as not strict', () => {
      beforeEach(function() {
        this.testRun.statTypes.pass = {
          abbrivation: 'pass',
          dataType: 'COUNT',
          fullname: 'Pass',
          isFloatingPoint: false,
          key: 'pass',
          shortName: 'Pass',
        }
        this.testRun.statTypes.fail = {
          abbrivation: 'fail',
          dataType: 'COUNT',
          fullname: 'Fail',
          isFloatingPoint: false,
          key: 'fail',
          shortName: 'Fail',
        }
        this.testRun.groups = [
          {
            text: 'a.feature',
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T22:10:24Z',
            stats: {
              avg: 325.25,
              min: 260,
              max: 410,
              pass: 10,
              fail: 2,
              cnt: 10,
              cncrnt: 2.345,
            },
            testCases: [
              {
                name: 'tc a',
                stats: {
                  avg: 325.25,
                  min: 260,
                  max: 410,
                  pass: 10,
                  fail: 2,
                  cnt: 10,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 8 },
                steps: [
                  {
                    actionLocation: { uri: 'a_steps.js', line: 10 },
                    sourceLocation: { uri: 'a.feature', line: 9 },
                    stats: {
                      avg: 125.25,
                      min: 100,
                      max: 150,
                      pass: 10,
                      fail: 2,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    text: 'step a',
                  },
                  {
                    actionLocation: { uri: 'a_steps.js', line: 15 },
                    sourceLocation: { uri: 'a.feature', line: 10 },
                    stats: {
                      avg: 200.605,
                      min: 160,
                      max: 260,
                      pass: 10,
                      fail: 2,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    text: 'step b',
                  },
                ],
              },
            ],
            durations: [],
          },
        ]
        this.result = formatCSV(this.options)
      })

      it('outputs the expected csv format', function() {
        expect(this.result).to.contain(
          'label,avg_ct,avg_lt,avg_rt,bytes,concurrency,fail,stdev_rt,succ,throughput,perc_0.0,perc_50.0,perc_90.0,perc_95.0,perc_99.0,perc_99.9,perc_100.0,rc_200' +
            '\n"a.feature",0.000,0.000,325.250,0,2.345,2,0.000,10,10,260,0.000,0.000,0.000,0.000,0.000,410,0\n"a.feature.tc a",0.000,0.000,325.250,0,0.000,2,0.000,10,10,260,0.000,0.000,0.000,0.000,0.000,410,0\n"a.feature.tc a.step a",0.000,0.000,125.250,0,0.000,2,0.000,10,10,100,0.000,0.000,0.000,0.000,0.000,150,0\n"a.feature.tc a.step b",0.000,0.000,200.605,0,0.000,2,0.000,10,10,160,0.000,0.000,0.000,0.000,0.000,260,0\n'
        )
      })
    })
    
    describe('with commas', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T22:10:24Z',
            stats: {
              avg: 325.25,
              min: 260,
              max: 410,
              cnt: 10,
              cncrnt: 2.345,
            },
            testCases: [
              {
                name: 'tc a',
                stats: {
                  avg: 325.25,
                  min: 260,
                  max: 410,
                  cnt: 10,
                  cncrnt: 0,
                },
                sourceLocation: { uri: 'a.feature', line: 8 },
                steps: [
                  {
                    actionLocation: { uri: 'a_steps.js', line: 10 },
                    sourceLocation: { uri: 'a.feature', line: 9 },
                    stats: {
                      avg: 125.25,
                      min: 100,
                      max: 150,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    text: 'step a, what',
                  },
                  {
                    actionLocation: { uri: 'a_steps.js', line: 15 },
                    sourceLocation: { uri: 'a.feature', line: 10 },
                    stats: {
                      avg: 200.605,
                      min: 160,
                      max: 260,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    text: 'step b, "double quotes"',
                  },
                ],
              },
            ],
            durations: [],
          },
        ]
        this.result = formatCSV(this.options)
      })

      it('outputs the expected csv format', function() {
        expect(this.result).to.contain(
          'label,avg_ct,avg_lt,avg_rt,bytes,concurrency,fail,stdev_rt,succ,throughput,perc_0.0,perc_50.0,perc_90.0,perc_95.0,perc_99.0,perc_99.9,perc_100.0,rc_200' +
            '\n"a.feature",0.000,0.000,325.250,0,2.345,0,0.000,0,10,260,0.000,0.000,0.000,0.000,0.000,410,0\n"a.feature.tc a",0.000,0.000,325.250,0,0.000,0,0.000,0,10,260,0.000,0.000,0.000,0.000,0.000,410,0\n"a.feature.tc a.step a, what",0.000,0.000,125.250,0,0.000,0,0.000,0,10,100,0.000,0.000,0.000,0.000,0.000,150,0\n"a.feature.tc a.step b, ""double quotes""",0.000,0.000,200.605,0,0.000,0,0.000,0,10,160,0.000,0.000,0.000,0.000,0.000,260,0\n'
        )
      })
    })

  })
})
