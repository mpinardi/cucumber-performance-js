import { formatCSV } from './helpers'
import Formatter from '.'
import StatisticsFormatter from './statistics_formatter'
import { statType } from './statistics'

export const HEADER =
  'label,avg_ct,avg_lt,avg_rt,bytes,concurrency,fail,stdev_rt,succ,throughput,perc_0.0,perc_50.0,perc_90.0,perc_95.0,perc_99.0,perc_99.9,perc_100.0,rc_200'

export const ORDER = Object.freeze([
  { key: 'avg_ct', default: '0.000' },
  { key: 'avg_lt', default: '0.000' },
  { key: statType.AVERAGE.key, default: '0.000' },
  { key: 'bytes', default: '0' },
  { key: statType.CONCURRENCY.key, default: '0.000' },
  { key: statType.FAILED.key, default: '0' },
  { key: statType.STD_DEVIATION.key, default: '0.000' },
  { key: statType.PASSED.key, default: '0' },
  { key: statType.COUNT.key, default: '0' },
  { key: statType.MINIMUM.key, default: '0' },
  { key: 'perc_50', default: '0.000' },
  { key: 'perc_90', default: '0.000' },
  { key: 'perc_95', default: '0.000' },
  { key: 'perc_99', default: '0.000' },
  { key: 'perc_99.5', default: '0.000' },
  { key: statType.MAXIMUM.key, default: '0' },
  { key: 'rc_200', default: '0' },
])

export default class TaurusFormatter extends Formatter {
  constructor(options) {
    super(options)
    options.eventBroadcaster.on(
      'simulation-statistics-finished',
      ::this.logFinalStats
    )
    options.eventBroadcaster.on('perf-run-started', ::this.configStatistics)
  }

  configStatistics() {
    this.eventBroadcaster.emit(
      StatisticsFormatter.CONFIG_ADDPLUGIN,
      'prcntl:50'
    )
    this.eventBroadcaster.emit(
      StatisticsFormatter.CONFIG_ADDPLUGIN,
      'prcntl:90'
    )
    this.eventBroadcaster.emit(
      StatisticsFormatter.CONFIG_ADDPLUGIN,
      'prcntl:95'
    )
    this.eventBroadcaster.emit(
      StatisticsFormatter.CONFIG_ADDPLUGIN,
      'prcntl:99'
    )
    this.eventBroadcaster.emit(
      StatisticsFormatter.CONFIG_ADDPLUGIN,
      'prcntl:99.5'
    )
  }

  logFinalStats(result) {
    this.log(
      formatCSV({
        colorFns: this.colorFns,
        heading: HEADER,
        statOrder: ORDER,
        testRun: result,
      })
    )
    this.log('\n')
  }
}
