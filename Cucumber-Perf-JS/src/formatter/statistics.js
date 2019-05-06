import _ from 'lodash'
import moment from 'moment'
import {Status}from 'cucumber'
import {isStatusFailure,isStatusWarning } from './helpers'

export default class Statistics {
  constructor(options) {
    this.options = options
    this.startPeriod
    this.period
    this.maxPoints = 20
    this.calculatedResult = {
      start: null,
      stop: null,
      duration: 0,
      name: null,
      groups: []
    }
    /* {
      start: null,
      stop: null,
      avg: 0,
      min: 0,
      max: 0,
      cnt: 0,
      sum: 0,
      uri: null,
      testCases: [
              {
                steps: [
                  {
                    avg: 0,
                    min: 0,
                    max: 0,
                    cnt: 0,
                    sum: 0,
                    text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
                  }
                ],
                line: 0,
                name: this.testCases[this.curTestCase].pickle.name,
                avg: 0,
                min: 0,
                max: 0,
                cnt: 0,
                sum: 0
              }
      chartPoints: []
    } */
    options.eventBroadcaster.on('simulation-run-finished', ::this.generateStatistics)
  }

  generateStatistics({data}) {
    /* {
      start: null,
      stop: null,
      duration: 0,
      groups: [{
        start: null,
        stop: null,
        duration: 0,
        results: [
          {
            testCases: [
              {
                steps: [
                  {
                    start: new Date(),
                    stop: null,
                    duration: 0,
                    status: null,
                    text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
                  }
                ],
                start: new Date(),
                stop: null,
                duration: 0,
                line: 0,
                name: this.testCases[this.curTestCase].pickle.name,
                uri: null,
                status: null,
              }
            ],
            start: null,
            stop: null,
            duration: 0,
            success: null,
          }
        ],
        }
      ],
      success: true
    } */
    this.options.eventBroadcaster.emit('simulation-statistics-started')
    this.startPeriod = data.start
		this.period = this.getPeriod(this.durationBetween(data.start,data.stop),this.maxPoints);
    this.calculatedResult.start = data.start
    this.calculatedResult.stop = data.stop
    this.calculatedResult.duration = data.duration
    this.calculatedResult.name = data.name
    data.groups.forEach(group =>  {this.calculateGroup(group)});
    this.options.eventBroadcaster.emit('simulation-statistics-finished', this.calculatedResult)
  }

  calculateGroup(groupResult)
  {
    var result =
    {
      start: groupResult.start,
      stop: groupResult.stop,
      avg: 0,
      min: null,
      max: null,
      cnt: 0,
      sum: 0,
      text: groupResult.text,
      testCases: [],
      chartPoints: []
    }
    /*{
        start: null,
        stop: null,
        duration: 0,
        results: []
      } */
    let nextPeriod = this.getEnd(this.startPeriod, this.period);
    let count = 0
    let periodGroup =
    {
    start: null,
    stop: null,
    avg: 0,
    min: null,
    max: null,
    cnt: 0,
    sum: 0,
    text: groupResult.text,
    testCases: []
    }
    var first = true
    for (let gr of groupResult.results) {
    /*{
        testCases: [],
        start: null,
        stop: null,
        duration: 0,
        success: null,
      } */
      //chart points
      //feature
      if (!first && moment(gr.stop).isAfter(nextPeriod))
      {
        var pg =
        {
          start: periodGroup.start,
          stop:nextPeriod,
          avg: periodGroup.sum/periodGroup.cnt,
          min: periodGroup.min,
          max: periodGroup.max,
          cnt: periodGroup.cnt,
          sum: periodGroup.sum,
          text: periodGroup.text,
          testCases: [],
        }
        //scenario
        for (let tc of periodGroup.testCases) {
          /*{
            steps: [
            ],
            start: new Date(),
            stop: null,
            duration: 0,
            line: 0,
            name: this.testCases[this.curTestCase].pickle.name,
            uri: null, //feature
            status: null,
          } */
          let ptc = {
              start: tc.start,
              stop: tc.stop,
              steps: [],
              sourceLocation: tc.sourceLocation,
              name: tc.name,
              avg: tc.sum/tc.cnt,
              min: tc.min,
              max: tc.max,
              cnt: tc.cnt,
              sum: tc.sum,
          }
          pg.testCases.push(ptc)
          //step
          for (let ts of tc.steps) {
            /*{
              start: new Date(),
              stop: null,
              duration: 0,
              status: null,
              text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
            } */
            let pts = {
              start: ts.stop,
              stop: ts.stop,
              avg: ts.sum/ts.cnt,
              min: ts.min,
              max: ts.max,
              cnt: ts.cnt,
              sum: ts.sum,
              text: ts.text,
              sourceLocation: ts.sourceLocation
            }
            ptc.steps.push(pts)
          }
        }
        periodGroup ={
          start: null,
          stop: null,
          avg: 0,
          min: null,
          max: null,
          cnt: 0,
          sum: 0,
          text: groupResult.text,
          testCases: []
        }
        result.chartPoints.push(pg)
        nextPeriod = this.getEnd(nextPeriod, this.period)
        //review should remove
        nextPeriod = moment(gr.stop).isAfter(nextPeriod)?gr.stop:nextPeriod;
      }
      
      //**************************
      //Regular Calculations
      //feature level
      if ((this.options.strict && gr.success) || !this.options.strict) {
        periodGroup.sum += gr.duration
        periodGroup.cnt++
        if (periodGroup.start == null)
        {
          periodGroup.start = gr.start
        }
        if (periodGroup.max==null||gr.duration>periodGroup.max)
        {
          periodGroup.max = gr.duration
        }
        if (periodGroup.min==null||gr.duration<periodGroup.min)
        {
          periodGroup.min =  gr.duration
        }
        result.sum += gr.duration
        result.cnt++
        if (result.max==null||gr.duration>result.max)
        {
          result.max = gr.duration
        }
        if (result.min==null||gr.duration<result.min)
        {
          result.min =  gr.duration
        }
      }
      
      //scenario
      for (let tc of gr.testCases) {
        /*{
          steps: [
          ],
          start: new Date(),
          stop: null,
          duration: 0,
          line: 0,
          name: this.testCases[this.curTestCase].pickle.name,
          uri: null, //feature
          status: null,
        } */
        let ptc = _.find(periodGroup.testCases, { 'name': tc.name });
        if (ptc == undefined)
        {
            ptc =
            {
            steps: [],
            name: tc.name,
            sourceLocation: tc.sourceLocation,
            start: tc.start,
            stop: tc.stop,
            avg: 0,
            min: null,
            max: null,
            cnt: 0,
            sum: 0
            }
          periodGroup.testCases.push(ptc)
          //periodGroup.uri = tc.uri
        }
        let ctc = _.find(result.testCases, { 'name': tc.name });
        if (ctc == undefined)
        {
          ctc = {
            steps: [],
            sourceLocation: tc.sourceLocation,
            name: tc.name,
            avg: 0,
            min: null,
            max: null,
            cnt: 0,
            sum: 0,
          }
          result.testCases.push(ctc)
          //result.uri = tc.uri
        }
        //add exceptions
        if (tc.exception){
          if (!ctc.exceptions){
            tc.exception.cnt = 1
            tc.exception.status = tc.status
            ctc.exceptions = [tc.exception]
            result.hasExceptions=true
          } else
          {
            let ex = _.find(ctc.exceptions, { 'message': tc.exception.message })
            if (ex)
            {
              ex.cnt++
            } else
            {
              ex = tc.exception
              ex.cnt = 1
            }
          }
        } else if (isStatusWarning(tc.status)){
          result.hasWarnings = true
        }

        if ((this.options.strict && gr.success) || !this.options.strict) {
          ctc.sum += tc.duration
          ctc.cnt++
          if (ctc.max==null||tc.duration>ctc.max)
          {
            ctc.max = tc.duration
          }
          if (ctc.min==null||tc.duration<ctc.min)
          {
            ctc.min =  tc.duration
          }
          ptc.sum += tc.duration
          ptc.cnt++
          ptc.start = (ptc.start == null)? tc.start:ptc.start 
          ptc.stop = tc.stop
          if (ptc.max==null||tc.duration>ptc.max)
          {
            ptc.max = tc.duration
          }
          if (ptc.min==null||tc.duration<ptc.min)
          {
            ptc.min =  tc.duration
          }
          first = false
        }
        //step
        for (let ts of tc.steps) {
          /*{
            start: new Date(),
            stop: null,
            duration: 0,
            status: null,
            text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
          } */
          let pts = _.find(ptc.steps, { 'text': ts.text });
          if (pts == undefined)
          {
            pts = {
                avg: 0,
                min: null,
                max: null,
                cnt: 0,
                sum: 0,
                start: ts.start,
                stop: ts.stop,
                sourceLocation: ts.sourceLocation,
                text: ts.text
            }
            ptc.steps.push(pts)
          }
          let cts = _.find(ctc.steps, { 'text': ts.text });
          if (cts == undefined)
          {
            cts = {
                avg: 0,
                min: null,
                max: null,
                cnt: 0,
                sum: 0,
                sourceLocation: ts.sourceLocation,
                text: ts.text
            }
            ctc.steps.push(cts)
          }
          //handle warnings
          if (isStatusWarning(ts.status)|| ts.exception){
            if (ts.exception)
            {
              cts.exception = ts.exception
            }
            cts.status = ts.status
          }

          if ((this.options.strict && gr.success) || !this.options.strict) {
            cts.sum += ts.duration
            cts.cnt++
            if (cts.max==null||ts.duration>cts.max)
            {
              cts.max = ts.duration
            }
            if (cts.min==null||ts.duration<cts.min)
            {
              cts.min =  ts.duration
            }

            pts.sum += ts.duration
            pts.cnt++
            pts.start = (pts.start == null)? ts.start:pts.start 
            pts.stop = ts.stop
            if (pts.max==null||ts.duration>pts.max)
            {
              pts.max = ts.duration
            }
            if (pts.min==null||ts.duration<pts.min)
            {
              pts.min =  ts.duration
            }
          }
        }
      }
    }
    result.avg = (result.sum/result.cnt)
    for (let tc of result.testCases) {
      tc.avg = (tc.sum/tc.cnt)
      for (let ts of tc.steps) {
        ts.avg = (ts.sum/ts.cnt)
      }
    }
    this.calculatedResult.groups.push(result)
  }

  getEnd(start, seconds) {
    let m  =  moment(start)
    m.add(seconds,'s')
    return m.utc().format()
  }

  durationBetween(start, end)
  {
    var ms = moment(end).diff(moment(start));
    return moment.duration(ms);
  }

  getPeriod(time, times) {
		return time.asSeconds() / times;
  }
}