import _ from 'lodash'
import Formatter from '.'
import moment from 'moment'
import { generateDefaultStatistics } from './statistics'
import PluginBuilder from './builder'
import MinionOptionSplitter from './helpers/minion_option_splitter'

export default class ChartPointsFormatter extends Formatter {
  constructor(options) {
    super(options)
    this.maxPoints = 20
    this.chartPoints = []
    this.pluginMinions = []
    for (let option of this.options) {
      let mp = _.parseInt(option)
      if (!isNaN(mp)) this.maxPoints = mp
      else {
        let m = MinionOptionSplitter.split(option, options)
        if (PluginBuilder.isMinion(m.type)) this.pluginMinions.push(m)
      }
    }
    this.eventBroadcaster.on('simulation-run-finished', ::this.processData)
  }

  processData({ data }) {
    this.eventBroadcaster.emit('chartpoints-started')
    this.createChartPoints(data)
    this.logChartPoints()
    this.eventBroadcaster.emit('chartpoints-finished', this.chartPoints)
  }

  createChartPoints(data) {
    let startPeriod = data.start
    let period = this.getPeriod(
      this.durationBetween(data.start, data.stop),
      this.maxPoints
    )
    let endPeriod = this.getEnd(startPeriod, period)
    while (endPeriod <= data.stop) {
      let presult = generateDefaultStatistics(
        data,
        this.strict,
        startPeriod,
        endPeriod
      )
      presult = this.runMinions(presult)
      this.chartPoints.push({
        instant: this.getMid(startPeriod, endPeriod),
        value: presult,
      })
      startPeriod = endPeriod
      endPeriod = this.getEnd(endPeriod, period)
    }
  }

  logChartPoints() {
    for (let cp of this.chartPoints) {
      this.statTypes = cp.value.statTypes
      let instant = moment(cp.instant).toISOString()
      for (let cpg of cp.value.groups) {
        let group = cpg.text
        let scenario = ''
        let step = ''
        this.log(
          group +
            ',' +
            scenario +
            ',' +
            step +
            ',' +
            instant +
            this.getRowStats(cpg.stats) +
            '\n'
        )
        for (let cptc of cpg.testCases) {
          scenario = cptc.name
          this.log(
            group +
              ',' +
              scenario +
              ',' +
              step +
              ',' +
              instant +
              this.getRowStats(cptc.stats) +
              '\n'
          )
          for (let cpts of cptc.steps) {
            step = cpts.text
            this.log(
              group +
                ',' +
                scenario +
                ',' +
                step +
                ',' +
                instant +
                this.getRowStats(cpts.stats) +
                '\n'
            )
          }
        }
      }
    }
  }

  getRowStats(row) {
    let text = ''
    for (let stat in this.statTypes) {
      if (this.statTypes[stat].isFloatingPoint && row[stat] != null) {
        text += ',' + stat + ',' + row[stat].toFixed(3)
      } else {
        text += ',' + stat + ',' + row[stat]
      }
    }
    return text
  }

  getEnd(start, seconds) {
    let m = moment(start)
    m.add(seconds, 's')
    return m.utc().format()
  }

  durationBetween(start, end) {
    var ms = moment(end).diff(moment(start))
    return moment.duration(ms)
  }

  getMid(start, end) {
    var ms = moment(end).diff(moment(start)) / 2
    return moment(start).add(ms, 'ms')
  }

  getPeriod(time, times) {
    return time.asSeconds() / times
  }

  runMinions(chartPoint) {
    for (let plugin of this.pluginMinions) {
      let sc = PluginBuilder.build(plugin.type, plugin.options)
      let result = sc.run(chartPoint)
      chartPoint = result != null ? result : chartPoint
    }
    return chartPoint
  }
}
