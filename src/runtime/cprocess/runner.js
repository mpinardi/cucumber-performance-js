import _ from 'lodash'
import commandTypes from '../command_types'
import EventEmitter from 'events'
import serializeError from 'serialize-error'
import StackTraceFilter from '../stack_trace_filter'
import moment from 'moment'
import { Runtime,supportCodeLibraryBuilder} from 'cucumber'

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

function replacerSerializeErrors(key, value) {
  if (_.isError(value)) {
    return serializeError(value)
  }
  return value
}

function formatLocation(obj) {
  return `${obj.uri}:${obj.line}`
}

function serializeResultExceptionIfNecessary(data) {
    if (
      data.result &&
      data.result.exception &&
      _.isError(data.result.exception)
    ) {
      data.result.exception = serializeError(data.result.exception)
    }
}

export default class Runner {
  constructor({ cwd, exit, sendMessage }) {
    this.initialized = false
    this.cwd = cwd
    this.exit = exit
    this.sendMessage = sendMessage
    this.eventBroadcaster = new EventEmitter()
    this.stackTraceFilter = new StackTraceFilter()
    this.options
    this.result = null
    this.testCases = null
    this.curTestCase = 0
    this.curStep = 0
    EVENTS.forEach(name => {
      this.eventBroadcaster.on(name, data => {
        if (data != undefined)
        {
          this.processMessage(name,data)
        }
        else {
          if (name === 'test-run-started') {
            this.result.start = moment.utc().format()
          }
          this.sendMessage({ command: commandTypes.EVENT, name})
        }
      })
    })
  }

  async initialize({
    options,
    supportCodeRequiredModules,
    supportCodePaths,
  }) {
    supportCodeRequiredModules.map(module => require(module))
    supportCodeLibraryBuilder.reset(this.cwd)
    supportCodePaths.forEach(codePath => require(codePath))
    this.supportCodeLibrary = supportCodeLibraryBuilder.finalize()
    this.worldParameters = options.worldParameters
    this.filterStacktraces = options.filterStacktraces
    this.options = options
    if (this.filterStacktraces) {
      this.stackTraceFilter.filter()
    }
   this.sendMessage({ command: commandTypes.READY })
  }

  async finalize() {
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

  processMessage(name,data) {
    serializeResultExceptionIfNecessary(data)
    if (name === 'test-case-started') {
      this.result.testCases.push(
      {
        steps: [],
        start: moment.utc().format(),
        stop: null,
        duration: 0,
        name: this.testCases[this.curTestCase].pickle.name,
        status: null,
        sourceLocation: null
      })
    }
    else if (name === 'test-case-finished') {
      this.curTestCase++
      this.curStep=0
      let i = this.result.testCases.length-1
      this.result.testCases[i].stop = moment.utc().format()
      this.result.testCases[i].duration = data.result.duration
      this.result.testCases[i].status = data.result.status
      this.result.testCases[i].sourceLocation = data.sourceLocation
      if (data.result.exception) {
        this.result.testCases[i].exception = data.result.exception
      }
    }
    else if (name === 'test-step-started') {
      let i = this.result.testCases.length-1
      this.result.testCases[i].steps.push(
        { 
        start: moment.utc().format(),
        stop: null,
        duration: 0,
        status: null,
        text: this.testCases[this.curTestCase].pickle.steps[this.curStep].text,
        sourceLocation: {line: _.last(this.testCases[this.curTestCase].pickle.steps[this.curStep].locations).line,uri:null}
        })
    }
    else if (name === 'test-step-finished') {
      this.curStep++
      let i = this.result.testCases.length-1
      let n = this.result.testCases[i].steps.length-1
      this.result.testCases[i].steps[n].stop = moment.utc().format()
      this.result.testCases[i].steps[n].duration = data.result.duration
      this.result.testCases[i].steps[n].status = data.result.status
      this.result.testCases[i].steps[n].sourceLocation.uri = data.testCase.sourceLocation.uri
      //this.result.testCases[i].steps[n].sourceLocation = data.testCase.sourceLocation
      if (data.result.exception) {
       this.result.testCases[i].steps[n].exception = data.result.exception
      }
    }
    else if (name === 'test-run-finished') {
      this.curTestCase=0
      this.curStep=0
      this.result.stop = moment.utc().format()
      this.result.duration = data.result.duration //this.result.stop - this.result.start
      this.result.success = data.result.success
      data = this.result
      this.sendMessage({ command: commandTypes.EVENT, name, data})
    }
    else {
    this.sendMessage({ command: commandTypes.EVENT, name, data })
    }
  }

  async runTestCases({ testCases}) {
    this.result ={
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
    var success = await runtime.start()
    this.sendMessage({ command: commandTypes.READY })
  }

}