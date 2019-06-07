import _ from 'lodash'
import moment from 'moment'
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
                  min: null,
                  max: null,
                  cnt: 0,
                  sum: 0,
                  sourceLocation: ts.sourceLocation,
                  actionLocation: ts.actionLocation,
                  text: ts.text,
                  status: ts.status
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
                    sourceLcation {line: 0,uri: null}
                    duration: 0,
                    status: null,
                    text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text
                    exception:[{}],
                  }
                ],
                start: new Date(),
                stop: null,
                duration: 0,
                sourceLcation {line: 0,uri: null}
                name: this.testCases[this.curTestCase].pickle.name,
                status: null,
                exception:{message:'message',status:''},
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
              start: ts.start,
              stop: ts.stop,
              avg: ts.sum/ts.cnt,
              min: ts.min,
              max: ts.max,
              cnt: ts.cnt,
              sum: ts.sum,
              text: ts.text,
              sourceLocation: ts.sourceLocation,
              actionLocation: ts.actionLocation
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
        if (tc.exception ||isStatusWarning(tc.status)){
          result.hasIssues=true
          ctc.hasIssues=true
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
                actionLocation: ts.actionLocation,
                text: ts.text,
                status: ts.status

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
                actionLocation: ts.actionLocation,
                text: ts.text
            }
            ctc.steps.push(cts)
          }
          //handle issues
        /*   issues: [
            { cnt: 0,
              status: Status.FAILED,
              exception: {}
            }
          ] */
          if (isStatusFailure(ts.status) ||isStatusWarning(ts.status))
          {
            if (!cts.issues){
              let issue = ts.exception?{ cnt: 1, status: ts.status, exception: ts.exception}:{ cnt: 1, status: ts.status}
              cts.issues = [issue]
            }
            else if (ts.exception) {
                let ex = _.find(cts.issues, function(o) { return o.exception.message ===ts.exception.message;})
                if (ex)
                {
                  ex.cnt++
                } else
                {
                  cts.issues.push({exception: ts.exception,cnt: 1,status:ts.status})
                }
            }
            else
            {
              let wrn = _.find(cts.issues, { 'status': ts.status })
              if (wrn)
              {
                wrn.cnt++
              } else
              {
                cts.issues.push({exception: ts.exception,cnt: 1,status:ts.status})
              }
            }
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