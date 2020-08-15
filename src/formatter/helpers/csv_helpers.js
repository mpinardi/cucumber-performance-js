export function formatCSV({ colorFns, heading, statOrder, testRun }) {
  let rows = ''
  testRun.groups.forEach(group => {
    let v = getGroupLines({
      colorFns: colorFns,
      group: group,
      statOrder: statOrder,
      statTypes: testRun.statTypes,
    })
    rows += v
  })
  return [colorFns['simulationTitle'](heading), rows].join('\n')
}

function getGroupLines({ colorFns, group, statOrder, statTypes }) {
  let gt = colorFns['groupTitle'](group.text)
  let text =
    gt +
    getStatistics({
      object: group,
      statOrder: statOrder,
      statTypes: statTypes,
    }) +
    '\n'
  group.testCases.forEach(testCase => {
    let tct = colorFns['cukeTitle']('.' + testCase.name)
    text +=
      gt +
      tct +
      getStatistics({
        object: testCase,
        statOrder: statOrder,
        statTypes: statTypes,
      }) +
      '\n'
    testCase.steps.forEach(step => {
      let st = colorFns['cukeTitle']('.' + step.text)
      text +=
        gt +
        tct +
        st +
        getStatistics({
          object: step,
          statOrder: statOrder,
          statTypes: statTypes,
        }) +
        '\n'
    })
  })
  return text
}

function getStatistics({ object, statOrder, statTypes }) {
  let text = ''
  for (let stat of statOrder) {
    if (statTypes.hasOwnProperty(stat.key)) {
      if (
        statTypes[stat.key].isFloatingPoint &&
        object.stats[stat.key] != null
      ) {
        text += ',' + object.stats[stat.key].toFixed(3)
      } else {
        text += ',' + object.stats[stat.key]
      }
    } else {
      text += ',' + stat.default
    }
  }
  return text
}
