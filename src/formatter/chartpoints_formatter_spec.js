import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import ChartPointsFormatter from './chartpoints_formatter'
import { formatterHelpers } from 'cucumber'
import getColorFns from './get_color_fns'
import { EventEmitter } from 'events'

describe('ChartPointsFormatter', () => {
  beforeEach(function() {
    this.output = ''
    const logFn = data => {
      this.output += data
    }
    this.eventBroadcaster = new EventEmitter()
    this.chartPointsFormatter = new ChartPointsFormatter({
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

  describe('chartpoints', () => {
    beforeEach(function() {
      this.cp = {
        chartPoints: [
          {
            avg: 270,
            cnt: 1,
            max: 270,
            min: 270,
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T14:34:24Z',
            sum: 270,
            testCases: [
              {
                avg: 150,
                cnt: 1,
                max: 150,
                min: 150,
                name: 'tc a',
                sourceLocation: {
                  line: 2,
                  uri: 'a.feature',
                },
                start: '2019-06-04T14:10:24Z',
                steps: [
                  {
                    avg: 150,
                    cnt: 1,
                    max: 150,
                    min: 150,
                    sourceLocation: {
                      line: 3,
                      uri: 'a.feature',
                    },
                    actionLocation: {
                      line: 4,
                      uri: 'steps.js',
                    },
                    start: '2019-06-04T14:10:24Z',
                    stop: '2019-06-04T16:10:24Z',
                    sum: 150,
                    text: 'step a',
                  },
                ],
                stop: '2019-06-04T16:10:24Z',
                sum: 150,
              },
              {
                avg: 120,
                cnt: 1,
                max: 120,
                min: 120,
                name: 'tc b',
                sourceLocation: {
                  line: 2,
                  uri: 'a.feature',
                },
                start: '2019-06-04T14:10:24Z',
                steps: [
                  {
                    avg: 120,
                    cnt: 1,
                    max: 120,
                    min: 120,
                    sourceLocation: {
                      line: 3,
                      uri: 'a.feature',
                    },
                    actionLocation: {
                      line: 4,
                      uri: 'steps.js',
                    },
                    start: '2019-06-04T14:10:24Z',
                    stop: '2019-06-04T15:10:24Z',
                    sum: 120,
                    text: 'step a',
                  },
                ],
                stop: '2019-06-04T15:10:24Z',
                sum: 120,
              },
            ],
            text: 'a.feature',
          },
          {
            avg: 225,
            cnt: 1,
            max: 225,
            min: 225,
            start: '2019-06-04T16:10:24Z',
            stop: '2019-06-04T18:10:24Z',
            sum: 225,
            testCases: [
              {
                avg: 150,
                cnt: 1,
                max: 150,
                min: 150,
                name: 'tc a',
                sourceLocation: {
                  line: 2,
                  uri: 'a.feature',
                },
                start: '2019-06-04T16:10:24Z',
                steps: [
                  {
                    avg: 150,
                    cnt: 1,
                    max: 150,
                    min: 150,
                    sourceLocation: {
                      line: 3,
                      uri: 'a.feature',
                    },
                    actionLocation: {
                      line: 4,
                      uri: 'steps.js',
                    },
                    start: '2019-06-04T16:10:24Z',
                    stop: '2019-06-04T18:10:24Z',
                    sum: 150,
                    text: 'step a',
                  },
                ],
                stop: '2019-06-04T18:10:24Z',
                sum: 150,
              },
              {
                avg: 75,
                cnt: 1,
                max: 75,
                min: 75,
                name: 'tc b',
                sourceLocation: {
                  line: 2,
                  uri: 'a.feature',
                },
                start: '2019-06-04T16:10:24Z',
                steps: [
                  {
                    avg: 75,
                    cnt: 1,
                    max: 75,
                    min: 75,
                    sourceLocation: {
                      line: 3,
                      uri: 'a.feature',
                    },
                    actionLocation: {
                      line: 4,
                      uri: 'steps.js',
                    },
                    start: '2019-06-04T16:10:24Z',
                    stop: '2019-06-04T18:10:24Z',
                    sum: 75,
                    text: 'step a',
                  },
                ],
                stop: '2019-06-04T18:10:24Z',
                sum: 75,
              },
            ],
            text: 'a.feature',
          },
          {
            avg: 300,
            cnt: 1,
            max: 300,
            min: 300,
            start: '2019-06-04T18:10:24Z',
            stop: '2019-06-04T20:10:24Z',
            sum: 300,
            testCases: [
              {
                avg: 100,
                cnt: 1,
                max: 100,
                min: 100,
                name: 'tc a',
                sourceLocation: {
                  line: 2,
                  uri: 'a.feature',
                },
                start: '2019-06-04T18:10:24Z',
                steps: [
                  {
                    avg: 100,
                    cnt: 1,
                    max: 100,
                    min: 100,
                    sourceLocation: {
                      line: 3,
                      uri: 'a.feature',
                    },
                    actionLocation: {
                      line: 4,
                      uri: 'steps.js',
                    },
                    start: '2019-06-04T18:10:24Z',
                    stop: '2019-06-04T20:10:24Z',
                    sum: 100,
                    text: 'step a',
                  },
                ],
                stop: '2019-06-04T20:10:24Z',
                sum: 100,
              },
              {
                avg: 200,
                cnt: 1,
                max: 200,
                min: 200,
                name: 'tc b',
                sourceLocation: {
                  line: 2,
                  uri: 'a.feature',
                },
                start: '2019-06-04T18:10:24Z',
                steps: [
                  {
                    avg: 200,
                    cnt: 1,
                    max: 200,
                    min: 200,
                    sourceLocation: {
                      line: 3,
                      uri: 'a.feature',
                    },
                    actionLocation: {
                      line: 4,
                      uri: 'steps.js',
                    },
                    start: '2019-06-04T18:10:24Z',
                    stop: '2019-06-04T20:10:24Z',
                    sum: 200,
                    text: 'step a',
                  },
                ],
                stop: '2019-06-04T20:10:24Z',
                sum: 200,
              },
            ],
            text: 'a.feature',
          },
        ],
      }
    })

    describe('create output', () => {
      beforeEach(function() {
        this.eventBroadcaster.emit('simulation-statistics-finished', {
          groups: [this.cp],
        })
      })

      it('logs the issue', function() {
        expect(this.output).to.eql(
          'a.feature,,,2019-06-04T14:34:24Z,cnt,1,avg,270,min,270,max,270\n' +
            'a.feature,tc a,,2019-06-04T14:34:24Z,cnt,1,avg,150,min,150,max,150\n' +
            'a.feature,tc a,undefined,2019-06-04T14:34:24Z,cnt,1,avg,150,min,150,max,150\n' +
            'a.feature,tc b,undefined,2019-06-04T14:34:24Z,cnt,1,avg,120,min,120,max,120\n' +
            'a.feature,tc b,undefined,2019-06-04T14:34:24Z,cnt,1,avg,120,min,120,max,120\n' +
            'a.feature,,,2019-06-04T18:10:24Z,cnt,1,avg,225,min,225,max,225\n' +
            'a.feature,tc a,,2019-06-04T18:10:24Z,cnt,1,avg,150,min,150,max,150\n' +
            'a.feature,tc a,undefined,2019-06-04T18:10:24Z,cnt,1,avg,150,min,150,max,150\n' +
            'a.feature,tc b,undefined,2019-06-04T18:10:24Z,cnt,1,avg,75,min,75,max,75\n' +
            'a.feature,tc b,undefined,2019-06-04T18:10:24Z,cnt,1,avg,75,min,75,max,75\n' +
            'a.feature,,,2019-06-04T20:10:24Z,cnt,1,avg,300,min,300,max,300\n' +
            'a.feature,tc a,,2019-06-04T20:10:24Z,cnt,1,avg,100,min,100,max,100\n' +
            'a.feature,tc a,undefined,2019-06-04T20:10:24Z,cnt,1,avg,100,min,100,max,100\n' +
            'a.feature,tc b,undefined,2019-06-04T20:10:24Z,cnt,1,avg,200,min,200,max,200\n' +
            'a.feature,tc b,undefined,2019-06-04T20:10:24Z,cnt,1,avg,200,min,200,max,200\n'
        )
      })
    })
  })
})
