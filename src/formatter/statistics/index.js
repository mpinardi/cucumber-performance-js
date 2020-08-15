import { isStatusFailure, isStatusWarning } from '../helpers'
import _ from 'lodash'
import { Status } from 'cucumber'

var SEP = '_'

export const statDataType = Object.freeze({
  COUNT: 'COUNT',
  OTHER: 'OTHER',
  NANOS: 'NANOS',
  MILLIS: 'MILLIS',
  SECONDS: 'SECONDS',
})

export const statType = Object.freeze({
  AVERAGE: {
    key: 'avg',
    fullname: 'Average',
    shortName: 'Avg',
    abbrivation: 'avg',
    dataType: statDataType.NANOS,
    isFloatingPoint: true,
  },
  MINIMUM: {
    key: 'min',
    fullname: 'Minimum',
    shortName: 'Min',
    abbrivation: 'min',
    dataType: statDataType.NANOS,
    isFloatingPoint: false,
  },
  MAXIMUM: {
    key: 'max',
    fullname: 'Maximum',
    shortName: 'Max',
    abbrivation: 'max',
    dataType: statDataType.NANOS,
    isFloatingPoint: false,
  },
  MEDIAN: {
    key: 'med',
    fullname: 'Median',
    shortName: 'Med',
    abbrivation: 'med',
    dataType: statDataType.NANOS,
    isFloatingPoint: false,
  },
  COUNT: {
    key: 'cnt',
    fullname: 'Count',
    shortName: 'Count',
    abbrivation: 'cnt',
    dataType: statDataType.COUNT,
    isFloatingPoint: false,
  },
  PASSED: {
    key: 'pass',
    fullname: 'Passed',
    shortName: 'Pass',
    abbrivation: 'pass',
    dataType: statDataType.COUNT,
    isFloatingPoint: false,
  },
  FAILED: {
    key: 'fail',
    fullname: 'Failed',
    shortName: 'Fail',
    abbrivation: 'fail',
    dataType: statDataType.COUNT,
    isFloatingPoint: false,
  },
  ERRORED: {
    key: 'error',
    fullname: 'Errored',
    shortName: 'Error',
    abbrivation: 'error',
    dataType: statDataType.COUNT,
    isFloatingPoint: false,
  },
  PERCENTILE: {
    key: 'prctl',
    fullname: 'Percentile',
    shortName: 'Prctl',
    abbrivation: 'prctl',
    dataType: statDataType.NANOS,
    isFloatingPoint: true,
  },
  PERCENTAGE: {
    key: '%',
    fullName: 'Percentage',
    shortName: 'Percent',
    abbrivation: '%',
    dataType: statDataType.OTHER,
    isFloatingPoint: true,
  },
  STD_DEVIATION: {
    key: 'stdev',
    fullName: 'Standard Deviation',
    shortName: 'StdDev',
    abbrivation: 'stdev',
    dataType: statDataType.OTHER,
    isFloatingPoint: true,
  },
  CONCURRENCY: {
    key: 'cncrnt',
    fullName: 'Concurrency',
    shortName: 'Concurrency',
    abbrivation: 'cncrnt',
    dataType: statDataType.OTHER,
    isFloatingPoint: true,
  },
})

export function getDefaultStats(isStrict) {
  let stats = {}
  stats[statType.COUNT.key] = 0
  if (!isStrict) {
    stats[statType.PASSED.key] = 0
    stats[statType.FAILED.key] = 0
  }
  stats[statType.AVERAGE.key] = 0
  stats[statType.MAXIMUM.key] = null
  stats[statType.MINIMUM.key] = null
  stats[statType.CONCURRENCY.key] = 0
  return stats
}

export function getDefaultStatTypes(isStrict) {
  let statTypes = {}
  statTypes[statType.COUNT.key] = statType.COUNT
  if (!isStrict) {
    statTypes[statType.PASSED.key] = statType.PASSED
    statTypes[statType.FAILED.key] = statType.FAILED
  }
  statTypes[statType.AVERAGE.key] = statType.AVERAGE
  statTypes[statType.MINIMUM.key] = statType.MINIMUM
  statTypes[statType.MAXIMUM.key] = statType.MAXIMUM
  statTypes[statType.CONCURRENCY.key] = statType.CONCURRENCY
  return statTypes
}

export function createStatType(
  key,
  fullname,
  shortname,
  abbrivation,
  statDataType
) {
  return {
    key: key,
    fullName: fullname,
    shortName: shortname,
    abbrivation: abbrivation,
    dataType: statDataType,
  }
}

export function createStatTypeWPrefix(prefix, stat) {
  return {
    key: prefix + SEP + stat.key,
    fullName: prefix + SEP + stat.fullName,
    shortName: prefix + SEP + stat.shortName,
    abbrivation: prefix + SEP + stat.abbrivation,
    dataType: stat.dataType,
    isFloatingPoint: stat.isFloatingPoint,
  }
}

export function createStatTypeWPostFix(stat, postfix) {
  return {
    key: stat.key + SEP + postfix,
    fullName: stat.fullName + SEP + postfix,
    shortName: stat.shortName + SEP + postfix,
    abbrivation: stat.abbrivation + SEP + postfix,
    dataType: stat.dataType,
    isFloatingPoint: stat.isFloatingPoint,
  }
}

export function generateDefaultStatistics(
  data,
  isStrict,
  periodStart,
  periodStop
) {
  /* {
    start: null,
    stop: null,
    duration: 0,
    groups: [{
      start: null,
      stop: null,
      duration: 0,
      results: [
        {
          testCases: [
            {
              steps: [
                {
                  start: new Date(),
                  stop: null,
                  sourceLcation {line: 0,uri: null}
                  duration: 0,
                  status: null,
                  text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
                  exception:[{}],
                }
              ],
              start: new Date(),
              stop: null,
              duration: 0,
              pickleId: 0,
              sourceLpcation {line: 0,uri: null}
              name: this.testCases[this.curTestCase].pickle.name,
              status: null,
              exception:{message:'message',status:''},
            }
          ],
          start: null,
          stop: null,
          duration: 0,
          success: null,
        }
      ],
      }
    ],
    success: true
  } */
  let calculatedResult = {
    start: null,
    stop: null,
    duration: 0,
    name: null,
    groups: [],
    statTypes: getDefaultStatTypes(isStrict),
  }
  calculatedResult.start = data.start
  calculatedResult.stop = data.stop
  calculatedResult.duration = data.duration
  calculatedResult.name = data.name
  data.groups.forEach(groupResult => {
    calculatedResult.groups.push(
      calculateGroup(groupResult, isStrict, periodStart, periodStop)
    )
  })
  return calculatedResult
}

function calculateGroup(groupResult, isStrict, periodStart, periodStop) {
  var result = {
    start: periodStart != null ? periodStart : groupResult.start,
    stop: periodStop != null ? periodStop : groupResult.stop,
    stats: getDefaultStats(isStrict),
    text: groupResult.text,
    testCases: [],
    durations: [],
  }
  /* {
      start: null,
      stop: null,
      duration: 0,
      results: []
    } */
  let nextConcurrentPeriod = null
  let concurrency = []
  for (let gr of groupResult.results) {
    if (periodStop != null && gr.stop > periodStop) {
      break
    }
    if (periodStart == null || gr.stop > periodStart) {
      /* {
        testCases: [],
        start: null,
        stop: null,
        duration: 0,
        success: null,
      } */
      //* *************************
      // Regular Calculations
      // group level
      if (nextConcurrentPeriod == null) {
        nextConcurrentPeriod = new Date(new Date(gr.start).getTime() + 1000)
      } else if (new Date(gr.start) >= nextConcurrentPeriod) {
        while (new Date(gr.start) >= nextConcurrentPeriod) {
          nextConcurrentPeriod = new Date(nextConcurrentPeriod.getTime() + 1000)
          result.stats[statType.CONCURRENCY.key] += getConcurrent(
            nextConcurrentPeriod,
            concurrency
          )
        }
      }
      if ((isStrict && gr.success) || !isStrict) {
        concurrency.push(new Date(gr.stop))
        result.durations.push(gr.duration)
        result.stats[statType.AVERAGE.key] += gr.duration
        result.stats[statType.COUNT.key]++
        if (
          result.stats[statType.MAXIMUM.key] === null ||
          gr.duration > result.stats[statType.MAXIMUM.key]
        ) {
          result.stats[statType.MAXIMUM.key] = gr.duration
        }
        if (
          result.stats[statType.MINIMUM.key] === null ||
          gr.duration < result.stats[statType.MINIMUM.key]
        ) {
          result.stats[statType.MINIMUM.key] = gr.duration
        }
        if (!isStrict) {
          if (gr.success) result.stats[statType.PASSED.key]++
          if (!gr.success) result.stats[statType.FAILED.key]++
        }
        // scenario
        for (let tc of gr.testCases) {
          /* {
          steps: [
          ],
          start: new Date(),
          stop: null,
          duration: 0,
          line: 0,
          name: this.testCases[this.curTestCase].pickle.name,
          uri: null, //feature
          status: null,
        } */
          let ctc = _.find(result.testCases, {
            name: tc.name,
            sourceLocation: tc.sourceLocation,
          })
          if (ctc === undefined) {
            ctc = {
              steps: [],
              sourceLocation: tc.sourceLocation,
              name: tc.name,
              durations: [],
              stats: getDefaultStats(isStrict),
            }
            result.testCases.push(ctc)
            // result.uri = tc.uri
          }
          // add exceptions
          if (tc.exception || isStatusWarning(tc.status)) {
            result.hasIssues = true
            ctc.hasIssues = true
          }

          if ((isStrict && gr.success) || !isStrict) {
            ctc.durations.push(tc.duration)
            ctc.stats[statType.AVERAGE.key] += tc.duration
            ctc.stats[statType.COUNT.key]++
            if (
              ctc.stats[statType.MAXIMUM.key] === null ||
              tc.duration > ctc.stats[statType.MAXIMUM.key]
            ) {
              ctc.stats[statType.MAXIMUM.key] = tc.duration
            }
            if (
              ctc.stats[statType.MINIMUM.key] === null ||
              tc.duration < ctc.stats[statType.MINIMUM.key]
            ) {
              ctc.stats[statType.MINIMUM.key] = tc.duration
            }
            if (!isStrict) {
              if (tc.status === Status.PASSED) ctc.stats[statType.PASSED.key]++
              else ctc.stats[statType.FAILED.key]++
            }
          }
          // step
          for (let ts of tc.steps) {
            /* {
            start: new Date(),
            stop: null,
            duration: 0,
            status: null,
            text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
          } */
            let cts = _.find(ctc.steps, { text: ts.text })
            if (cts === undefined) {
              cts = {
                sourceLocation: ts.sourceLocation,
                actionLocation: ts.actionLocation,
                stats: getDefaultStats(isStrict),
                durations: [],
                text: ts.text,
              }
              ctc.steps.push(cts)
            }
            // handle issues
            /*   issues: [
            { cnt: 0,
              first: null,
              last: null,
              status: Status.FAILED,
              exception: {}
            }
          ] */
            if (isStatusFailure(ts.status) || isStatusWarning(ts.status)) {
              if (!cts.issues) {
                let issue = ts.exception
                  ? {
                      cnt: 1,
                      status: ts.status,
                      first: ts.stop,
                      last: ts.stop,
                      exception: ts.exception,
                    }
                  : { cnt: 1, status: ts.status, first: ts.stop, last: ts.stop }
                cts.issues = [issue]
              } else if (ts.exception) {
                let ex = _.find(cts.issues, function(o) {
                  return o.exception.message === ts.exception.message
                })
                if (ex) {
                  ex.cnt++
                  if (ts.stop < ex.first) ex.first = ts.stop
                  if (ts.stop > ex.last) ex.last = ts.stop
                } else {
                  cts.issues.push({
                    exception: ts.exception,
                    cnt: 1,
                    status: ts.status,
                    first: ts.stop,
                    last: ts.stop,
                  })
                }
              } else {
                let wrn = _.find(cts.issues, { status: ts.status })
                if (wrn) {
                  wrn.cnt++
                  if (ts.stop < wrn.first) wrn.first = ts.stop
                  if (ts.stop > wrn.last) wrn.last = ts.stop
                } else {
                  cts.issues.push({
                    exception: ts.exception,
                    cnt: 1,
                    status: ts.status,
                    first: ts.stop,
                    last: ts.stop,
                  })
                }
              }
            }
            if ((isStrict && gr.success) || !isStrict) {
              cts.durations.push(ts.duration)
              cts.stats[statType.AVERAGE.key] += ts.duration
              cts.stats[statType.COUNT.key]++
              if (
                cts.stats[statType.MAXIMUM.key] === null ||
                ts.duration > cts.stats[statType.MAXIMUM.key]
              ) {
                cts.stats[statType.MAXIMUM.key] = ts.duration
              }
              if (
                cts.stats[statType.MINIMUM.key] === null ||
                ts.duration < cts.stats[statType.MINIMUM.key]
              ) {
                cts.stats[statType.MINIMUM.key] = ts.duration
              }
              if (!isStrict) {
                if (ts.status === Status.PASSED)
                  cts.stats[statType.PASSED.key]++
                else cts.stats[statType.FAILED.key]++
              }
            }
          }
        }
      }
    }
  }
  // Calculate concurruency
  if (periodStart === null) {
    periodStart = new Date(groupResult.start)
    periodStop = new Date(groupResult.stop)
  }
  while (periodStop >= nextConcurrentPeriod) {
    nextConcurrentPeriod = new Date(nextConcurrentPeriod.getTime() + 1000)
    result.stats[statType.CONCURRENCY.key] += getConcurrent(
      nextConcurrentPeriod,
      concurrency
    )
  }
  let totalSeconds =
    (new Date(periodStop).getTime() - new Date(periodStart).getTime()) / 1000
  if (totalSeconds > 0)
    result.stats[statType.CONCURRENCY.key] =
      result.stats[statType.CONCURRENCY.key] / totalSeconds

  if (result.stats[statType.AVERAGE.key] > 0) {
    result.stats[statType.AVERAGE.key] =
      result.stats[statType.AVERAGE.key] / result.stats[statType.COUNT.key]
    result.durations = [...result.durations].sort((a, b) => a - b)
    for (let tc of result.testCases) {
      tc.stats[statType.AVERAGE.key] =
        tc.stats[statType.AVERAGE.key] / tc.stats[statType.COUNT.key]
      tc.durations = [...tc.durations].sort((a, b) => a - b)
      for (let ts of tc.steps) {
        ts.stats[statType.AVERAGE.key] =
          ts.stats[statType.AVERAGE.key] / ts.stats[statType.COUNT.key]
        ts.durations = [...ts.durations].sort((a, b) => a - b)
      }
    }
  }
  return result
}

function getConcurrent(period, concurrency) {
  for (let i = 0; i < concurrency.length; i++) {
    if (concurrency[i] < period) concurrency.splice(i, 1)
  }
  return concurrency.length
}
