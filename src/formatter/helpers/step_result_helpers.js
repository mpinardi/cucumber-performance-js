import { formatterHelpers, Status } from 'cucumber'

import _ from 'lodash'
import indentString from 'indent-string'

function getAmbiguousStepResultMessage({ colorFns, issue }) {
  return colorFns.ambiguous(issue.exception)
}

function getFailedStepResultMessage({ colorFns, issue }) {
  return formatterHelpers.formatError(issue.exception, colorFns)
}

function getPendingStepResultMessage({ colorFns }) {
  return colorFns.pending('Pending')
}

export function getStepMessages({ colorFns, testStep }) {
  let messages = ''
  /*   if (typeof testStep.issues!== 'undefined')
  {
  for (let issue of testStep.issues) */
  let number = 1
  _.each(testStep.issues, issue => {
    let message = ''
    switch (issue.status) {
      case Status.AMBIGUOUS:
        message = getAmbiguousStepResultMessage({ colorFns, issue })
        break
      case Status.FAILED:
        message = getFailedStepResultMessage({ colorFns, issue })
        break
      case Status.UNDEFINED:
        message = getUndefinedStepResultMessage({ colorFns })
        break
      case Status.PENDING:
        message = getPendingStepResultMessage({ colorFns })
        break
    }
    if (message.length > 0) {
      message = getMessage({ number, cnt: issue.cnt, message })
      messages += messages.length > 0 ? '\n' + message : message
    }
    number++
  })
  if (messages.length > 0) {
    return messages
  }
}

function getUndefinedStepResultMessage({ colorFns }) {
  const message = `${'Undefined. Implement this step.'}`
  return colorFns.undefined(message)
}

function getMessage({ number, cnt, message }) {
  let prefix = `${number}) `
  return prefix + 'Count: ' + cnt + '\n' + indentString(message, prefix.length)
}
