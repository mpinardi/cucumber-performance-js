import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import {Status} from 'cucumber'
import Statistics from './statistics'
import { EventEmitter } from 'events'
import { formatterHelpers } from 'cucumber'

describe('Statistics', () => {
  beforeEach(function() {
    this.loggedoutput = ''
    const logFn = data => {
      this.loggedoutput += data
    }
    this.ouput
    this.eventBroadcaster = new EventEmitter()
    this.statistics = new Statistics({
      eventBroadcaster: this.eventBroadcaster,
      eventDataCollector: new formatterHelpers.EventDataCollector(this.eventBroadcaster),
      log: logFn,
      strict: true,
    })
  })

    describe('results', () => {
        beforeEach(function() {
          this.result =  {
            start: "2019-06-04T14:10:24Z",
            stop:  "2019-06-04T22:10:24Z",
            duration: 0,
            groups: [{
              start: "2019-06-04T14:10:24Z",
              stop:  "2019-06-04T22:10:24Z",
              duration: 0,
              results: [
                {
                  testCases: [
                    {
                      steps: [
                        {
                          start: "2019-06-04T14:10:24Z",
                          stop: "2019-06-04T16:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 150,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T14:10:24Z",
                      stop: "2019-06-04T16:10:24Z",
                      duration: 150,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc a',
                      status: Status.PASSED,
                    },
                    {
                      steps: [
                        {
                          start: "2019-06-04T14:10:24Z",
                          stop: "2019-06-04T15:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 120,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T14:10:24Z",
                      stop: "2019-06-04T15:10:24Z",
                      duration: 120,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc b',
                      status: Status.PASSED,
                    }
                  ],
                  start: "2019-06-04T14:10:24Z",
                  stop: "2019-06-04T16:10:24Z",
                  duration: 270,
                  success: true,
                },
                {
                  testCases: [
                    {
                      steps: [
                        {
                          start: "2019-06-04T16:10:24Z",
                          stop: "2019-06-04T18:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 150,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T16:10:24Z",
                      stop: "2019-06-04T18:10:24Z",
                      duration: 150,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc a',
                      status: Status.PASSED,
                    },
                    {
                      steps: [
                        {
                          start: "2019-06-04T16:10:24Z",
                          stop: "2019-06-04T18:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 75,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T16:10:24Z",
                      stop: "2019-06-04T18:10:24Z",
                      duration: 75,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc b',
                      status: Status.PASSED,
                    }
                  ],
                  start: "2019-06-04T16:10:24Z",
                  stop: "2019-06-04T18:10:24Z",
                  duration: 225,
                  success: true,
                },
                {
                  testCases: [
                    {
                      steps: [
                        {
                          start: "2019-06-04T18:10:24Z",
                          stop: "2019-06-04T20:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 100,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T18:10:24Z",
                      stop: "2019-06-04T20:10:24Z",
                      duration: 100,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc a',
                      status: Status.PASSED,
                    },
                    {
                      steps: [
                        {
                          start: "2019-06-04T18:10:24Z",
                          stop: "2019-06-04T20:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 200,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T18:10:24Z",
                      stop: "2019-06-04T20:10:24Z",
                      duration: 200,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc b',
                      status: Status.PASSED,
                    }
                  ],
                  start: "2019-06-04T18:10:24Z",
                  stop: "2019-06-04T20:10:24Z",
                  duration: 300,
                  success: true,
                },
                {
                  testCases: [
                    {
                      steps: [
                        {
                          start: "2019-06-04T20:10:24Z",
                          stop: "2019-06-04T22:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 175,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T20:10:24Z",
                      stop: "2019-06-04T22:10:24Z",
                      duration: 175,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc a',
                      status: Status.PASSED,
                    },
                    {
                      steps: [
                        {
                          start: "2019-06-04T20:10:24Z",
                          stop: "2019-06-04T22:10:24Z",
                          sourceLocation: {line: 3,uri: 'a.feature'},
                          actionLocation: {line: 4,uri: 'steps.js'},
                          duration: 25,
                          status: Status.PASSED,
                          text: 'step a',
                        }
                      ],
                      start: "2019-06-04T20:10:24Z",
                      stop: "2019-06-04T22:10:24Z",
                      duration: 25,
                      sourceLocation: {line: 2,uri: 'a.feature'},
                      name: 'tc b',
                      status: Status.PASSED,
                    }
                  ],
                  start: "2019-06-04T20:10:24Z",
                  stop: "2019-06-04T22:10:24Z",
                  duration: 200,
                  success: true,
                }
              ],
              }
            ],
            success: true
          }
        })
    

    describe('with a failing scenario', () => {
      beforeEach(function() {
        this.eventBroadcaster.emit('test-case-prepared', {
          sourceLocation:  {line: 2,uri: 'a.feature'},
          steps: [
            {
              sourceLocation: { uri: 'a.feature', line: 2 },
              actionLocation: { uri: 'steps.js', line: 4 },
            },
          ],
        })
        this.result.groups[0].results[0].testCases[1].steps[0].duration= 0
        this.result.groups[0].results[0].testCases[1].steps[0].status= Status.FAILED
        this.result.groups[0].results[0].testCases[1].status= Status.FAILED
        this.result.groups[0].results[0].testCases[1].duration= 0
      })
      
    it('makes statistics summary', function(done) {
      this.eventBroadcaster.on('simulation-statistics-finished', (data) => {
        expect(data).to.eql(
          {
            duration: 0,
            groups: [
              {
                avg: 248.75,
                chartPoints: [
                  {
                    avg: 270,
                    cnt: 1,
                    max: 270,
                    min: 270,
                    start: "2019-06-04T14:10:24Z",
                    stop: "2019-06-04T14:34:24Z",
                    sum: 270,
                    testCases: [
                      {
                        avg: 150,
                        cnt: 1,
                        max: 150,
                        min: 150,
                        name: "tc a",
                        sourceLocation: {
                          line: 2,
                          uri: "a.feature"
                        },
                        start: "2019-06-04T14:10:24Z",
                        steps: [
                          {
                            avg: 150,
                            cnt: 1,
                            max: 150,
                            min: 150,
                            sourceLocation: {
                              line: 3,
                              uri: "a.feature"
                            },
                            actionLocation: {
                              line: 4,
                              uri: "steps.js"
                            },
                            start: "2019-06-04T14:10:24Z",
                            stop: "2019-06-04T16:10:24Z",
                            sum: 150,
                            text: "step a",
                          }
                        ],
                        stop: "2019-06-04T16:10:24Z",
                        sum: 150
                      },
                      {
                        avg: 0,
                        cnt: 1,
                        max: 0,
                        min: 0,
                        name: "tc b",
                        sourceLocation: {
                          line: 2,
                          uri: "a.feature"
                        },
                        start: "2019-06-04T14:10:24Z",
                        steps: [
                          {
                            avg: 0,
                            cnt: 1,
                            max: 0,
                            min: 0,
                            sourceLocation: {
                              line: 3,
                              uri: "a.feature"
                            },	
                            actionLocation: {
                              line: 4,
                              uri: "steps.js"
                            },
                            start: "2019-06-04T14:10:24Z",
                            stop: "2019-06-04T15:10:24Z",
                            sum: 0,
                            text: "step a"
                          }
                        ],
                        stop: "2019-06-04T15:10:24Z",
                        sum: 0
                      }
                    ],
                    text: undefined,
                  },
                  {
                    avg: 225,
                    cnt: 1,
                    max: 225,
                    min: 225,
                    start: "2019-06-04T16:10:24Z",
                    stop: "2019-06-04T18:10:24Z",
                    sum: 225,
                    testCases: [
                      {
                        avg: 150,
                        cnt: 1,
                        max: 150,
                        min: 150,
                        name: "tc a",
                        sourceLocation: {
                          line: 2,
                          uri: "a.feature",
                        },
                        start: "2019-06-04T16:10:24Z",
                        steps: [
                          {
                            avg: 150,
                            cnt: 1,
                            max: 150,
                            min: 150,
                            sourceLocation: {
                              line: 3,
                              uri: "a.feature"
                            },
                            actionLocation: {
                              line: 4,
                              uri: "steps.js"
                            },
                            start: "2019-06-04T16:10:24Z",
                            stop: "2019-06-04T18:10:24Z",
                            sum: 150,
                            text: "step a",
                          }
                        ],
                        stop: "2019-06-04T18:10:24Z",
                        sum: 150
                      },
                      {
                        avg: 75,
                        cnt: 1,
                        max: 75,
                        min: 75,
                        name: "tc b",
                        sourceLocation: {
                          line: 2,
                          uri: "a.feature",
                        },
                        start: "2019-06-04T16:10:24Z",
                        steps: [
                          {
                            avg: 75,
                            cnt: 1,
                            max: 75,
                            min: 75,
                            sourceLocation: {
                              line: 3,
                              uri: "a.feature"
                            },
                            actionLocation: {
                              line: 4,
                              uri: "steps.js"
                            },
                            start: "2019-06-04T16:10:24Z",
                            stop: "2019-06-04T18:10:24Z",
                            sum: 75,
                            text: "step a"
                          }
                        ],
                        stop: "2019-06-04T18:10:24Z",
                        sum: 75
                      }
                    ],
                    text: undefined
                  },
                  {
                    avg: 300,
                    cnt: 1,
                    max: 300,
                    min: 300,
                    start: "2019-06-04T18:10:24Z",
                    stop: "2019-06-04T20:10:24Z",
                    sum: 300,
                    testCases: [
                      {
                        avg: 100,
                        cnt: 1,
                        max: 100,
                        min: 100,
                        name: "tc a",
                        sourceLocation: {
                          line: 2,
                          uri: "a.feature",
                        },
                        start: "2019-06-04T18:10:24Z",
                        steps: [
                          {
                            avg: 100,
                            cnt: 1,
                            max: 100,
                            min: 100,
                            sourceLocation: {
                              line: 3,
                              uri: "a.feature"
                            },
                            actionLocation: {
                              line: 4,
                              uri: "steps.js"
                            },
                            start: "2019-06-04T18:10:24Z",
                            stop: "2019-06-04T20:10:24Z",
                            sum: 100,
                            text: "step a",
                          }
                        ],
                        stop: "2019-06-04T20:10:24Z",
                        sum: 100
                      },
                      {
                        avg: 200,
                        cnt: 1,
                        max: 200,
                        min: 200,
                        name: "tc b",
                        sourceLocation: {
                          line: 2,
                          uri: "a.feature"
                        },
                        start: "2019-06-04T18:10:24Z",
                        steps: [
                          {
                            avg: 200,
                            cnt: 1,
                            max: 200,
                            min: 200,
                            sourceLocation: {
                              line: 3,
                              uri: "a.feature"
                            },
                            actionLocation: {
                              line: 4,
                              uri: "steps.js"
                            },
                            start: "2019-06-04T18:10:24Z",
                            stop: "2019-06-04T20:10:24Z",
                            sum: 200,
                            text: "step a"
                          }
                        ],
                        stop: "2019-06-04T20:10:24Z",
                        sum: 200
                      }
                    ],
                    text: undefined
                  }
                ],
                cnt: 4,
                max: 300,
                min: 200,
                start: "2019-06-04T14:10:24Z",
                stop: "2019-06-04T22:10:24Z",
                sum: 995,
                testCases: [
                  {
                    avg: 143.75,
                    cnt: 4,
                    max: 175,
                    min: 100,
                    name: "tc a",
                    sourceLocation: {
                      line: 2,
                      uri: "a.feature",
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: "steps.js",
                        },
                        avg: 143.75,
                        cnt: 4,
                        max: 175,
                        min: 100,
                        sourceLocation: {
                          line: 3,
                          uri: "a.feature"
                        },
                        sum: 575,
                        text: "step a",
                      }
                    ],
                    sum: 575
                  },
                  {
                    avg: 75,
                    cnt: 4,
                    max: 200,
                    min: 0,
                    name: "tc b",
                    sourceLocation: {
                      line: 2,
                      uri: "a.feature"
                    },
                    steps: [
                      {
                        actionLocation: {
                          line: 4,
                          uri: "steps.js",
                        },
                        avg: 75,
                        cnt: 4,
                        issues: [
                          {
                            cnt: 1,
                            status: "failed"
                          }
                        ],
                        max: 200,
                        min: 0,
                        sourceLocation: {
                          line: 3,
                          uri: "a.feature"
                        },
                        sum: 300,
                        text: "step a",
                      }
                     ],
                    sum: 300
                   }
                 ],
                text: undefined,
               }
             ],
             name: undefined,
             start: "2019-06-04T14:10:24Z",
             stop: "2019-06-04T22:10:24Z"
           }
        )
        done();
      })
      this.eventBroadcaster.emit('simulation-run-finished', {data:this.result})
    })
  })
  describe('no failures', () => {
    beforeEach(function() {
      this.eventBroadcaster.emit('test-case-prepared', {
        sourceLocation:  {line: 2,uri: 'a.feature'},
        steps: [
          {
            sourceLocation: { uri: 'a.feature', line: 2 },
            actionLocation: { uri: 'steps.js', line: 4 },
          },
        ],
      })
    })
    
  it('makes statistics summary', function(done) {
    this.eventBroadcaster.on('simulation-statistics-finished', (data) => {
      expect(data).to.eql(
        {
          duration: 0,
          groups: [
            {
              avg: 248.75,
              chartPoints: [
                {
                  avg: 270,
                  cnt: 1,
                  max: 270,
                  min: 270,
                  start: "2019-06-04T14:10:24Z",
                  stop: "2019-06-04T14:34:24Z",
                  sum: 270,
                  testCases: [
                    {
                      avg: 150,
                      cnt: 1,
                      max: 150,
                      min: 150,
                      name: "tc a",
                      sourceLocation: {
                        line: 2,
                        uri: "a.feature"
                      },
                      start: "2019-06-04T14:10:24Z",
                      steps: [
                        {
                          avg: 150,
                          cnt: 1,
                          max: 150,
                          min: 150,
                          sourceLocation: {
                            line: 3,
                            uri: "a.feature"
                          },
                          actionLocation: {
                            line: 4,
                            uri: "steps.js"
                          },
                          start: "2019-06-04T14:10:24Z",
                          stop: "2019-06-04T16:10:24Z",
                          sum: 150,
                          text: "step a",
                        }
                      ],
                      stop: "2019-06-04T16:10:24Z",
                      sum: 150
                    },
                    {
                      avg: 120,
                      cnt: 1,
                      max: 120,
                      min: 120,
                      name: "tc b",
                      sourceLocation: {
                        line: 2,
                        uri: "a.feature"
                      },
                      start: "2019-06-04T14:10:24Z",
                      steps: [
                        {
                          avg: 120,
                          cnt: 1,
                          max: 120,
                          min: 120,
                          sourceLocation: {
                            line: 3,
                            uri: "a.feature"
                          },	
                          actionLocation: {
                            line: 4,
                            uri: "steps.js"
                          },
                          start: "2019-06-04T14:10:24Z",
                          stop: "2019-06-04T15:10:24Z",
                          sum: 120,
                          text: "step a"
                        }
                      ],
                      stop: "2019-06-04T15:10:24Z",
                      sum: 120
                    }
                  ],
                  text: undefined,
                },
                {
                  avg: 225,
                  cnt: 1,
                  max: 225,
                  min: 225,
                  start: "2019-06-04T16:10:24Z",
                  stop: "2019-06-04T18:10:24Z",
                  sum: 225,
                  testCases: [
                    {
                      avg: 150,
                      cnt: 1,
                      max: 150,
                      min: 150,
                      name: "tc a",
                      sourceLocation: {
                        line: 2,
                        uri: "a.feature",
                      },
                      start: "2019-06-04T16:10:24Z",
                      steps: [
                        {
                          avg: 150,
                          cnt: 1,
                          max: 150,
                          min: 150,
                          sourceLocation: {
                            line: 3,
                            uri: "a.feature"
                          },
                          actionLocation: {
                            line: 4,
                            uri: "steps.js"
                          },
                          start: "2019-06-04T16:10:24Z",
                          stop: "2019-06-04T18:10:24Z",
                          sum: 150,
                          text: "step a",
                        }
                      ],
                      stop: "2019-06-04T18:10:24Z",
                      sum: 150
                    },
                    {
                      avg: 75,
                      cnt: 1,
                      max: 75,
                      min: 75,
                      name: "tc b",
                      sourceLocation: {
                        line: 2,
                        uri: "a.feature",
                      },
                      start: "2019-06-04T16:10:24Z",
                      steps: [
                        {
                          avg: 75,
                          cnt: 1,
                          max: 75,
                          min: 75,
                          sourceLocation: {
                            line: 3,
                            uri: "a.feature"
                          },
                          actionLocation: {
                            line: 4,
                            uri: "steps.js"
                          },
                          start: "2019-06-04T16:10:24Z",
                          stop: "2019-06-04T18:10:24Z",
                          sum: 75,
                          text: "step a"
                        }
                      ],
                      stop: "2019-06-04T18:10:24Z",
                      sum: 75
                    }
                  ],
                  text: undefined
                },
                {
                  avg: 300,
                  cnt: 1,
                  max: 300,
                  min: 300,
                  start: "2019-06-04T18:10:24Z",
                  stop: "2019-06-04T20:10:24Z",
                  sum: 300,
                  testCases: [
                    {
                      avg: 100,
                      cnt: 1,
                      max: 100,
                      min: 100,
                      name: "tc a",
                      sourceLocation: {
                        line: 2,
                        uri: "a.feature",
                      },
                      start: "2019-06-04T18:10:24Z",
                      steps: [
                        {
                          avg: 100,
                          cnt: 1,
                          max: 100,
                          min: 100,
                          sourceLocation: {
                            line: 3,
                            uri: "a.feature"
                          },
                          actionLocation: {
                            line: 4,
                            uri: "steps.js"
                          },
                          start: "2019-06-04T18:10:24Z",
                          stop: "2019-06-04T20:10:24Z",
                          sum: 100,
                          text: "step a",
                        }
                      ],
                      stop: "2019-06-04T20:10:24Z",
                      sum: 100
                    },
                    {
                      avg: 200,
                      cnt: 1,
                      max: 200,
                      min: 200,
                      name: "tc b",
                      sourceLocation: {
                        line: 2,
                        uri: "a.feature"
                      },
                      start: "2019-06-04T18:10:24Z",
                      steps: [
                        {
                          avg: 200,
                          cnt: 1,
                          max: 200,
                          min: 200,
                          sourceLocation: {
                            line: 3,
                            uri: "a.feature"
                          },
                          actionLocation: {
                            line: 4,
                            uri: "steps.js"
                          },
                          start: "2019-06-04T18:10:24Z",
                          stop: "2019-06-04T20:10:24Z",
                          sum: 200,
                          text: "step a"
                        }
                      ],
                      stop: "2019-06-04T20:10:24Z",
                      sum: 200
                    }
                  ],
                  text: undefined
                }
              ],
              cnt: 4,
              max: 300,
              min: 200,
              start: "2019-06-04T14:10:24Z",
              stop: "2019-06-04T22:10:24Z",
              sum: 995,
              testCases: [
                {
                  avg: 143.75,
                  cnt: 4,
                  max: 175,
                  min: 100,
                  name: "tc a",
                  sourceLocation: {
                    line: 2,
                    uri: "a.feature",
                  },
                  steps: [
                    {
                      actionLocation: {
                        line: 4,
                        uri: "steps.js",
                      },
                      avg: 143.75,
                      cnt: 4,
                      max: 175,
                      min: 100,
                      sourceLocation: {
                        line: 3,
                        uri: "a.feature"
                      },
                      sum: 575,
                      text: "step a",
                    }
                  ],
                  sum: 575
                },
                {
                  avg: 105,
                  cnt: 4,
                  max: 200,
                  min: 25,
                  name: "tc b",
                  sourceLocation: {
                    line: 2,
                    uri: "a.feature"
                  },
                  steps: [
                    {
                      actionLocation: {
                        line: 4,
                        uri: "steps.js",
                      },
                      avg: 105,
                      cnt: 4,
                      max: 200,
                      min: 25,
                      sourceLocation: {
                        line: 3,
                        uri: "a.feature"
                      },
                      sum: 420,
                      text: "step a",
                    }
                   ],
                  sum: 420
                 }
               ],
              text: undefined,
             }
           ],
           name: undefined,
           start: "2019-06-04T14:10:24Z",
           stop: "2019-06-04T22:10:24Z"
         }
      )
      done();
    })
    this.eventBroadcaster.emit('simulation-run-finished', {data:this.result})
  })
})
  })
})