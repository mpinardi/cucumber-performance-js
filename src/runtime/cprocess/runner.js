import _ from 'lodash'
import commandTypes from '../command_types'
import EventEmitter from 'events'
import serializeError from 'serialize-error'
import StackTraceFilter from '../stack_trace_filter'
import moment from 'moment'
import { Runtime, supportCodeLibraryBuilder } from 'cucumber'

const EVENTS = [
  'test-run-started',
  'test-case-prepared',
  'test-case-started',
  'test-step-started',
  'test-step-attachment',
  'test-step-finished',
  'test-case-finished',
  'test-run-finished',
]

function serializeResultExceptionIfNecessary(data) {
  if (
    data.result &&
    data.result.exception &&
    _.isError(data.result.exception)
  ) {
    data.result.exception = serializeError(data.result.exception)
  }
}

function getRandomInt(mean) {
  let min = Math.ceil(mean / 2)
  let max = Math.floor(mean + mean / 2)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomWait(mean) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, getRandomInt(mean))
  })
}

export default class Runner {
  constructor({ cwd, exit, sendMessage }) {
    this.initialized = false
    this.cwd = cwd
    this.exit = exit
    this.sendMessage = sendMessage
    this.eventBroadcaster = new EventEmitter()
    this.stackTraceFilter = new StackTraceFilter()
    this.result = null
    this.testCases = null
    this.randomWait = 0
    this.locations = []
    EVENTS.forEach(name => {
      this.eventBroadcaster.on(name, data => {
        if (data !== undefined) {
          this.processMessage(name, data)
        } else {
          if (name === 'test-run-started') {
            this.result.start = moment.utc().format()
          }
          this.sendMessage({ command: commandTypes.EVENT, name })
        }
      })
    })
  }

  initialize({
    options,
    supportCodeRequiredModules,
    supportCodePaths,
    randomWait,
  }) {
    supportCodeRequiredModules.map(module => require(module))
    supportCodeLibraryBuilder.reset(this.cwd)
    supportCodePaths.forEach(codePath => require(codePath))
    this.supportCodeLibrary = supportCodeLibraryBuilder.finalize()
    this.worldParameters = options.worldParameters
    this.filterStacktraces = options.filterStacktraces
    this.options = options
    this.randomWait = randomWait
    if (this.filterStacktraces) {
      this.stackTraceFilter.filter()
    }
    this.sendMessage({ command: commandTypes.READY })
  }

  finalize() {
    if (this.filterStacktraces) {
      this.stackTraceFilter.unfilter()
    }
    this.exit()
  }

  receiveMessage(message) {
    if (message.command === 'initialize') {
      this.initialize(message)
    } else if (message.command === 'finalize') {
      this.finalize()
    } else if (message.command === 'run') {
      this.runTestCases(message)
    }
  }

  processMessage(name, data) {
    serializeResultExceptionIfNecessary(data)
    if (name === 'test-case-prepared') {
      this.result.testCases.push({
        steps: [],
        start: moment.utc().format(),
        stop: null,
        duration: 0,
        name: this.testCases[this.result.testCases.length].pickle.name,
        status: null,
        sourceLocation: null,
        id: 0,
      })
      if (this.locations.length < this.result.testCases.length) {
        let tcl = []
        for (let step of data.steps) {
          tcl.push(step)
        }
        this.locations.push(tcl)
      }
    } else if (name === 'test-case-finished') {
      let i = this.result.testCases.length - 1
      this.result.testCases[i].stop = moment.utc().format()
      this.result.testCases[i].duration = data.result.duration
      this.result.testCases[i].status = data.result.status
      this.result.testCases[i].sourceLocation = data.sourceLocation
      if (data.result.exception) {
        this.result.testCases[i].exception = data.result.exception
      }
    } else if (name === 'test-step-started') {
      let i = this.result.testCases.length - 1
      let n = this.result.testCases[i].steps.length
      let text =  this.locations[i][n].hasOwnProperty("sourceLocation")? "cucumber hook (Before/After)" : this.testCases[i].pickle.steps[n].text;
      this.result.testCases[i].steps.push({
        start: _moment.default.utc().format(),
        stop: null,
        duration: 0,
        status: null,
        text: text,
        sourceLocation: this.locations[i][n].sourceLocation,
        actionLocation: this.locations[i][n].actionLocation 
        // {line: _.last(this.testCases[this.curTestCase].pickle.steps[this.curStep].locations).line,uri:null}
      });
    } else if (name === 'test-step-finished') {
      this.curStep++
      let i = this.result.testCases.length - 1
      let n = this.result.testCases[i].steps.length - 1
      this.result.testCases[i].steps[n].stop = moment.utc().format()
      this.result.testCases[i].steps[n].duration = data.result.duration
      this.result.testCases[i].steps[n].status = data.result.status
      if (data.result.exception) {
        this.result.testCases[i].steps[n].exception = data.result.exception
      }
    } else if (name === 'test-run-finished') {
      this.curTestCase = 0
      this.curStep = 0
      this.result.stop = moment.utc().format()
      this.result.duration = data.result.duration // this.result.stop - this.result.start
      this.result.success = data.result.success
      data = this.result
      this.sendMessage({ command: commandTypes.EVENT, name, data })
    }
  }

  async runTestCases({ testCases }) {
    this.result = {
      testCases: [],
      start: null,
      stop: null,
      duration: 0,
      success: null,
    }
    this.testCases = testCases
    const runtime = new Runtime({
      eventBroadcaster: this.eventBroadcaster,
      options: this.options,
      supportCodeLibrary: this.supportCodeLibrary,
      testCases,
    })
    await randomWait(this.randomWait)
    await runtime.start()
    this.sendMessage({ command: commandTypes.READY })
  }
}
