import { describe, it } from 'mocha'
import { expect } from 'chai'
import MinionOptionSplitter from './minion_option_splitter'
import getColorFns from '../get_color_fns'

describe('MinionOptionSplitter', () => {
  var cwd = process.cwd()
  var colr = getColorFns(false)
  var options = {
    strict: true,
    colorFns: colr,
    cwd: cwd,
  }

  const examples = [
    {
      description: 'split no options',
      input: 'stddev',
      output: {
        type: 'stddev',
        options: { options: [], colorFns: colr, cwd: cwd, strict: true },
      },
    },
    {
      description: 'splits with options',
      input: 'prctl:90',
      output: {
        type: 'prctl',
        options: { options: ['90'], colorFns: colr, cwd: cwd, strict: true },
      },
    },
    {
      description: 'splits with multiple options',
      input: 'prctl:90,98',
      output: {
        type: 'prctl',
        options: {
          options: ['90', '98'],
          colorFns: colr,
          cwd: cwd,
          strict: true,
        },
      },
    },
  ]

  examples.forEach(({ description, input, output }) => {
    it(description, () => {
      expect(MinionOptionSplitter.split(input, options)).to.eql(output)
    })
  })
})
