import _ from 'lodash'
import Formatter from '.'

export default class ChartPointsFormatter extends Formatter {
  constructor(options) {
    super(options)
    if (this.options.length > 0) {
      let i = _.parseInt(this.options[0])
      if (i && i >= 0) {
        this.eventBroadcaster.emit('simulation-statistics-maxpoints', i)
      }
    }
    this.eventBroadcaster.on(
      'simulation-statistics-finished',
      ::this.logChartPoints
    )
  }

  logChartPoints(result) {
    for (let g of result.groups) {
      for (let cp of g.chartPoints) {
        let group = cp.text
        let scenario = ''
        let step = ''
        this.log(
          group +
            ',' +
            scenario +
            ',' +
            step +
            ',' +
            cp.stop +
            this.getRowStats(cp) +
            '\n'
        )
        for (let cptc of cp.testCases) {
          scenario = cptc.name
          this.log(
            group +
              ',' +
              scenario +
              ',' +
              step +
              ',' +
              cp.stop +
              this.getRowStats(cptc) +
              '\n'
          )
          for (let cpts of cptc.steps) {
            step = cpts.name
            this.log(
              group +
                ',' +
                scenario +
                ',' +
                step +
                ',' +
                cp.stop +
                this.getRowStats(cpts) +
                '\n'
            )
          }
        }
      }
    }
  }

  getRowStats(row) {
    return (
      ',cnt,' +
      row.cnt +
      ',avg,' +
      row.avg +
      ',min,' +
      row.min +
      ',max,' +
      row.max
    )
  }
}
