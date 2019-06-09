import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import TestCaseFilter from './test_case_filter'
import Gherkin from 'gherkin'

describe('TestCaseFilter', () => {
    beforeEach(function() {
      const gherkinDocument = new Gherkin.Parser().parse(
        'Feature: my feature\n' +
          '@first @both\n' +
          '  Scenario: my scenario\n' +
          '    Given step1\n' +
          '    When step2\n' +
          '    Then step3\n' +
          '\n' +
          '@second\n' +
          '  Scenario: my scenario two\n' +
          '    Given step1\n' +
          '    When step2\n' +
          '    Then step3\n'
      )
      this.pickles = new Gherkin.Compiler().compile(gherkinDocument)
      
      const gherkinDocument2 = new Gherkin.Parser().parse(
        'Feature: my feature\n' +
          '@first2 @both\n' +
          '  Scenario: my scenario 2\n' +
          '    Given step1\n' +
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

      this.testCases = [{
        sourceLocation: {
          uri: 'a.feature',
          line: 3,
        },
        uri: 'a.feature',
        pickle: this.pickles[0],
        steps: [
          {
            actionLocation: { line: 2, uri: 'steps.js' },
            sourceLocation: { line: 4, uri: 'a.feature' },
          },
          {
            actionLocation: { line: 3, uri: 'steps.js' },
            sourceLocation: { line: 5, uri: 'a.feature' },
          },
          {
            actionLocation: { line: 4, uri: 'steps.js' },
            sourceLocation: { line: 6, uri: 'a.feature' },
          },
        ]
      },{
        sourceLocation: {
          uri: 'a.feature',
          line: 9,
        },
        uri: 'a.feature',
        pickle: this.pickles[1],
        steps: [
          {
            actionLocation: { line: 2, uri: 'steps.js' },
            sourceLocation: { line: 10, uri: 'a.feature' },
          },
          {
            actionLocation: { line: 3, uri: 'steps.js' },
            sourceLocation: { line: 11, uri: 'a.feature' },
          },
          {
            actionLocation: { line: 4, uri: 'steps.js' },
            sourceLocation: { line: 12, uri: 'a.feature' },
          },
        ]
      },{
      sourceLocation: {
        uri: 'b.feature',
        line: 3,
      },
      uri: 'b.feature',
      pickle: this.pickles2[0],
      steps: [
        {
          actionLocation: { line: 2, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'b.feature' },
        },
        {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 5, uri: 'b.feature' },
        },
        {
          actionLocation: { line: 4, uri: 'steps.js' },
          sourceLocation: { line: 6, uri: 'b.feature' },
        },
      ]
    },{
      sourceLocation: {
        uri: 'b.feature',
        line: 9,
      },
      uri: 'b.feature',
      pickle: this.pickles2[1],
      steps: [
        {
          actionLocation: { line: 2, uri: 'steps.js' },
          sourceLocation: { line: 10, uri: 'b.feature' },
        },
        {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 11, uri: 'b.feature' },
        },
        {
          actionLocation: { line: 4, uri: 'steps.js' },
          sourceLocation: { line: 12, uri: 'b.feature' },
        },
      ]
      }
      ]
      this.TCF = new TestCaseFilter(this.testCases)
    })
    describe('feature title', () => {
      beforeEach(function() {
        this.result = this.TCF.filter("a.feature")
      })

        it('correct testCases was selected', function() {
          expect(this.result).to.eql(
            [{
              sourceLocation: {
                uri: 'a.feature',
                line: 3,
              },
              uri: 'a.feature',
              pickle: this.pickles[0],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 4, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 5, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 6, uri: 'a.feature' },
                },
              ]
            },{
              sourceLocation: {
                uri: 'a.feature',
                line: 9,
              },
              uri: 'a.feature',
              pickle: this.pickles[1],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 10, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 11, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 12, uri: 'a.feature' },
                },
              ]
            }]
          )
        })
    })
    describe('with tag in 1 feature', () => {
      beforeEach(function() {
        this.result = this.TCF.filter("@second")
      })

        it('correct testCases was selected', function() {
          expect(this.result).to.eql(
            [
            {
              sourceLocation: {
                uri: 'a.feature',
                line: 9,
              },
              uri: 'a.feature',
              pickle: this.pickles[1],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 10, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 11, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 12, uri: 'a.feature' },
                },
              ] 
              } 
            ]
          )
        })
    })
    describe('with tag in multiple features', () => {
      beforeEach(function() {
        this.result = this.TCF.filter("@both")
      })

        it('correct testCases was selected', function() {
          expect(this.result).to.eql(
            [
            {
              sourceLocation: {
                uri: 'a.feature',
                line: 3,
              },
              uri: 'a.feature',
              pickle: this.pickles[0],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 4, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 5, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 6, uri: 'a.feature' },
                },
              ]
            },
            {
              sourceLocation: {
                uri: 'b.feature',
                line: 3,
              },
              uri: 'b.feature',
              pickle: this.pickles2[0],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 4, uri: 'b.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 5, uri: 'b.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 6, uri: 'b.feature' },
                },
              ]
            }
          ]
          )
        })
    })
    describe('with multiple tags seperated by space', () => {
      beforeEach(function() {
        this.result = this.TCF.filter("@first @second")
      })

        it('correct testCases was selected', function() {
          expect(this.result).to.eql(
            [
            {
              sourceLocation: {
                uri: 'a.feature',
                line: 3,
              },
              uri: 'a.feature',
              pickle: this.pickles[0],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 4, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 5, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 6, uri: 'a.feature' },
                },
              ]
            },
            {
              sourceLocation: {
                uri: 'a.feature',
                line: 9,
              },
              uri: 'a.feature',
              pickle: this.pickles[1],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 10, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 11, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 12, uri: 'a.feature' },
                },
              ]
            }
          ]
          )
        })
    })
    describe('with multiple tags seperated by space', () => {
      beforeEach(function() {
        this.result = this.TCF.filter("@first,@second")
      })

        it('correct testCases was selected', function() {
          expect(this.result).to.eql(
            [
            {
              sourceLocation: {
                uri: 'a.feature',
                line: 3,
              },
              uri: 'a.feature',
              pickle: this.pickles[0],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 4, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 5, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 6, uri: 'a.feature' },
                },
              ]
            },
            {
              sourceLocation: {
                uri: 'a.feature',
                line: 9,
              },
              uri: 'a.feature',
              pickle: this.pickles[1],
              steps: [
                {
                  actionLocation: { line: 2, uri: 'steps.js' },
                  sourceLocation: { line: 10, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 3, uri: 'steps.js' },
                  sourceLocation: { line: 11, uri: 'a.feature' },
                },
                {
                  actionLocation: { line: 4, uri: 'steps.js' },
                  sourceLocation: { line: 12, uri: 'a.feature' },
                },
              ]
            }
          ]
          )
        })
    })
})