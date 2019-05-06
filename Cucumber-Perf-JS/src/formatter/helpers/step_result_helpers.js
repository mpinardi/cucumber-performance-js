import { formatterHelpers } from 'cucumber'
import {Status} from 'cucumber'
import indentString from 'indent-string'

function getAmbiguousStepResultMessage({ colorFns, testStep }) {
  return colorFns.ambiguous(testStep.exception)
}

function getFailedStepResultMessage({ colorFns, testStep }) {
  return formatterHelpers.formatError(testStep.exception, colorFns)
}

function getPendingStepResultMessage({ colorFns }) {
  return colorFns.pending('Pending')
}

export function getStepMessage({
  colorFns,
  keywordType,
  testStep,
  pickleStep,
}) {
  switch (testStep.status) {
    case Status.AMBIGUOUS:
      return getAmbiguousStepResultMessage({ colorFns, testStep })
    case Status.FAILED:
      return getFailedStepResultMessage({ colorFns, testStep })
    case Status.UNDEFINED:
      return getUndefinedStepResultMessage({
        colorFns,
        keywordType,
        pickleStep,
      })
    case Status.PENDING:
      return getPendingStepResultMessage({ colorFns })
  }
}

function getUndefinedStepResultMessage({
  colorFns,
  keywordType,
  pickleStep,
}) {
  const message = `${'Undefined. Implement with the following Step:'}`
  return colorFns.undefined(message)
}