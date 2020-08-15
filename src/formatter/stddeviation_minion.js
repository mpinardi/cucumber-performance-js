import Minion from './minion'
import { statType } from './statistics'

export default class StdDeviationCreator extends Minion {
  run(calculatedResults) {
    let type = statType.STD_DEVIATION
    calculatedResults.statTypes[type.key] = type
    calculatedResults.groups.forEach(group => {
      group.stats[type.key] = this.calculateStdDev(group.durations)
      group.testCases.forEach(testCase => {
        testCase.stats[type.key] = this.calculateStdDev(testCase.durations)
        testCase.steps.forEach(step => {
          step.stats[type.key] = this.calculateStdDev(step.durations)
        })
      })
    })
    return calculatedResults
  }

  calculateStdDev(values) {
    if (values.length > 0) {
      let m = this.mean(values)
      let smsl = this.subtractMeanSquare(m, values)
      let dm = this.mean(smsl)
      return Math.sqrt(dm)
    }
    return null
  }

  sum(values) {
    let sum = 0
    for (let l of values) {
      sum = sum + l
    }
    return sum
  }

  mean(values) {
    return this.sum(values) / values.length
  }

  subtractMeanSquare(mean, values) {
    let result = []
    for (let l of values) {
      let sub = l - mean
      result.push(sub * sub)
    }
    return result
  }
}
