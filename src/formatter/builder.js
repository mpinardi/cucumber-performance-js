import getColorFns from './get_color_fns'
import ProgressFormatter from './progress_formatter'
import path from 'path'
import SummaryFormatter from './summary_formatter'
import Statistics from './statistics'
import ChartPointsFormatter from './chartpoints_formatter'
import LoggerFormatter from './logger_formatter'

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
      case 'chartpoints':
        return ChartPointsFormatter
      case 'logger':
        return LoggerFormatter
      case 'summary':
        return SummaryFormatter
      case 'statistics':
        return Statistics
      case 'progress':
        return ProgressFormatter
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
