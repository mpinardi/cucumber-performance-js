import _ from 'lodash'
import { Command } from 'commander'
import { version } from '../../package.json'
import path from 'path'
import Salad from '../salad'
export default class ArgvParser {
  static collect(val, memo) {
    memo.push(val)
    return memo
  }

  static mergeJson(option) {
    return function(str, memo) {
      let val
      try {
        val = JSON.parse(str)
      } catch (error) {
        throw new Error(
          `${option} passed invalid JSON: ${error.message}: ${str}`
        )
      }
      if (!_.isPlainObject(val)) {
        throw new Error(`${option} must be passed JSON of an object: ${str}`)
      }
      return _.merge(memo, val)
    }
  }

  static mergeTags(val, memo) {
    return memo === '' ? `(${val})` : `${memo} and (${val})`
  }

  static validateLanguage(val) {
    if (!_.includes(_.keys(Salad.Dialects), val)) {
      throw new Error(`Unsupported ISO 639-1: ${val}`)
    }
    return val
  }

  static parse(argv) {
    const program = new Command(path.basename(argv[1]))

    program
      .usage('-p <GLOB|DIR|FILE[:LINE]> [options] [<GLOB|DIR|FILE[:LINE]>...]')
      .version(version, '-v, --version')
      .option('-b, --backtrace', 'show full backtrace for errors')
      .option('-d, --dry-run', 'invoke formatters without executing steps')
      .option(
        '--exit',
        'force shutdown of the event loop when the test run has finished: cucumber will call process.exit'
      )
      .option('--fail-fast', 'abort the run on first failure')
      .option('--perf-dry-run', 'invoke formatters without executing steps')
      .option(
        '--no-strict-stats',
        'enable including failed results in statistics'
      )
      .option(
        '--plan-tags <EXPRESSION>',
        'only include simulations with tags matching the expression (repeatable)',
        ArgvParser.mergeTags,
        ''
      )
      .option(
        '--perf-name <REGEXP>',
        'only execute the simulations with name matching the expression (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '--perf-profile <NAME>',
        'specify the profile to use (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '-p, --plans <GLOB|DIR|FILE[:LINE]>',
        'Plan path',
        ArgvParser.collect,
        []
      )
      .option(
        '-f, --perf-format <TYPE[:PATH]>',
        'specify the output format, optionally supply PATH to redirect formatter output (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '--perf-format-options <JSON>',
        'provide options for formatters (repeatable)',
        ArgvParser.mergeJson('--perf-format-options'),
        {}
      )
      .option(
        '--i18n-keywords <ISO 639-1>',
        'list language keywords',
        ArgvParser.validateLanguage,
        ''
      )
      .option('--i18n-languages', 'list languages')
      .option(
        '--language <ISO 639-1>',
        'provide the default language for feature files',
        ''
      )
      .option(
        '--format <TYPE[:PATH]>',
        'Cucumber formatter specify the output format, optionally supply PATH to redirect formatter output (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '--format-options <JSON>',
        'provide options for formatters (repeatable)',
        ArgvParser.mergeJson('--format-options'),
        {}
      )
      .option(
        '--i18n-keywords <ISO 639-1>',
        'list language keywords',
        ArgvParser.validateLanguage,
        ''
      )
      .option('--i18n-languages', 'list languages')
      .option(
        '--language <ISO 639-1>',
        'provide the default language for feature files',
        ''
      )
      .option(
        '--name <REGEXP>',
        'only execute the scenarios with name matching the expression (repeatable)',
        ArgvParser.collect,
        []
      )
      .option('--no-strict', 'succeed even if there are pending steps')
      .option(
        '--order <TYPE[:SEED]>',
        'run scenarios in the specified order. Type should be `defined` or `random`',
        'defined'
      )
      .option(
        '--profile <NAME>',
        'specify the profile to use (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '-r, --require <GLOB|DIR|FILE>',
        'require files before executing features (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '--require-module <NODE_MODULE>',
        'require node modules before requiring files (repeatable)',
        ArgvParser.collect,
        []
      )
      .option(
        '-t, --tags <EXPRESSION>',
        'only execute the features or scenarios with tags matching the expression (repeatable)',
        ArgvParser.mergeTags,
        ''
      )
      .option(
        '--world-parameters <JSON>',
        'provide parameters that will be passed to the world constructor (repeatable)',
        ArgvParser.mergeJson('--world-parameters'),
        {}
      )
    program.on('--help', () => {
      /* eslint-disable no-console */
      console.log(
        '  For more details please visit https://github.com/mpinardi/cucumber-performance-js/wiki/Runtime-Options\n'
      )
      /* eslint-enable no-console */
    })

    program.parse(argv)

    return {
      options: program.opts(),
      args: program.args,
    }
  }
}
