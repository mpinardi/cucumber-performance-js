import getColorFns from './get_color_fns'
import ProgressFormatter from './progress_formatter'
import path from 'path'
import SummaryFormatter from './summary_formatter'
import TaurusFormatter from './taurus_formatter'
import Statistics from './statistics_formatter'
import ChartPointsFormatter from './chartpoints_formatter'
import LoggerFormatter from './logger_formatter'
import PercentileCreator from './percentile_minion'
import StdDeviationCreator from './stddeviation_minion'
import Minion from './minion'
import Formatter from '.'

export default class PluginBuilder {
  static build(type, options) {
    const Formatter = PluginBuilder.getConstructorByType(type, options)
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
      case 'taurus':
        return TaurusFormatter
      case 'prcntl':
        return PercentileCreator
      case 'prctl':
        return PercentileCreator
      case 'stddev':
        return StdDeviationCreator
      case 'stdev':
        return StdDeviationCreator
      default:
        return PluginBuilder.loadCustomFormatter(type, options)
    }
  }

  static isMinion(type) {
    if (type != null && type !== undefined) {
      let plugin = this.getConstructorByType(type, null)
      if (plugin.prototype instanceof Minion) return true
    }
    return false
  }

  static isFormatter(type) {
    if (type != null && type !== undefined) {
      let plugin = this.getConstructorByType(type, null)
      if (plugin.prototype instanceof Formatter) return true
    }
    return false
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
