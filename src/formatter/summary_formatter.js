import _ from 'lodash'
import { formatIssue, formatSummary, isStatusFailure,isStatusWarning } from './helpers'
import Formatter from '.'
import {Status} from 'cucumber'

export default class SummaryFormatter extends Formatter {
  constructor(options) {
    super(options)
    options.eventBroadcaster.on('simulation-statistics-finished', ::this.logSummary)
  }

  logSummary(result) {
    const failures = []
    const warnings = []
    result.groups.forEach((group) => {
      if (group.hasExceptions) {
        let g = {group: group.text,
          testCases: []}
        group.testCases.forEach((tc) => {
          let t = {sourceLocation: tc.sourceLocation,
          name: tc.name, steps: []}
          if (tc.exceptions) {
            t.exceptions = tc.exceptions
            g.testCases.push(t)
            tc.steps.forEach((ts,index) => {
              if (isStatusFailure(ts.status)) {
                t.steps.push({index: index,text: ts.text, status: ts.status, sourceLocation: ts.sourceLocation,exception: ts.exception})
              } 
            })
          }
        })
        failures.push(g )
      } 
      else if (group.hasWarnings)
      {
        let g = {group: group.text,
          testCases: []}
        group.testCases.forEach((tc) => {
          let t = {sourceLocation: tc.sourceLocation,
            name: tc.name, steps: []}
          tc.steps.forEach((ts,index) => {
            if (isStatusWarning(ts.status)) {
              t.steps.push({index: index,text: ts.text, status: ts.status,sourceLocation: ts.sourceLocation})
            } 
          })
          g.testCases.push(t)
        })
        warnings.push(g)
      }
    })
    this.log('\n')
    this.log(
      formatSummary({
        colorFns: this.colorFns,
        testRun: result
      })
    )
    this.log('\n')
    if (failures.length > 0) {
      this.logIssues({ issues: failures, title: 'Failures' })
    }
    if (warnings.length > 0) {
      this.logIssues({ issues: warnings, title: 'Warnings' })
    }
  }

  logIssues({ issues, title }) {
    this.log(`${title}:\n`)
    issues.forEach((group, index) => {
      group.testCases.forEach((testCase, index) => {
        const {
          gherkinDocument,
          pickle,
        } = this.eventDataCollector.getTestCaseData(testCase.sourceLocation)
        //pickle.steps[].locations[].line
        this.log(
          formatIssue({
            colorFns: this.colorFns,
            gherkinDocument,
            number: index + 1,
            pickle,
            testCase,
          })
        )
      })
    })
  }
}