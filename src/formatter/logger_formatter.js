import _ from 'lodash'
import Formatter from '.'
import path from 'path'
import fs from 'mz/fs'

export default class LoggerFormatter extends Formatter {
  constructor(options) {
    super(options)
    this.count = 0
    if (this.isStdio()&&this.options.length===0)
      this.log("No output path was specified! Unable to log plan execution results.")
    else if (this.options.length>0)
      this.processFile()
    else
      options.eventBroadcaster.on('cuke-run-finished', ::this.logToFile)
  }

  logToFile({data}) {
    this.log((this.count>0?',\n':'')+JSON.stringify(data))
    this.count++;
  }

  async processFile() {
      const log = await fs.readFile(path.resolve(this.cwd, this.options[0]) )
      let logobj =JSON.parse("["+log+"]")
      this.result = {
        start: logobj[0].result[0].start,
        stop: null,
        duration: 0,
        groups: [],
        name: null,
        success: true,
      }
      
      for (let res of logobj)
      {
        let i = _.findIndex(this.result.groups,{text: res.group.text})
        if ( i === -1)
        {
          this.result.groups.push({
            start: res.result[0].start,
            stop: null,
            duration: 0,
            results: [],
            text: res.group.text
          })
          i=this.result.groups.length-1
        } 
        this.result.groups[i].results=this.result.groups[i].results.concat(res.result)
        let stop = res.result[res.result.length-1].stop;
        this.result.groups[i].stop= stop
        this.result.stop = stop
      }
      this.eventBroadcaster.emit('simulation-run-finished', { data: this.result })
  }
}