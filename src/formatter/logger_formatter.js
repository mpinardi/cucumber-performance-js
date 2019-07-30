import _ from 'lodash'
import Formatter from '.'
import moment from 'moment'
import path from 'path'
import fs from 'mz/fs'

export default class LoggerFormatter extends Formatter {
  constructor(options) {
    super(options)
    this.count = 0
    if (this.isStdio() && this.options.length === 0)
      this.log(
        'No output path was specified! Unable to log plan execution results.'
      )
    else options.eventBroadcaster.on('cuke-run-finished', ::this.logToFile)
    if (this.options.length > 0)
      options.eventBroadcaster.on('plan-run-started', ::this.processFile)
  }

  logToFile({ data }) {
    this.log((this.count > 0 ? ',\n' : '') + JSON.stringify(data))
    this.count++
  }

  processFile() {
    const log = fs.readFileSync(path.resolve(this.cwd, this.options[0]))
    let logobj = JSON.parse('[' + log + ']')
    this.result = {
      start: logobj[0].result.start,
      stop: logobj[logobj.length - 1].result.stop,
      duration: 0,
      groups: [],
      name: null,
      success: true,
    }
    this.result.duration = moment.duration(
      moment(this.result.stop).diff(moment(this.result.start))
    )
    for (let res of logobj) {
      let i = _.findIndex(this.result.groups, { text: res.group.text })
      if (i === -1) {
        this.result.groups.push({
          start: res.result.start,
          stop: res.result.stop,
          duration: 0,
          results: [],
          text: res.group.text,
        })
        i = 0
      }
      this.result.groups[i].results = this.result.groups[i].results.concat(
        res.result
      )
      if (moment(this.result.groups[i].stop).isBefore(moment(res.result.stop)))
        this.result.groups[i].stop = res.result.stop
    }
    this.eventBroadcaster.emit('simulation-run-finished', { data: this.result })
  }
}
