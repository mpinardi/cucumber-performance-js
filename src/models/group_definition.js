import { CucumberExpression, RegularExpression } from 'cucumber-expressions'
import DataTable from 'cucumber'
import { buildGroupArgumentIterator } from '../group_arguments'

export default class GroupDefinition {
  constructor({ code, line, options, pattern, uri }) {
    this.code = code
    this.line = line
    this.options = options
    this.pattern = pattern
    this.uri = uri
  }

  buildInvalidCodeLengthMessage(syncOrPromiseLength, callbackLength) {
    return (
      `function has ${this.code.length} arguments` +
      `, should have ${syncOrPromiseLength} (if synchronous or returning a promise)` +
      ` or ${callbackLength} (if accepting a callback)`
    )
  }

  getInvalidCodeLengthMessage(parameters) {
    return this.buildInvalidCodeLengthMessage(
      parameters.length,
      parameters.length + 1
    )
  }

  getInvocationParameters({ group, parameterTypeRegistry, world }) {
    const cucumberExpression = this.getCucumberExpression(parameterTypeRegistry)
    const groupNameParameters = cucumberExpression
      .match(group.text)
      .map(arg => arg.getValue(world))
    const iterator = buildGroupArgumentIterator({
      dataTable: arg => new DataTable(arg),
      docString: arg => arg.content,
    })
    const groupArgumentParameters = group.arguments.map(iterator)
    return groupNameParameters.concat(groupArgumentParameters)
  }

  getCucumberExpression(parameterTypeRegistry) {
    if (typeof this.pattern === 'string') {
      return new CucumberExpression(this.pattern, parameterTypeRegistry)
    }
    return new RegularExpression(this.pattern, parameterTypeRegistry)
  }

  getValidCodeLengths(parameters) {
    return [parameters.length, parameters.length + 1]
  }

  matchesGroupName({ groupName, parameterTypeRegistry }) {
    const cucumberExpression = this.getCucumberExpression(parameterTypeRegistry)
    return Boolean(cucumberExpression.match(groupName))
  }
}