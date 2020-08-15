import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import ChartPointsFormatter from './chartpoints_formatter'
import { Status, formatterHelpers } from 'cucumber'
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

  describe('test run result', () => {
    beforeEach(function() {
      this.result = {
        start: '2019-06-04T14:10:24Z',
        stop: '2019-06-04T22:10:24Z',
        duration: 0,
        groups: [
          {
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T22:10:24Z',
            duration: 0,
            results: [
              {
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
              },
              {
                testCases: [
                  {
                    steps: [
                      {
                        start: '2019-06-04T16:10:24Z',
                        stop: '2019-06-04T18:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 150,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T16:10:24Z',
                    stop: '2019-06-04T18:10:24Z',
                    duration: 150,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc a',
                    status: Status.PASSED,
                  },
                  {
                    steps: [
                      {
                        start: '2019-06-04T16:10:24Z',
                        stop: '2019-06-04T18:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 75,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T16:10:24Z',
                    stop: '2019-06-04T18:10:24Z',
                    duration: 75,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc b',
                    status: Status.PASSED,
                  },
                ],
                start: '2019-06-04T16:10:24Z',
                stop: '2019-06-04T18:10:24Z',
                duration: 225,
                success: true,
              },
              {
                testCases: [
                  {
                    steps: [
                      {
                        start: '2019-06-04T18:10:24Z',
                        stop: '2019-06-04T20:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 100,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T18:10:24Z',
                    stop: '2019-06-04T20:10:24Z',
                    duration: 100,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc a',
                    status: Status.PASSED,
                  },
                  {
                    steps: [
                      {
                        start: '2019-06-04T18:10:24Z',
                        stop: '2019-06-04T20:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 200,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T18:10:24Z',
                    stop: '2019-06-04T20:10:24Z',
                    duration: 200,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc b',
                    status: Status.PASSED,
                  },
                ],
                start: '2019-06-04T18:10:24Z',
                stop: '2019-06-04T20:10:24Z',
                duration: 300,
                success: true,
              },
              {
                testCases: [
                  {
                    steps: [
                      {
                        start: '2019-06-04T20:10:24Z',
                        stop: '2019-06-04T22:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 175,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T20:10:24Z',
                    stop: '2019-06-04T22:10:24Z',
                    duration: 175,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc a',
                    status: Status.PASSED,
                  },
                  {
                    steps: [
                      {
                        start: '2019-06-04T20:10:24Z',
                        stop: '2019-06-04T22:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 25,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T20:10:24Z',
                    stop: '2019-06-04T22:10:24Z',
                    duration: 25,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc b',
                    status: Status.PASSED,
                  },
                ],
                start: '2019-06-04T20:10:24Z',
                stop: '2019-06-04T22:10:24Z',
                duration: 200,
                success: true,
              },
            ],
            text: 'a.feature',
          },
        ],
        name: 'a.feature',
        success: true,
      }
    })

    describe('start chart creation', () => {
      it('logs the chart', function(done) {
        this.eventBroadcaster.on('chartpoints-finished', () => {
          expect(this.output).to.eql(
            'a.feature,,,2019-06-04T14:22:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T14:46:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T15:10:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T15:34:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T15:58:24.000Z,cnt,1,pass,1,fail,0,avg,270.000,min,270,max,270,cncrnt,0.000\n' +
              'a.feature,tc a,,2019-06-04T15:58:24.000Z,cnt,1,pass,1,fail,0,avg,150.000,min,150,max,150,cncrnt,0.000\n' +
              'a.feature,tc a,step a,2019-06-04T15:58:24.000Z,cnt,1,pass,1,fail,0,avg,150.000,min,150,max,150,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T15:58:24.000Z,cnt,1,pass,1,fail,0,avg,120.000,min,120,max,120,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T15:58:24.000Z,cnt,1,pass,1,fail,0,avg,120.000,min,120,max,120,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T16:22:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T16:46:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T17:10:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T17:34:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T17:58:24.000Z,cnt,1,pass,1,fail,0,avg,225.000,min,225,max,225,cncrnt,0.000\n' +
              'a.feature,tc a,,2019-06-04T17:58:24.000Z,cnt,1,pass,1,fail,0,avg,150.000,min,150,max,150,cncrnt,0.000\n' +
              'a.feature,tc a,step a,2019-06-04T17:58:24.000Z,cnt,1,pass,1,fail,0,avg,150.000,min,150,max,150,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T17:58:24.000Z,cnt,1,pass,1,fail,0,avg,75.000,min,75,max,75,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T17:58:24.000Z,cnt,1,pass,1,fail,0,avg,75.000,min,75,max,75,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T18:22:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T18:46:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T19:10:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T19:34:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T19:58:24.000Z,cnt,1,pass,1,fail,0,avg,300.000,min,300,max,300,cncrnt,0.000\n' +
              'a.feature,tc a,,2019-06-04T19:58:24.000Z,cnt,1,pass,1,fail,0,avg,100.000,min,100,max,100,cncrnt,0.000\n' +
              'a.feature,tc a,step a,2019-06-04T19:58:24.000Z,cnt,1,pass,1,fail,0,avg,100.000,min,100,max,100,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T19:58:24.000Z,cnt,1,pass,1,fail,0,avg,200.000,min,200,max,200,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T19:58:24.000Z,cnt,1,pass,1,fail,0,avg,200.000,min,200,max,200,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T20:22:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T20:46:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T21:10:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T21:34:24.000Z,cnt,0,pass,0,fail,0,avg,0.000,min,null,max,null,cncrnt,0.000\n' +
              'a.feature,,,2019-06-04T21:58:24.000Z,cnt,1,pass,1,fail,0,avg,200.000,min,200,max,200,cncrnt,0.000\n' +
              'a.feature,tc a,,2019-06-04T21:58:24.000Z,cnt,1,pass,1,fail,0,avg,175.000,min,175,max,175,cncrnt,0.000\n' +
              'a.feature,tc a,step a,2019-06-04T21:58:24.000Z,cnt,1,pass,1,fail,0,avg,175.000,min,175,max,175,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T21:58:24.000Z,cnt,1,pass,1,fail,0,avg,25.000,min,25,max,25,cncrnt,0.000\n' +
              'a.feature,tc b,step a,2019-06-04T21:58:24.000Z,cnt,1,pass,1,fail,0,avg,25.000,min,25,max,25,cncrnt,0.000\n'
          )
          done()
        })
        this.eventBroadcaster.emit('simulation-run-finished', {
          data: this.result,
        })
      })
    })
  })
})

describe('ChartPointsFormatter W Minions', () => {
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
      strict: true,
      options: ['stdev', 'prctl:70'],
    })
  })

  describe('test run result', () => {
    beforeEach(function() {
      this.result = {
        start: '2019-06-04T14:10:24Z',
        stop: '2019-06-04T22:10:24Z',
        duration: 0,
        groups: [
          {
            start: '2019-06-04T14:10:24Z',
            stop: '2019-06-04T22:10:24Z',
            duration: 0,
            results: [
              {
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
              },
              {
                testCases: [
                  {
                    steps: [
                      {
                        start: '2019-06-04T16:10:24Z',
                        stop: '2019-06-04T18:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 150,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T16:10:24Z',
                    stop: '2019-06-04T18:10:24Z',
                    duration: 150,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc a',
                    status: Status.PASSED,
                  },
                  {
                    steps: [
                      {
                        start: '2019-06-04T16:10:24Z',
                        stop: '2019-06-04T18:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 75,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T16:10:24Z',
                    stop: '2019-06-04T18:10:24Z',
                    duration: 75,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc b',
                    status: Status.PASSED,
                  },
                ],
                start: '2019-06-04T16:10:24Z',
                stop: '2019-06-04T18:10:24Z',
                duration: 225,
                success: true,
              },
              {
                testCases: [
                  {
                    steps: [
                      {
                        start: '2019-06-04T18:10:24Z',
                        stop: '2019-06-04T20:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 100,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T18:10:24Z',
                    stop: '2019-06-04T20:10:24Z',
                    duration: 100,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc a',
                    status: Status.PASSED,
                  },
                  {
                    steps: [
                      {
                        start: '2019-06-04T18:10:24Z',
                        stop: '2019-06-04T20:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 200,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T18:10:24Z',
                    stop: '2019-06-04T20:10:24Z',
                    duration: 200,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc b',
                    status: Status.PASSED,
                  },
                ],
                start: '2019-06-04T18:10:24Z',
                stop: '2019-06-04T20:10:24Z',
                duration: 300,
                success: true,
              },
              {
                testCases: [
                  {
                    steps: [
                      {
                        start: '2019-06-04T20:10:24Z',
                        stop: '2019-06-04T22:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 175,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T20:10:24Z',
                    stop: '2019-06-04T22:10:24Z',
                    duration: 175,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc a',
                    status: Status.PASSED,
                  },
                  {
                    steps: [
                      {
                        start: '2019-06-04T20:10:24Z',
                        stop: '2019-06-04T22:10:24Z',
                        sourceLocation: { line: 3, uri: 'a.feature' },
                        actionLocation: { line: 4, uri: 'steps.js' },
                        duration: 25,
                        status: Status.PASSED,
                        text: 'step a',
                      },
                    ],
                    start: '2019-06-04T20:10:24Z',
                    stop: '2019-06-04T22:10:24Z',
                    duration: 25,
                    sourceLocation: { line: 2, uri: 'a.feature' },
                    name: 'tc b',
                    status: Status.PASSED,
                  },
                ],
                start: '2019-06-04T20:10:24Z',
                stop: '2019-06-04T22:10:24Z',
                duration: 200,
                success: true,
              },
            ],
            text: 'a.feature',
          },
        ],
        name: 'a.feature',
        success: true,
      }
    })

    describe('start chart creation', () => {
      it('logs the chart', function(done) {
        this.eventBroadcaster.on('chartpoints-finished', () => {
          expect(this.output).to.eql(
            'a.feature,,,2019-06-04T14:22:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T14:46:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T15:10:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T15:34:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T15:58:24.000Z,cnt,1,avg,270.000,min,270,max,270,cncrnt,0.000,stdev,0.000,prctl_70,270.000\n' +
              'a.feature,tc a,,2019-06-04T15:58:24.000Z,cnt,1,avg,150.000,min,150,max,150,cncrnt,0.000,stdev,0.000,prctl_70,150.000\n' +
              'a.feature,tc a,step a,2019-06-04T15:58:24.000Z,cnt,1,avg,150.000,min,150,max,150,cncrnt,0.000,stdev,0.000,prctl_70,150.000\n' +
              'a.feature,tc b,step a,2019-06-04T15:58:24.000Z,cnt,1,avg,120.000,min,120,max,120,cncrnt,0.000,stdev,0.000,prctl_70,120.000\n' +
              'a.feature,tc b,step a,2019-06-04T15:58:24.000Z,cnt,1,avg,120.000,min,120,max,120,cncrnt,0.000,stdev,0.000,prctl_70,120.000\n' +
              'a.feature,,,2019-06-04T16:22:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T16:46:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T17:10:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T17:34:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T17:58:24.000Z,cnt,1,avg,225.000,min,225,max,225,cncrnt,0.000,stdev,0.000,prctl_70,225.000\n' +
              'a.feature,tc a,,2019-06-04T17:58:24.000Z,cnt,1,avg,150.000,min,150,max,150,cncrnt,0.000,stdev,0.000,prctl_70,150.000\n' +
              'a.feature,tc a,step a,2019-06-04T17:58:24.000Z,cnt,1,avg,150.000,min,150,max,150,cncrnt,0.000,stdev,0.000,prctl_70,150.000\n' +
              'a.feature,tc b,step a,2019-06-04T17:58:24.000Z,cnt,1,avg,75.000,min,75,max,75,cncrnt,0.000,stdev,0.000,prctl_70,75.000\n' +
              'a.feature,tc b,step a,2019-06-04T17:58:24.000Z,cnt,1,avg,75.000,min,75,max,75,cncrnt,0.000,stdev,0.000,prctl_70,75.000\n' +
              'a.feature,,,2019-06-04T18:22:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T18:46:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T19:10:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T19:34:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T19:58:24.000Z,cnt,1,avg,300.000,min,300,max,300,cncrnt,0.000,stdev,0.000,prctl_70,300.000\n' +
              'a.feature,tc a,,2019-06-04T19:58:24.000Z,cnt,1,avg,100.000,min,100,max,100,cncrnt,0.000,stdev,0.000,prctl_70,100.000\n' +
              'a.feature,tc a,step a,2019-06-04T19:58:24.000Z,cnt,1,avg,100.000,min,100,max,100,cncrnt,0.000,stdev,0.000,prctl_70,100.000\n' +
              'a.feature,tc b,step a,2019-06-04T19:58:24.000Z,cnt,1,avg,200.000,min,200,max,200,cncrnt,0.000,stdev,0.000,prctl_70,200.000\n' +
              'a.feature,tc b,step a,2019-06-04T19:58:24.000Z,cnt,1,avg,200.000,min,200,max,200,cncrnt,0.000,stdev,0.000,prctl_70,200.000\n' +
              'a.feature,,,2019-06-04T20:22:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T20:46:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T21:10:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T21:34:24.000Z,cnt,0,avg,0.000,min,null,max,null,cncrnt,0.000,stdev,null,prctl_70,null\n' +
              'a.feature,,,2019-06-04T21:58:24.000Z,cnt,1,avg,200.000,min,200,max,200,cncrnt,0.000,stdev,0.000,prctl_70,200.000\n' +
              'a.feature,tc a,,2019-06-04T21:58:24.000Z,cnt,1,avg,175.000,min,175,max,175,cncrnt,0.000,stdev,0.000,prctl_70,175.000\n' +
              'a.feature,tc a,step a,2019-06-04T21:58:24.000Z,cnt,1,avg,175.000,min,175,max,175,cncrnt,0.000,stdev,0.000,prctl_70,175.000\n' +
              'a.feature,tc b,step a,2019-06-04T21:58:24.000Z,cnt,1,avg,25.000,min,25,max,25,cncrnt,0.000,stdev,0.000,prctl_70,25.000\n' +
              'a.feature,tc b,step a,2019-06-04T21:58:24.000Z,cnt,1,avg,25.000,min,25,max,25,cncrnt,0.000,stdev,0.000,prctl_70,25.000\n'
          )
          done()
        })
        this.eventBroadcaster.emit('simulation-run-finished', {
          data: this.result,
        })
      })
    })
  })
})
