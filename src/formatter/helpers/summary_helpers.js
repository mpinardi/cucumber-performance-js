const reportingStats = ['cnt', 'avg', 'min', 'max']

export function formatSummary({ colorFns, testRun }) {
  let groupSummarys = ''
  testRun.groups.forEach((group, index) => {
    let v = getGroupSummary({
      colorFns: colorFns,
      group: group,
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

function getGroupSummary({ colorFns, group }) {
  let text =
    colorFns['groupTitle']('Group: ') +
    group.text +
    ' ' +
    getStatistics({ colorFns: colorFns, object: group }) +
    '\n'
  group.testCases.forEach(testCase => {
    text +=
      '\t' +
      colorFns['cukeTitle']('Scenario: ') +
      testCase.name +
      ' ' +
      getStatistics({ colorFns: colorFns, object: testCase }) +
      '\n'
    testCase.steps.forEach(step => {
      text +=
        '\t\t' +
        colorFns['cukeTitle']('Step: ') +
        step.text +
        ' ' +
        getStatistics({ colorFns: colorFns, object: step }) +
        '\n'
    })
  })
  return text
}

function getStatistics({ colorFns, object }) {
  let text = ''
  reportingStats.forEach(stat => {
    if (stat === 'avg') {
      text += `${colorFns['statTitle'](stat)}:${object[stat].toPrecision(5)} `
    } else {
      text += `${colorFns['statTitle'](stat)}:${object[stat]} `
    }
  })
  return text
}

function getDuration(duration) {
  return `${duration.hours()}:${duration.minutes()}:${duration.seconds()}.${duration.milliseconds()}`
}
