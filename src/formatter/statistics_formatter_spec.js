import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import { Status, formatterHelpers } from 'cucumber'
import StatisticsFormatter from './statistics_formatter'
import { EventEmitter } from 'events'

describe('StatisticsFormatter', () => {
  beforeEach(function() {
    this.loggedoutput = ''
    const logFn = data => {
      this.loggedoutput += data
    }
    this.eventBroadcaster = new EventEmitter()
    this.statistics = new StatisticsFormatter({
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new formatterHelpers.EventDataCollector(
        this.eventBroadcaster
      ),
      log: logFn,
      strict: true,
      options: [],
    })
  })
  describe('results', () => {
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
        name: 'example',
        success: true,
      }
    })
    describe('with a failing scenario', () => {
      beforeEach(function() {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: { line: 2, uri: 'a.feature' },
          steps: [
            {
              sourceLocation: { uri: 'a.feature', line: 2 },
              actionLocation: { uri: 'steps.js', line: 4 },
            },
          ],
        })
        this.result.groups[0].results[0].testCases[1].steps[0].duration = 0
        this.result.groups[0].results[0].testCases[1].steps[0].status =
          Status.FAILED
        this.result.groups[0].results[0].testCases[1].status = Status.FAILED
        this.result.groups[0].results[0].testCases[1].duration = 0
      })

      it('makes statistics summary', function(done) {
        this.eventBroadcaster.on('simulation-statistics-finished', data => {
          expect(data).to.eql({
            duration: 0,
            groups: [
              {
                durations: [200, 225, 270, 300],
                start: '2019-06-04T14:10:24Z',
                stats: {
                  avg: 248.75,
                  cncrnt: 0.9998611111111111,
                  cnt: 4,
                  max: 300,
                  min: 200,
                },
                stop: '2019-06-04T22:10:24Z',
                testCases: [
                  {
                    durations: [100, 150, 150, 175],
                    name: 'tc a',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 143.75,
                      cncrnt: 0,
                      cnt: 4,
                      max: 175,
                      min: 100,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [100, 150, 150, 175],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 143.75,
                          cncrnt: 0,
                          cnt: 4,
                          max: 175,
                          min: 100,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                  {
                    durations: [0, 25, 75, 200],
                    name: 'tc b',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 75,
                      cncrnt: 0,
                      cnt: 4,
                      max: 200,
                      min: 0,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [0, 25, 75, 200],
                        issues: [
                          {
                            cnt: 1,
                            first: '2019-06-04T15:10:24Z',
                            last: '2019-06-04T15:10:24Z',
                            status: 'failed',
                          },
                        ],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 75,
                          cncrnt: 0,
                          cnt: 4,
                          max: 200,
                          min: 0,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                ],
                text: 'a.feature',
              },
            ],
            name: 'example',
            start: '2019-06-04T14:10:24Z',
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
            stop: '2019-06-04T22:10:24Z',
          })
          done()
        })
        this.eventBroadcaster.emit('simulation-run-finished', {
          data: this.result,
        })
      })
    })
    describe('no failures', () => {
      beforeEach(function() {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: { line: 2, uri: 'a.feature' },
          steps: [
            {
              sourceLocation: { uri: 'a.feature', line: 2 },
              actionLocation: { uri: 'steps.js', line: 4 },
            },
          ],
        })
      })

      it('makes statistics summary', function(done) {
        this.eventBroadcaster.on('simulation-statistics-finished', data => {
          expect(data).to.eql({
            duration: 0,
            groups: [
              {
                durations: [200, 225, 270, 300],
                start: '2019-06-04T14:10:24Z',
                stats: {
                  avg: 248.75,
                  cncrnt: 0.9998611111111111,
                  cnt: 4,
                  max: 300,
                  min: 200,
                },
                stop: '2019-06-04T22:10:24Z',
                testCases: [
                  {
                    durations: [100, 150, 150, 175],
                    name: 'tc a',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 143.75,
                      cncrnt: 0,
                      cnt: 4,
                      max: 175,
                      min: 100,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [100, 150, 150, 175],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 143.75,
                          cncrnt: 0,
                          cnt: 4,
                          max: 175,
                          min: 100,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                  {
                    durations: [25, 75, 120, 200],
                    name: 'tc b',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 105,
                      cncrnt: 0,
                      cnt: 4,
                      max: 200,
                      min: 25,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [25, 75, 120, 200],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 105,
                          cncrnt: 0,
                          cnt: 4,
                          max: 200,
                          min: 25,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                ],
                text: 'a.feature',
              },
            ],
            name: 'example',
            start: '2019-06-04T14:10:24Z',
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
            stop: '2019-06-04T22:10:24Z',
          })
          done()
        })
        this.eventBroadcaster.emit('simulation-run-finished', {
          data: this.result,
        })
      })
    })
    describe('2 scenarios with same text', () => {
      beforeEach(function() {
        this.result.groups[0].results[0].testCases.push({
          steps: [
            {
              start: '2019-06-04T14:10:24Z',
              stop: '2019-06-04T16:10:24Z',
              sourceLocation: { line: 11, uri: 'b.feature' },
              actionLocation: { line: 4, uri: 'steps.js' },
              duration: 150,
              status: Status.PASSED,
              text: 'step a',
            },
          ],
          start: '2019-06-04T14:10:24Z',
          stop: '2019-06-04T16:10:24Z',
          duration: 150,
          sourceLocation: { line: 10, uri: 'b.feature' },
          name: 'tc a',
          status: Status.PASSED,
        })
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: { line: 2, uri: 'a.feature' },
          steps: [
            {
              sourceLocation: { uri: 'a.feature', line: 2 },
              actionLocation: { uri: 'steps.js', line: 4 },
            },
          ],
        })
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: { line: 10, uri: 'b.feature' },
          steps: [
            {
              sourceLocation: { uri: 'b.feature', line: 11 },
              actionLocation: { uri: 'steps.js', line: 4 },
            },
          ],
        })
      })
      it('makes statistics summary', function(done) {
        this.eventBroadcaster.on('simulation-statistics-finished', data => {
          expect(data).to.eql({
            duration: 0,
            groups: [
              {
                durations: [200, 225, 270, 300],
                start: '2019-06-04T14:10:24Z',
                stats: {
                  avg: 248.75,
                  cncrnt: 0.9998611111111111,
                  cnt: 4,
                  max: 300,
                  min: 200,
                },
                stop: '2019-06-04T22:10:24Z',
                testCases: [
                  {
                    durations: [100, 150, 150, 175],
                    name: 'tc a',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 143.75,
                      cncrnt: 0,
                      cnt: 4,
                      max: 175,
                      min: 100,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [100, 150, 150, 175],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 143.75,
                          cncrnt: 0,
                          cnt: 4,
                          max: 175,
                          min: 100,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                  {
                    durations: [25, 75, 120, 200],
                    name: 'tc b',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 105,
                      cncrnt: 0,
                      cnt: 4,
                      max: 200,
                      min: 25,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [25, 75, 120, 200],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 105,
                          cncrnt: 0,
                          cnt: 4,
                          max: 200,
                          min: 25,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                  {
                    durations: [150],
                    name: 'tc a',
                    sourceLocation: {
                      line: 10,
                      uri: 'b.feature',
                    },
                    stats: {
                      avg: 150,
                      cncrnt: 0,
                      cnt: 1,
                      max: 150,
                      min: 150,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [150],
                        sourceLocation: {
                          line: 11,
                          uri: 'b.feature',
                        },
                        stats: {
                          avg: 150,
                          cncrnt: 0,
                          cnt: 1,
                          max: 150,
                          min: 150,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                ],
                text: 'a.feature',
              },
            ],
            name: 'example',
            start: '2019-06-04T14:10:24Z',
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
            stop: '2019-06-04T22:10:24Z',
          })
          done()
        })
        this.eventBroadcaster.emit('simulation-run-finished', {
          data: this.result,
        })
      })
    })
  })
})

describe('StatisticsFormatter W Minions', () => {
  beforeEach(function() {
    this.loggedoutput = ''
    const logFn = data => {
      this.loggedoutput += data
    }
    this.eventBroadcaster = new EventEmitter()
    this.statistics = new StatisticsFormatter({
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new formatterHelpers.EventDataCollector(
        this.eventBroadcaster
      ),
      log: logFn,
      strict: true,
      options: ['stdev', 'prctl:70'],
    })
  })

  describe('results', () => {
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
        name: 'example',
        success: true,
      }
    })
    describe('prepare', () => {
      beforeEach(function() {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation: { line: 2, uri: 'a.feature' },
          steps: [
            {
              sourceLocation: { uri: 'a.feature', line: 2 },
              actionLocation: { uri: 'steps.js', line: 4 },
            },
          ],
        })
      })

      it('make statistics summary', function(done) {
        this.eventBroadcaster.on('simulation-statistics-finished', data => {
          expect(data).to.eql({
            duration: 0,
            groups: [
              {
                durations: [200, 225, 270, 300],
                start: '2019-06-04T14:10:24Z',
                stats: {
                  avg: 248.75,
                  cncrnt: 0.9998611111111111,
                  cnt: 4,
                  max: 300,
                  min: 200,
                  prctl_70: 270,
                  stdev: 38.79030162295725,
                },
                stop: '2019-06-04T22:10:24Z',
                testCases: [
                  {
                    durations: [100, 150, 150, 175],
                    name: 'tc a',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 143.75,
                      cncrnt: 0,
                      cnt: 4,
                      max: 175,
                      min: 100,
                      prctl_70: 150,
                      stdev: 27.24311839712921,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [100, 150, 150, 175],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 143.75,
                          cncrnt: 0,
                          cnt: 4,
                          max: 175,
                          min: 100,
                          prctl_70: 150,
                          stdev: 27.24311839712921,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                  {
                    durations: [25, 75, 120, 200],
                    name: 'tc b',
                    sourceLocation: {
                      line: 2,
                      uri: 'a.feature',
                    },
                    stats: {
                      avg: 105,
                      cncrnt: 0,
                      cnt: 4,
                      max: 200,
                      min: 25,
                      prctl_70: 120,
                      stdev: 64.32340165134303,
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: 'steps.js',
                        },
                        durations: [25, 75, 120, 200],
                        sourceLocation: {
                          line: 3,
                          uri: 'a.feature',
                        },
                        stats: {
                          avg: 105,
                          cncrnt: 0,
                          cnt: 4,
                          max: 200,
                          min: 25,
                          prctl_70: 120,
                          stdev: 64.32340165134303,
                        },
                        text: 'step a',
                      },
                    ],
                  },
                ],
                text: 'a.feature',
              },
            ],
            name: 'example',
            start: '2019-06-04T14:10:24Z',
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
              prctl_70: {
                abbrivation: 'prctl_70',
                dataType: 'NANOS',
                fullName: 'undefined_70',
                isFloatingPoint: true,
                key: 'prctl_70',
                shortName: 'Prctl_70',
              },
              stdev: {
                abbrivation: 'stdev',
                dataType: 'OTHER',
                fullName: 'Standard Deviation',
                isFloatingPoint: true,
                key: 'stdev',
                shortName: 'StdDev',
              },
            },
            stop: '2019-06-04T22:10:24Z',
          })
          done()
        })
        this.eventBroadcaster.emit('simulation-run-finished', {
          data: this.result,
        })
      })
    })
  })
})
