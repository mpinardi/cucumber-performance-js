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

//Must encode double quotes and wrap label string in double quotes.		
//String result = "\""+label.replaceAll("\"","\"\"")+"\""+sep+"0.00000"+sep+"0.00000"
function getGroupLines({ colorFns, group, statOrder, displayType, statTypes }) {
  let gt = colorFns['groupTitle'](group.text.replaceAll('\"','\"\"'))
  let text =
    '"'+
    gt +
    '"'+
    getStatistics({
      object: group,
      statOrder: statOrder,
      statTypes: statTypes,
      displayType: displayType,
    }) +
    '\n'
  group.testCases.forEach(testCase => {
    let tct = colorFns['cukeTitle']('.' + testCase.name.replaceAll('\"','\"\"'))
    text +=
      '"' +
      gt +
      tct +
      '"' +
      getStatistics({
        object: testCase,
        statOrder: statOrder,
        statTypes: statTypes,
        displayType: displayType,
      }) +
      '\n'
    testCase.steps.forEach(step => {
      let st = colorFns['cukeTitle']('.' + step.text.replaceAll('\"','\"\"'))
      text +=
        '"' +
        gt +
        tct +
        st +
        '"' +
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
