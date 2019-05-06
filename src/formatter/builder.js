//import EventProtocolFormatter from './event_protocol_formatter'
import getColorFns from './get_color_fns'
//import JavascriptSnippetSyntax from './step_definition_snippet_builder/javascript_snippet_syntax'
//import JsonFormatter from './json_formatter'
import ProgressFormatter from './progress_formatter'
import path from 'path'
import SummaryFormatter from './summary_formatter'
import Statistics from './statistics'
//import UsageFormatter from './usage_formatter'
//import UsageJsonFormatter from './usage_json_formatter'

export default class FormatterBuilder {
  static build(type, options) {
    const Formatter = FormatterBuilder.getConstructorByType(type, options)
    const extendedOptions = {
      colorFns: getColorFns(options.colorsEnabled),
      ...options,
    }
    return new Formatter(extendedOptions)
  }

  static getConstructorByType(type, options) {
    switch (type) {
      case 'json':
        return JsonFormatter
      case 'summary':
        return SummaryFormatter
      case 'statistics':
        return Statistics
      case 'progress':
        return ProgressFormatter
      case 'usage':
        return UsageFormatter
      case 'usage-json':
        return UsageJsonFormatter
      default:
        return FormatterBuilder.loadCustomFormatter(type, options)
    }
  }

  static loadCustomFormatter(customFormatterPath, { cwd }) {
    const fullCustomFormatterPath = path.resolve(cwd, customFormatterPath)
    const CustomFormatter = require(fullCustomFormatterPath)
    if (typeof CustomFormatter === 'function') {
      return CustomFormatter
    } else if (
      CustomFormatter &&
      typeof CustomFormatter.default === 'function'
    ) {
      return CustomFormatter.default
    }
    throw new Error(
      `Custom formatter (${customFormatterPath}) does not export a function`
    )
  }
}