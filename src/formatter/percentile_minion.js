import _ from 'lodash'
import Minion from './minion'
import { statType, createStatTypeWPostFix } from './statistics'

export default class PercentileCreator extends Minion {
  constructor(options) {
    super(options)
    this.percentile = 90.0
    this.postfix = '90'
    for (let opt of this.options) {
      let n = parseFloat(opt)
      if (!isNaN(n)) {
        this.postfix = opt
        this.percentile = n
      }
    }
  }

  run(calculatedResults) {
    let type = createStatTypeWPostFix(statType.PERCENTILE, this.postfix)
    calculatedResults.statTypes[type.key] = type
    calculatedResults.groups.forEach(group => {
      if (group.durations.length > 0) {
        group.stats[type.key] =
          group.durations[this.percentilePosition(group.durations.length) - 1]
      } else group.stats[type.key] = null
      group.testCases.forEach(testCase => {
        if (testCase.durations.length > 0) {
          testCase.stats[type.key] =
            // eslint-disable-next-line prettier/prettier
            testCase.durations[this.percentilePosition(testCase.durations.length) - 1]
        } else testCase.stats[type.key] = null
        testCase.steps.forEach(step => {
          if (step.durations.length > 0) {
            step.stats[type.key] =
              step.durations[this.percentilePosition(step.durations.length) - 1]
          } else step.stats[type.key] = null
        })
      })
    })
    return calculatedResults
  }

  percentilePosition(length) {
    let percent = this.percentile / 100
    return _.round(length * percent)
  }
}
