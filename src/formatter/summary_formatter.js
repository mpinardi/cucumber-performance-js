import _ from 'lodash'
import { formatIssue, formatSummary } from './helpers'
import Formatter from '.'

export default class SummaryFormatter extends Formatter {
  constructor(options) {
    super(options)
    options.eventBroadcaster.on(
      'simulation-statistics-finished',
      ::this.logSummary
    )
  }

  logSummary(result) {
    this.log(
      formatSummary({
        colorFns: this.colorFns,
        testRun: result,
      })
    )
    this.log('\n')
    if (_.findIndex(result.groups, { hasIssues: true }) >= 0) {
      this.logIssues({ result: result, title: 'Issues' })
    }
  }

  logIssues({ result, title }) {
    this.log(`${title}:\n`)
    result.groups.forEach(group => {
      if (group.hasIssues) {
        group.testCases.forEach((testCase, index) => {
          if (testCase.hasIssues) {
            const {
              gherkinDocument,
              pickle,
            } = this.eventDataCollector.getTestCaseData(testCase.sourceLocation)
            this.log(
              formatIssue({
                colorFns: this.colorFns,
                gherkinDocument,
                number: index + 1,
                pickle,
                testCase,
              })
            )
          }
        })
      }
    })
  }
}
