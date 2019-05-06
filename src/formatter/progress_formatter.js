import { trimFeature } from './helpers'
import { Status } from 'cucumber'
import Formatter from '.'
import _ from 'lodash'

export default class ProgressFormatter extends Formatter {
  constructor(options) {
    super(options)
    options.eventBroadcaster.on('cuke-run-finished', ::this.logProgress)
    options.eventBroadcaster.on('cuke-run-started', ::this.logProgress)
    this.groups = []
    this.lastLength = 0
    this.lastSuccess = undefined
  }

  logProgress({ data }) {
    let cur = this.containsGroup(data.group.text)
    let line = '\r'
    for (let i = 0; (i < this.groups.length || cur == this.groups.length); i++)
    { 
      if (i == cur)
         this.groups[i] = data.group
      let group =  this.groups[i]
      line += (i>0)?" | ":""
      let ran = group.ran
      if (cur == i && data.success != undefined)
      {
        ran =  (data.success == true) ? this.colorFns[Status.PASSED](ran) : this.colorFns[Status.FAILED](ran)
        line+=trimFeature({name:group.text}) + ":" + group.running + "-" + group.maxRunners + ">" + ran
      }
      else{
        line+=trimFeature({name:group.text}) + ":" + group.running + "-" + group.maxRunners + ">" + ran
      }
    }
    this.log(this.bufferLength(line, data.success))
  }

  bufferLength(line, success) {
    //To prevent ghosting of values
    //if success is null and last success is null then use lastlength
    //if success is null and last success is not null  then use (lastlength - 10)
    //if success is not null and last success is not null then use lastlength
    //if success is not null and last success is null then use (lastlength + 10)
    line = this.lastLength>0?_.padEnd(line,this.colorFns.enabled?(success == undefined ? 
      (this.lastSuccess == undefined ? this.lastLength : (this.lastLength - 10)):
      (this.lastSuccess == undefined ? (this.lastLength + 10): this.lastLength)):this.lastLength):line
    this.lastLength = line.length
    this.lastSuccess = success
    return line
  }

  containsGroup(text)
  {
      for (let i = 0; i < this.groups.length; i++)
      {
        let group = this.groups[i]
        if (group.text == text)
        {
          return i
        }
      }
      return this.groups.length
  }
}