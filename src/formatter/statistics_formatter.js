import Formatter from '.'
import PluginBuilder from './builder'
import { generateDefaultStatistics } from './statistics'
import MinionOptionSplitter from './helpers/minion_option_splitter'

export var CONFIG_ADDPLUGIN = 'addPlugin'

export default class StatisticsFormatter extends Formatter {
  constructor(options) {
    super(options)
    this.pluginMinions = []
    for (let option of this.options) {
      let m = MinionOptionSplitter.split(option, options)
      if (PluginBuilder.isMinion(m.type)) this.pluginMinions.push(m)
    }
    this.calculatedResult = {
      start: null,
      stop: null,
      duration: 0,
      name: null,
      groups: [],
    }
    /* {
      start: null,
      stop: null,
      stats: {
        avg: 0,
        min: 0,
        max: 0,
        cnt: 0,
        sum: 0,
      }
      uri: null,
      testCases: [
        {
                steps: [
                  {
                   stats: {
                    avg: 0,
                    min: 0,
                    max: 0,
                    cnt: 0,
                    sum: 0,
                  }           
                  location: ts.sourceLocation,
                  actionLocation: ts.actionLocation,
                  text: ts.text,
                  status: ts.status,
                  durations: []
                  }
                ],
                line: 0,
                name: this.testCases[this.curTestCase].pickle.name,
                stats: {
                    avg: 0,
                    min: 0,
                    max: 0,
                    cnt: 0,
                    sum: 0,
                }   
                durations: []
        }
      durations: []
    } */
    this.eventBroadcaster.on(
      'simulation-run-finished',
      ::this.generateStatistics
    )
    this.eventBroadcaster.on('config-statistics', ::this.config)
  }

  generateStatistics({ data }) {
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
                pickleId: 0,
                sourceLpcation {line: 0,uri: null}
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
    this.eventBroadcaster.emit('simulation-statistics-started')
    this.calculatedResult = generateDefaultStatistics(
      data,
      this.strict,
      null,
      null
    )
    this.runMinions()
    this.eventBroadcaster.emit(
      'simulation-statistics-finished',
      this.calculatedResult
    )
  }

  config(setting, value) {
    if (setting === this.CONFIG_ADDPLUGIN) {
      let m = MinionOptionSplitter.split(value, {
        strict: this.strict,
        colorFns: this.colorFns,
        cwd: this.cwd,
      })
      if (PluginBuilder.isMinion(m.type)) this.pluginMinions.push(m)
    }
  }

  runMinions() {
    for (let plugin of this.pluginMinions) {
      let sc = PluginBuilder.build(plugin.type, plugin.options)
      let result = sc.run(this.calculatedResult)
      this.calculatedResult = result != null ? result : this.calculatedResult
    }
  }
}
