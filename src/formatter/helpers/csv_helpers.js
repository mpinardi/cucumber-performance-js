import { convertOutput } from './summary_helpers'

export function formatCSV({
  colorFns,
  heading,
  statOrder,
  displayType,
  testRun,
}) {
  let rows = ''
  testRun.groups.forEach(group => {
    let v = getGroupLines({
      colorFns: colorFns,
      group: group,
      statOrder: statOrder,
      displayType: displayType,
      statTypes: testRun.statTypes,
    })
    rows += v
  })
  return [colorFns['simulationTitle'](heading), rows].join('\n')
}

function getGroupLines({ colorFns, group, statOrder, displayType, statTypes }) {
  let gt = colorFns['groupTitle'](group.text)
  let text =
    gt +
    getStatistics({
      object: group,
      statOrder: statOrder,
      statTypes: statTypes,
      displayType: displayType,
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
        displayType: displayType,
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
          displayType: displayType,
        }) +
        '\n'
    })
  })
  return text
}

function getStatistics({ object, statOrder, statTypes, displayType }) {
  let text = ''
  for (let stat of statOrder) {
    if (statTypes.hasOwnProperty(stat.key)) {
      if (
        statTypes[stat.key].isFloatingPoint &&
        object.stats[stat.key] != null
      ) {
        text +=
          ',' +
          convertOutput(
            displayType,
            statTypes[stat.key].dataType,
            object.stats[stat.key]
          ).toFixed(3)
      } else {
        text +=
          ',' +
          convertOutput(
            displayType,
            statTypes[stat.key].dataType,
            object.stats[stat.key]
          )
      }
    } else {
      text += ',' + stat.default
    }
  }
  return text
}
