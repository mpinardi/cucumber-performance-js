import { statDataType } from '../statistics'

export function convertOutput(displayType, dataType, value) {
  let output = value
  if (
    !(dataType === statDataType.COUNT || dataType === statDataType.OTHER) &&
    displayType !== dataType
  ) {
    if (
      dataType === statDataType.NANOS &&
      displayType === statDataType.MILLIS
    ) {
      output = value / 1000000
    } else if (
      dataType === statDataType.MILLIS &&
      displayType === statDataType.NANOS
    ) {
      output = value * 1000000
    } else if (
      dataType === statDataType.MILLIS &&
      displayType === statDataType.SECONDS
    ) {
      output = value / 1000
    } else if (
      dataType === statDataType.NANOS &&
      displayType === statDataType.SECONDS
    ) {
      output = value / 1000000000
    } else if (
      dataType === statDataType.SECONDS &&
      displayType === statDataType.MILLIS
    ) {
      output = value * 1000
    } else if (
      dataType === statDataType.SECONDS &&
      displayType === statDataType.NANOS
    ) {
      output = value * 1000000000
    }
  }
  return output
}

export function formatSummary({ displayType, colorFns, testRun }) {
  let groupSummarys = ''
  testRun.groups.forEach((group, index) => {
    let v = getGroupSummary({
      colorFns: colorFns,
      group: group,
      statTypes: testRun.statTypes,
      displayType: displayType,
    })
    groupSummarys += v
  })
  const durationSummary = getDuration(testRun.duration)
  return [
    colorFns['simulationTitle']('Simulation: ') +
      testRun.name +
      colorFns['statTitle'](' Start: ') +
      testRun.start +
      colorFns['statTitle'](' Stop: ') +
      testRun.stop +
      colorFns['statTitle'](' Duration: ') +
      durationSummary,
    groupSummarys,
  ].join('\n')
}

function getGroupSummary({ colorFns, group, statTypes, displayType }) {
  let text =
    colorFns['groupTitle']('Group: ') +
    group.text +
    ' ' +
    getStatistics({
      colorFns: colorFns,
      object: group,
      statTypes: statTypes,
      displayType: displayType,
    }) +
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
        displayType: displayType,
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
          displayType: displayType,
        }) +
        '\n'
    })
  })
  return text
}

function getStatistics({ colorFns, object, statTypes, displayType }) {
  let text = ''
  for (let stat in statTypes) {
    if (statTypes[stat].isFloatingPoint && object.stats[stat] != null) {
      text += `${colorFns['statTitle'](stat)}:${convertOutput(
        displayType,
        statTypes[stat].dataType,
        object.stats[stat]
      ).toFixed(3)} `
    } else {
      text += `${colorFns['statTitle'](stat)}:${convertOutput(
        displayType,
        statTypes[stat].dataType,
        object.stats[stat]
      )} `
    }
  }
  return text
}

function getDuration(duration) {
  return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}.${duration.milliseconds()}`
}
