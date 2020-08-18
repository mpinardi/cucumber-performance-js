import _ from 'lodash'
import { formatIssue, formatSummary } from './helpers'
import { statDataType } from './statistics'
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
    if (this.isStdio()) this.log('\n')
    this.log(
      formatSummary({
        displayType: statDataType.MILLIS,
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
            // 5.*
            // const {
            //   gherkinDocument,
            //   pickle,
            // } = this.eventDataCollector.getTestCaseData(testCase.sourceLocation)
            // eslint-disable-next-line prettier/prettier
            const gherkinDocument = this.eventDataCollector.gherkinDocumentMap[group.uri]
            // eslint-disable-next-line prettier/prettier
            const pickle = this.eventDataCollector.pickleMap[testCase.sourceLocation.uri + ':' + testCase.sourceLocation.line]
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
