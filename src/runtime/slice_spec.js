import _ from 'lodash'
import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import Slice from './slice'
import Gherkin from 'gherkin'

describe('Slice', () => {
  beforeEach(function() {
    const gherkinDocument = new Gherkin.Parser().parse(
      'Feature: my feature\n' +
        '@first @both\n' +
        '  Scenario: my scenario\n' +
        '    Given replace "value out"\n' +
        '    When do "thing 1"\n' +
        '    Then set double "out"\n' +
        '\n' +
        '@second\n' +
        '  Scenario: my scenario two\n' +
        '    Given do "thing 2"\n' +
        '    When replace "value out"\n' +
        '    Then step3\n'
    )
    this.pickles = new Gherkin.Compiler().compile(gherkinDocument)

    const gherkinDocument2 = new Gherkin.Parser().parse(
      'Feature: my feature\n' +
        '@first2 @both\n' +
        '  Scenario: my scenario 2\n' +
        '    Given set double "out"\n' +
        '    When step2\n' +
        '    Then step3\n' +
        '\n' +
        '@second2\n' +
        '  Scenario: my scenario two 2\n' +
        '    Given step1\n' +
        '    When step2\n' +
        '    Then step3\n'
    )
    this.pickles2 = new Gherkin.Compiler().compile(gherkinDocument2)

    this.testCases = [
      {
        uri: 'a.feature',
        pickle: this.pickles[0],
      },
      {
        uri: 'a.feature',
        pickle: this.pickles[1],
      },
      {
        uri: 'b.feature',
        pickle: this.pickles2[0],
      },
      {
        uri: 'b.feature',
        pickle: this.pickles2[1],
      },
    ]
  })
  describe('replace 1 value', () => {
    beforeEach(function() {
      this.rows = [
        {
          cells: [
            {
              value: 'thing 1',
            },
          ],
        },
        {
          cells: [
            {
              value: 'new thing 1',
            },
          ],
        },
      ]
      this.slice = new Slice(this.rows)
    })

    it('correct step value set', function() {
      let pickle = _.cloneDeep(this.pickles[0])
      pickle.steps[1].text = 'do "new thing 1"'
      this.result = this.slice.parseTestCases(this.testCases)
      expect(this.result).to.eql([
        {
          uri: 'a.feature',
          pickle: pickle,
        },
        {
          uri: 'a.feature',
          pickle: this.pickles[1],
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[0],
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[1],
        },
      ])
    })
  })

  describe('replace 2 value in 1 feature with for 2 orginal values', () => {
    beforeEach(function() {
      this.rows = [
        {
          cells: [
            {
              value: 'thing 1',
            },
            {
              value: 'thing 2',
            },
          ],
        },
        {
          cells: [
            {
              value: 'new thing 1',
            },
            {
              value: 'new thing 2',
            },
          ],
        },
      ]
      this.slice = new Slice(this.rows)
    })

    it('correct step value set', function() {
      let pickle = _.cloneDeep(this.pickles[0])
      pickle.steps[1].text = 'do "new thing 1"'
      let pickle2 = _.cloneDeep(this.pickles[1])
      pickle2.steps[0].text = 'do "new thing 2"'
      this.result = this.slice.parseTestCases(this.testCases)
      expect(this.result).to.eql([
        {
          uri: 'a.feature',
          pickle: pickle,
        },
        {
          uri: 'a.feature',
          pickle: pickle2,
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[0],
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[1],
        },
      ])
    })
  })

  describe('replace 2 value in 1 feature', () => {
    beforeEach(function() {
      this.rows = [
        {
          cells: [
            {
              value: 'value out',
            },
          ],
        },
        {
          cells: [
            {
              value: 'new value out',
            },
          ],
        },
      ]
      this.slice = new Slice(this.rows)
    })

    it('correct step value set', function() {
      let pickle = _.cloneDeep(this.pickles[0])
      pickle.steps[0].text = 'replace "new value out"'

      let pickle2 = _.cloneDeep(this.pickles[1])
      pickle2.steps[1].text = 'replace "new value out"'
      this.result = this.slice.parseTestCases(this.testCases)
      expect(this.result).to.eql([
        {
          uri: 'a.feature',
          pickle: pickle,
        },
        {
          uri: 'a.feature',
          pickle: pickle2,
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[0],
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[1],
        },
      ])
    })
  })

  describe('replace 2 value in multiple features', () => {
    beforeEach(function() {
      this.rows = [
        {
          cells: [
            {
              value: 'out',
            },
          ],
        },
        {
          cells: [
            {
              value: 'new out',
            },
          ],
        },
      ]
      this.slice = new Slice(this.rows)
    })

    it('correct step value set', function() {
      let pickle = _.cloneDeep(this.pickles[0])
      pickle.steps[2].text = 'set double "new out"'

      let pickle2 = _.cloneDeep(this.pickles2[0])
      pickle2.steps[0].text = 'set double "new out"'
      this.result = this.slice.parseTestCases(this.testCases)
      expect(this.result).to.eql([
        {
          uri: 'a.feature',
          pickle: pickle,
        },
        {
          uri: 'a.feature',
          pickle: this.pickles[1],
        },
        {
          uri: 'b.feature',
          pickle: pickle2,
        },
        {
          uri: 'b.feature',
          pickle: this.pickles2[1],
        },
      ])
    })
  })
})
