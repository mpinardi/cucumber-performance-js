import { describe, it } from 'mocha'
import { expect } from 'chai'
import OptionSplitter from './option_splitter'

describe('OptionSplitter', () => {
  const examples = [
    {
      description: "doesn't split when nothing to split on",
      input: '../custom/formatter',
      output: { type: '../custom/formatter', outputTo: '', options: [] },
    },
    {
      description: 'splits relative unix paths',
      input: '../custom/formatter:../formatter/output.txt',
      output: {
        type: '../custom/formatter',
        outputTo: '../formatter/output.txt',
        options: [],
      },
    },
    {
      description: 'splits absolute unix paths',
      input: '/custom/formatter:/formatter/output.txt',
      output: {
        type: '/custom/formatter',
        outputTo: '/formatter/output.txt',
        options: [],
      },
    },
    {
      description: 'splits absolute windows paths',
      input: 'C:\\custom\\formatter:C:\\formatter\\output.txt',
      output: {
        type: 'C:\\custom\\formatter',
        outputTo: 'C:\\formatter\\output.txt',
        options: [],
      },
    },
    {
      description: 'does not split a single absolute windows paths',
      input: 'C:\\custom\\formatter',
      output: { type: 'C:\\custom\\formatter', outputTo: '', options: [] },
    },
    {
      description: 'splits absolute windows paths',
      input: 'C:\\custom\\formatter:C:\\formatter\\output.txt:1,2',
      output: {
        type: 'C:\\custom\\formatter',
        outputTo: 'C:\\formatter\\output.txt',
        options: ['1', '2'],
      },
    },
    {
      description: 'splits relative unix paths with options',
      input: '../custom/formatter:../formatter/output.txt:1,2',
      output: {
        type: '../custom/formatter',
        outputTo: '../formatter/output.txt',
        options: ['1', '2'],
      },
    },
    {
      description: 'splits absolute unix paths with options',
      input: '/custom/formatter:/formatter/output.txt:1,2',
      output: {
        type: '/custom/formatter',
        outputTo: '/formatter/output.txt',
        options: ['1', '2'],
      },
    },
  ]

  examples.forEach(({ description, input, output }) => {
    it(description, () => {
      expect(OptionSplitter.split(input)).to.eql(output)
    })
  })
})
