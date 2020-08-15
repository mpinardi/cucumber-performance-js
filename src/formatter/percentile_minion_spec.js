import { describe, it, beforeEach } from 'mocha'
import { expect } from 'chai'
import getColorFns from './get_color_fns'
import PercentileCreator from './percentile_minion'
import Moment from 'moment'

describe('PercentileMinion', () => {
  var cwd = process.cwd()
  var colr = getColorFns(false)
  var options = {
    options: [],
    strict: true,
    colorFns: colr,
    cwd: cwd,
  }
  describe('with testrun', () => {
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
    })

    describe('create statistics', () => {
      beforeEach(function() {
        this.testRun.groups = [
          {
            text: 'a.feature',
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T22:10:24Z',
            stats: {
              avg: 327.5,
              min: 260,
              max: 410,
              cnt: 10,
              cncrnt: 2.345,
            },
            durations: [250, 300, 350, 410],
            testCases: [
              {
                name: 'tc a',
                stats: {
                  avg: 327.5,
                  min: 260,
                  max: 410,
                  cnt: 10,
                  cncrnt: 0,
                },
                durations: [250, 300, 350, 410],
                sourceLocation: { uri: 'a.feature', line: 8 },
                steps: [
                  {
                    actionLocation: { uri: 'a_steps.js', line: 10 },
                    sourceLocation: { uri: 'a.feature', line: 9 },
                    stats: {
                      avg: 123.75,
                      min: 100,
                      max: 150,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    durations: [100, 130, 135, 150],
                    text: 'step a',
                  },
                  {
                    actionLocation: { uri: 'a_steps.js', line: 15 },
                    sourceLocation: { uri: 'a.feature', line: 10 },
                    stats: {
                      avg: 203.75,
                      min: 160,
                      max: 260,
                      cnt: 10,
                      cncrnt: 0,
                    },
                    durations: [160, 190, 205, 260],
                    text: 'step b',
                  },
                ],
              },
            ],
          },
        ]
        this.percentile = new PercentileCreator(options)
        this.output = this.percentile.run(this.testRun)
      })

      it('validate statistics', function() {
        expect(this.output.statTypes.hasOwnProperty('prctl_90')).to.eql(true)
        expect(this.output.groups[0].stats['prctl_90']).to.eql(410)
        expect(this.output.groups[0].testCases[0].stats['prctl_90']).to.eql(410)
      })
    })
  })
})
