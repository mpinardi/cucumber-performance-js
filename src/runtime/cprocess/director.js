import _ from 'lodash'
import commandTypes from '../command_types'
import path from 'path'
import Status from 'cucumber'
import crossSpawn from 'cross-spawn'
import moment from 'moment'

const cukeCommand = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'bin',
  'run_cuke_runner'
)
const maxRampPeriods = 10

export default class Director {
  // options - {dryRun, failFast, filterStacktraces, strict}
  constructor({
    eventBroadcaster,
    options,
    supportCodePaths,
    supportCodeRequiredModules,
    testCases
  }) {
    this.eventBroadcaster = eventBroadcaster
    this.options = options || {}
    this.supportCodePaths = supportCodePaths
    this.supportCodeRequiredModules = supportCodeRequiredModules
    this.simulation
    this.groups = []
    this.testCases = testCases
    this.result = {
      start: null,
      stop: null,
      duration: 0,
      groups: [],
      name: null,
      success: true,
    }
    this.runners = []
    this.maxRunners = 0
    this.maxRan = 0
    this.running = 0
    this.ran = 0
    this.endRamp = null
    this.rampDown = null
    this.rampUp=null
    this.curPercent = 100
    this.executing = false
    this.beginEnd = null
    this.simulation = null
    this.scheduledRuntime = null
    this.ramper = null
  }

  parseRunnerMessage(runner, message) {
    switch (message.command) {
      case commandTypes.READY:
          this.manageRunner(runner)
        break
      case commandTypes.EVENT:
        this.eventBroadcaster.emit(message.name, message.data)
        if (message.name === 'test-run-finished') {
          this.groups[runner.groupId].ran++
          this.groups[runner.groupId].running--
          if (this.result.groups[runner.groupId].start == null)
          {
            this.result.groups[runner.groupId].start = moment.utc().format()
          }
          this.ran += 1
          this.result.groups[runner.groupId].results.push(message.data)
          const group = this.groups[runner.groupId]
          const eventData = { ...message.data, group}
          this.eventBroadcaster.emit('cuke-run-finished', { data: eventData })
          this.manageRun()
        } else if (message.name === 'test-run-started'){     
          const group = this.groups[runner.groupId]
          const eventData = { group}
          this.eventBroadcaster.emit('cuke-run-started', { data: eventData })
        }

        break
      default:
        throw new Error(`Unexpected message from runner: ${message}`)
    }
  }

  startRunner(id) {
    //const runnerProcess = crossSpawn(cukeCommand, [], {
    //childProcess.fork(
   // this.running++
    
    const runnerProcess = crossSpawn(this.hasManagedGroups?groupCommand:cukeCommand, [], {
      env: _.assign({}, process.env, {
      }),

      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
      //execArgv: ['--inspect-brk='+(29110+id)],
    })
    
    const runner = { process: runnerProcess, groupId: -1, id: id }
    this.runners[id] =  runner
    
    runner.process.on('message', message => {
      this.parseRunnerMessage(runner, message)
    })
    runner.process.on('close', () => {
      runner.closed = true
      this.onRunnerClose()
    })
      runner.process.send({
        command: commandTypes.INITIALIZE,
        options: this.options,
        supportCodePaths: this.supportCodePaths,
        supportCodeRequiredModules: this.supportCodeRequiredModules,
      })
  }

  onRunnerClose() {
    if (_.every(this.runners, 'closed')) {
      this.result.stop = moment.utc().format()
      this.result.ran = this.ran
      this.result.duration = this.durationBetween(this.result.start,this.result.end)
      this.eventBroadcaster.emit('simulation-run-finished', { data: this.result })
      this.executing=false
      this.onFinish(this.result)
    }
  }


  run(simulation, done) {
    this.eventBroadcaster.emit('simulation-run-started')
    this.result.start = moment.utc().format()
    this.result.name = simulation.veggie.name
    this.simulation = simulation
    this.scheduledRuntime = simulation.veggie.time == undefined ? null: simulation.veggie.time.text
    this.rampUp = simulation.veggie.rampUp== undefined ? null: simulation.veggie.rampUp.text
    this.rampDown = simulation.veggie.rampDown== undefined ? null: simulation.veggie.rampDown.text
    for (let group of simulation.veggie.groups){
      this.maxRunners += parseInt(group.runners)
      this.maxRan += parseInt(group.count)
      this.groups.push({count: parseInt(group.count),
                        runners: parseInt(group.runners),
                        maxRunners: parseInt(group.runners),
                        ran: 0,
                        running: 0,
                        text: group.text,
                        processId: -1
      })
      this.result.groups.push({
        start: null,
        stop: null,
        duration: 0,
        results: [],
        text: group.text
      })
    }
    this.executing=true;
    let curTime = new Date()
    if (this.scheduledRuntime != null) {
      this.beginEnd = this.getEnd(curTime, this.scheduledRuntime);
    }
    if (this.rampUp != null) {
      this.curPercent=0
      this.endRamp = this.getEnd(curTime, this.rampUp);
      let rampPeriod = (this.getRampPeriod(this.durationBetween(curTime, this.endRamp), maxRampPeriods)*1000);
      this.setCurGroupThreads(0);
      this.ramper = setInterval(this.ramp.bind(this), rampPeriod);
    }
    this.manageRun()
    this.onFinish = done
  }

  async manageRun() {
    let curTime = new Date()
    if (this.executing)
    {
      if (this.endRamp == null) {
        // check if time is up
        if ((this.beginEnd != null && new Date()>this.beginEnd)
        || (this.ran >= this.maxRan && this.beginEnd == null)) {
            if (this.rampDown == null) {
               this.executing = false;
                return;
            }else {
                this.endRamp = this.getEnd(curTime, this.rampDown);
                let rampPeriod = (this.getRampPeriod(this.durationBetween(curTime, this.endRamp), maxRampPeriods)*1000);
                this.ramper = setInterval(this.ramp.bind(this), rampPeriod);
            }
        }
      }
        //are all runners running
        if (this.running < this.maxRunners && (this.scheduledRuntime != null || this.hasGroupsToRun()))
        {
            for (var i = this.running; i < this.maxRunners; i++) {
              this.running++
              this.startRunner(i)
            }
        }
    }
    //console.log("running:"+this.running + " max:" + this.maxRunners)
  }
  
  async ramp()
  {
    let curTime = new Date()
    if (this.endRamp != null) {
      if (curTime > this.endRamp) {
        this.endRamp = null;
        if (this.rampUp == null) {
          this.rampDown = null;
          this.executing = false;
          this.curPercent = 0;
        } else {
          this.rampUp = null;
          this.curPercent = 100;
        }
        clearInterval(this.ramper)
        this.setCurGroupThreads(this.curPercent);
      } else  {
        if (this.rampUp == null)
        {
          this.curPercent = this.curPercent - (100 / maxRampPeriods);
        }
        else
        {
          this.curPercent = this.curPercent + (100 / maxRampPeriods);
        }
        this.setCurGroupThreads(this.curPercent);
      }
      this.manageRun()
    }
  }

  manageRunner(runner) {
    if  (this.running > this.maxRunners)
    {
      runner.process.send({ command: commandTypes.FINALIZE })
      this.running--
      return
    }

    let loc = Math.floor(Math.random() * 99999999) + 1;
    for (let l = 0;  l < this.groups.length; l++) {
      let testCases = []
        let gId =  (loc + l) % this.groups.length;
        let pg = this.groups[gId];
        if (pg.running < pg.runners && (this.scheduledRuntime != null ||pg.ran < pg.count)) {
          pg.running++
          for (let testCase of this.testCases)
          {
            if (testCase.uri.endsWith(pg.text))
            {
              testCases.push(testCase);
            }
          }
          //const skip =
          //this.options.dryRun || (this.options.failFast && !this.result.success)
          runner.groupId = gId
          runner.process.send({ command: commandTypes.RUN,testCases})
          return
        }
    }
    runner.process.send({ command: commandTypes.FINALIZE })
    this.running--
  }

   getEnd(start, time) {
     let m  =  moment(start);
     m.add(moment.duration(time))
     return m.toDate()
	}

  shouldCauseFailure(status) {
    return (
      _.includes([Status.AMBIGUOUS, Status.FAILED, Status.UNDEFINED], status) ||
      (status === Status.PENDING && this.options.strict)
    )
  }

  hasGroupsToRun()
  {
    for (let group of this.groups) {
      if (group.ran<group.count)
      {
        return true
      }
    }
    return false
  }

  setCurGroupThreads(percent) {
		let per = 1;
		if (percent < 100) {
			if (percent > 0) {
				per = ( percent / 100);
			} else {
				per = 0;
			}
    }
    let ms = 0
		for (let group of this.groups) {
      group.runners = Math.round(group.maxRunners * per);
      ms = ms + group.runners
    }
    this.maxRunners = ms
	}

	getRampPeriod(time, times) {
		return time.asSeconds()/ times;
  }
  
  durationBetween(start, end)
  {
    var ms = moment(end).diff(moment(start));
    return moment.duration(ms);
    //var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  }
}