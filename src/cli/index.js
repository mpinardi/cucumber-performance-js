import {
  formatterHelpers,
  getTestCasesFromFilesystem,
  PickleFilter,
} from 'cucumber'

import { getExpandedArgv, getSimulationsFromFilesystem } from './helpers'
import { validateInstall } from './install_validator'
import * as I18n from './i18n'
import ConfigurationBuilder from './configuration_builder'
import EventEmitter from 'events'
import FormatterBuilder from '../formatter/builder'
import fs from 'mz/fs'
import path from 'path'

import VeggieFilter from '../veggie_filter'
import Promise from 'bluebird'
import Director from '../runtime/cprocess/director'
import { getPathWithPrefix } from '../formatter/helpers/outputpath_helpers'

export default class Cli {
  constructor({ argv, cwd, stdout }) {
    this.argv = argv
    this.cwd = cwd
    this.stdout = stdout
    this.formatters = []
    this.streamsToClose = []
  }

  async getConfiguration() {
    const fullArgv = await getExpandedArgv({ argv: this.argv, cwd: this.cwd })
    return ConfigurationBuilder.build({ argv: fullArgv, cwd: this.cwd })
  }

  async updateFormatters({ count }) {
    await Promise.map(this.formatters, async ({ formatter, outputTo }) => {
      if (typeof formatter.isStdio === 'function' && !formatter.isStdio()) {
        const fd = await fs.open(
          path.resolve(this.cwd, getPathWithPrefix({ outputTo, count })),
          'w'
        )
        // fs.createWriteStream
        const stream = fs.createWriteStream(null, { fd })
        formatter.updateLog(stream)
        this.streamsToClose.push(stream)
      }
    })
  }

  async initializeFormatters({
    eventBroadcaster,
    formatOptions,
    formats,
    strict,
  }) {
    const eventDataCollector = new formatterHelpers.EventDataCollector(
      eventBroadcaster
    )
    this.formatters = await Promise.map(
      formats,
      async ({ type, outputTo, options }) => {
        let stream = this.stdout
        if (outputTo) {
          const fd = await fs.open(
            path.resolve(this.cwd, getPathWithPrefix({ outputTo, count: 0 })),
            'w'
          )
          stream = fs.createWriteStream(null, { fd })
          this.streamsToClose.push(stream)
        }
        const typeOptions = {
          eventBroadcaster,
          eventDataCollector,
          log: ::stream.write,
          stream,
          strict,
          ...formatOptions,
          options,
        }
        if (!formatOptions.hasOwnProperty('colorsEnabled')) {
          typeOptions.colorsEnabled = !!stream.isTTY
        }
        return {
          formatter: FormatterBuilder.build(type, typeOptions),
          outputTo: outputTo,
        }
      }
    )
  }

  async cleanup() {
    let p = Promise.each(this.streamsToClose, stream =>
      Promise.promisify(::stream.end)()
    )
    this.streamsToClose = []
    return p
  }

  async run() {
    await validateInstall(this.cwd)
    const configuration = await this.getConfiguration()
    if (configuration.listI18nLanguages) {
      this.stdout.write(I18n.getLanguages())
      return { success: true }
    }
    if (configuration.listI18nKeywordsFor) {
      this.stdout.write(I18n.getKeywords(configuration.listI18nKeywordsFor))
      return { success: true }
    }
    const eventBroadcaster = new EventEmitter()
    await this.initializeFormatters({
      eventBroadcaster,
      formatOptions: configuration.perfFormatOptions,
      formats: configuration.perfFormats,
      strict: configuration.perfRuntimeOptions.strict,
    })
    const testCases = await getTestCasesFromFilesystem({
      cwd: this.cwd,
      eventBroadcaster,
      featureDefaultLanguage: configuration.featureDefaultLanguage,
      featurePaths: configuration.featurePaths,
      order: configuration.order,
      pickleFilter: new PickleFilter(configuration.pickleFilterOptions),
    })
    const simulations = await getSimulationsFromFilesystem({
      cwd: this.cwd,
      eventBroadcaster,
      planDefaultLanguage: configuration.planDefaultLanguage,
      planPaths: configuration.planPaths,
      order: configuration.order,
      veggieFilter: new VeggieFilter(configuration.veggieFilterOptions),
    })
    let results = []
    eventBroadcaster.emit('perf-run-started')

    if (testCases.length > 0) {
      let count = 1
      if (simulations.length > 0) {
        for (let simulation of simulations) {
          if (count > 1) {
            await this.updateFormatters({ count })
          }
          let director = new Director({
            eventBroadcaster,
            options: configuration.runtimeOptions,
            supportCodePaths: configuration.supportCodePaths,
            supportCodeRequiredModules:
              configuration.supportCodeRequiredModules,
            testCases: testCases,
          })
          await new Promise(resolve => {
            director.run(simulation, r => {
              results.push(r)
              resolve()
            })
          })
          count++
          await this.cleanup()
        }
      } else {
        this.stdout.write(
          'No plans found. Please specify plan location: -p <GLOB|DIR|FILE> or --plans <GLOB|DIR|FILE>'
        )
      }
    } else {
      this.stdout.write(
        'No features found. Please specify feature location: <GLOB|DIR|FILE> or --require <GLOB|DIR|FILE>'
      )
    }
    eventBroadcaster.emit('perf-run-finished')
    await this.cleanup()
    let success = true
    for (let result of results) {
      if (!result.success) {
        success = false
      }
    }
    return {
      shouldExitImmediately: configuration.shouldExitImmediately,
      success,
    }
  }
}
