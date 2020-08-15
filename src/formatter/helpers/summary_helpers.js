import { statDataType } from '../statistics'

export function convertOutput(displayType, dataType, value) {
  let output = ''
  if (dataType === statDataType.COUNT || dataType === statDataType.OTHER) {
    output = value
  } else if (displayType !== dataType) {
    if (
      dataType === statDataType.NANOS &&
      displayType === statDataType.MILLIS
    ) {
      output = output + value / 1000000
    } else if (
      dataType === statDataType.MILLIS &&
      displayType === statDataType.NANOS
    ) {
      output = output + value * 1000000
    } else if (
      dataType === statDataType.MILLIS &&
      displayType === statDataType.SECONDS
    ) {
      output = output + value / 1000
    } else if (
      dataType === statDataType.NANOS &&
      displayType === statDataType.SECONDS
    ) {
      output = output + value / 1000000000
    } else if (
      dataType === statDataType.SECONDS &&
      displayType === statDataType.MILLIS
    ) {
      output = output + value * 1000
    } else if (
      dataType === statDataType.SECONDS &&
      displayType === statDataType.NANOS
    ) {
      output = output + value * 1000000000
    }
  } else {
    output = output + value
  }
  return output
}

export function formatSummary({ colorFns, testRun }) {
  let groupSummarys = ''
  testRun.groups.forEach((group, index) => {
    let v = getGroupSummary({
      colorFns: colorFns,
      group: group,
      statTypes: testRun.statTypes,
    })
    groupSummarys += v
  })
  const durationSummary = getDuration(testRun.duration)
  return [
    colorFns['simulationTitle']('Simulation: ') + testRun.name,
    groupSummarys,
    'Runtime: ' + durationSummary,
  ].join('\n')
}

function getGroupSummary({ colorFns, group, statTypes }) {
  let text =
    colorFns['groupTitle']('Group: ') +
    group.text +
    ' ' +
    getStatistics({ colorFns: colorFns, object: group, statTypes: statTypes }) +
    '\n'
  group.testCases.forEach(testCase => {
    text +=
      '\t' +
      colorFns['cukeTitle']('Scenario: ') +
      testCase.name +
      ' ' +
      getStatistics({
        colorFns: colorFns,
        object: testCase,
        statTypes: statTypes,
      }) +
      '\n'
    testCase.steps.forEach(step => {
      text +=
        '\t\t' +
        colorFns['cukeTitle']('Step: ') +
        step.text +
        ' ' +
        getStatistics({
          colorFns: colorFns,
          object: step,
          statTypes: statTypes,
        }) +
        '\n'
    })
  })
  return text
}

function getStatistics({ colorFns, object, statTypes }) {
  let text = ''
  for (let stat in statTypes) {
    if (statTypes[stat].isFloatingPoint && object.stats[stat] != null) {
      text += `${colorFns['statTitle'](stat)}:${object.stats[stat].toFixed(3)} `
    } else {
      text += `${colorFns['statTitle'](stat)}:${object.stats[stat]} `
    }
  }
  return text
}

function getDuration(duration) {
  return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}.${duration.milliseconds()}`
}
