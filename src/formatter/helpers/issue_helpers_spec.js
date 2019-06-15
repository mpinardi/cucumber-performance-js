import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import getColorFns from '../get_color_fns'
import { Status } from 'cucumber'
import { formatIssue } from './issue_helpers'
import figures from 'figures'
import Gherkin from 'gherkin'

describe('IssueHelpers', () => {
  beforeEach(function() {
    const gherkinDocument = new Gherkin.Parser().parse(
      'Feature: my feature\n' +
        '  Scenario: my scenario\n' +
        '    Given step1\n' +
        '    When step2\n' +
        '    Then step3\n'
    )
    const pickle = new Gherkin.Compiler().compile(gherkinDocument)[0]

    this.testCase = {
      sourceLocation: {
        uri: 'a.feature',
        line: 2,
      },
      steps: [
        {
          actionLocation: { line: 2, uri: 'steps.js' },
          sourceLocation: { line: 3, uri: 'a.feature' },
          duration: 0,
        },
        {},
        {
          actionLocation: { line: 4, uri: 'steps.js' },
          sourceLocation: { line: 5, uri: 'a.feature' },
          duration: 0,
        },
      ],
    }

    this.options = {
      colorFns: getColorFns(false),
      gherkinDocument,
      number: 1,
      pickle,
      testCase: this.testCase,
    }
    this.passedStepResult = Status.PASSED
    this.skippedStepResult = Status.SKIPPED
  })

  describe('formatIssue', () => {
    describe('returns the formatted scenario', () => {
      beforeEach(function() {
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [{ exception: 'error', status: Status.FAILED, cnt: 1 }],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('prints the scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ${figures.cross} When step2 # steps.js:3\n` +
            '       1) Count: 1\n' +
            '          error\n' +
            '   - Then step3 # steps.js:4\n'
        )
      })
    })

    describe('with multiple failures', () => {
      beforeEach(function() {
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [
            { exception: 'error', status: Status.FAILED, cnt: 1 },
            { exception: 'error2', status: Status.FAILED, cnt: 1 },
          ],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('prints the scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ${figures.cross} When step2 # steps.js:3\n` +
            '       1) Count: 1\n' +
            '          error\n' +
            '       2) Count: 1\n' +
            '          error2\n' +
            '   - Then step3 # steps.js:4\n'
        )
      })
    })

    describe('with an ambiguous step', () => {
      beforeEach(function() {
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [
            {
              exception:
                'Multiple step definitions match:\n' +
                '  pattern1        - steps.js:5\n' +
                '  longer pattern2 - steps.js:6',
              status: Status.AMBIGUOUS,
              cnt: 1,
            },
          ],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('returns the formatted scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ${figures.cross} When step2 # steps.js:3\n` +
            '       1) Count: 1\n' +
            '          Multiple step definitions match:\n' +
            '            pattern1        - steps.js:5\n' +
            '            longer pattern2 - steps.js:6\n' +
            '   - Then step3 # steps.js:4\n'
        )
      })
    })

    describe('with an undefined step', () => {
      beforeEach(function() {
        this.testCase.steps[1] = {
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [{ status: Status.UNDEFINED, cnt: 1 }],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('returns the formatted scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ? When step2\n` +
            '       1) Count: 1\n' +
            '          Undefined. Implement this step.\n' +
            '   - Then step3 # steps.js:4\n'
        )
      })
    })

    describe('with a pending step', () => {
      beforeEach(function() {
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [{ status: Status.PENDING, cnt: 1 }],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('returns the formatted scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ? When step2 # steps.js:3\n` +
            '       1) Count: 1\n' +
            '          Pending\n' +
            '   - Then step3 # steps.js:4\n'
        )
      })
    })

    describe('step with data table', () => {
      beforeEach(function() {
        const gherkinDocument = new Gherkin.Parser().parse(
          'Feature: my feature\n' +
            '  Scenario: my scenario\n' +
            '    Given step1\n' +
            '    When step2\n' +
            '    Then step3\n' +
            '      |aaa|b|c|\n' +
            '      |d|e|ff|\n' +
            '      |gg|h|iii|\n'
        )
        this.options.gherkinDocument = gherkinDocument
        const pickle = new Gherkin.Compiler().compile(gherkinDocument)[0]
        this.options.pickle = pickle
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [{ status: Status.PENDING, cnt: 1 }],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('returns the formatted scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ? When step2 # steps.js:3\n` +
            '       1) Count: 1\n' +
            '          Pending\n' +
            '   - Then step3 # steps.js:4\n' +
            '       | aaa | b | c   |\n' +
            '       | d   | e | ff  |\n' +
            '       | gg  | h | iii |\n'
        )
      })
    })

    describe('step with doc string', () => {
      beforeEach(function() {
        const gherkinDocument = new Gherkin.Parser().parse(
          'Feature: my feature\n' +
            '  Scenario: my scenario\n' +
            '    Given step1\n' +
            '    When step2\n' +
            '    Then step3\n' +
            '       """\n' +
            '       this is a multiline\n' +
            '       doc string\n' +
            '\n' +
            '       :-)\n' +
            '       """'
        )
        this.options.gherkinDocument = gherkinDocument
        const pickle = new Gherkin.Compiler().compile(gherkinDocument)[0]
        this.options.pickle = pickle
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [{ status: Status.PENDING, cnt: 1 }],
        }
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('returns the formatted scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `   ? When step2 # steps.js:3\n` +
            '       1) Count: 1\n' +
            '          Pending\n' +
            '   - Then step3 # steps.js:4\n' +
            '       """\n' +
            '       this is a multiline\n' +
            '       doc string\n' +
            '\n' +
            '       :-)\n' +
            '       """\n'
        )
      })
    })

    describe('step with attachment text', () => {
      beforeEach(function() {
        this.testCase.steps[0].attachments = [
          {
            data: 'Some info.',
            media: {
              type: 'text/plain',
            },
          },
          {
            data: '{"name": "some JSON"}',
            media: {
              type: 'application/json',
            },
          },
          {
            data: Buffer.from([]),
            media: {
              type: 'image/png',
            },
          },
        ]
        this.testCase.steps[1] = {
          actionLocation: { line: 3, uri: 'steps.js' },
          sourceLocation: { line: 4, uri: 'a.feature' },
          issues: [{ exception: 'error', status: Status.FAILED, cnt: 1 }],
        }
        this.testCase.steps[1].attachments = [
          {
            data: 'Other info.',
            media: {
              type: 'text/plain',
            },
          },
        ]
        this.testCase.steps[2].issues = [
          { status: this.skippedStepResult, cnt: 1 },
        ]
        this.formattedIssue = formatIssue(this.options)
      })

      it('prints the scenario', function() {
        expect(this.formattedIssue).to.eql(
          '1) Scenario: my scenario # a.feature:2\n' +
            `   ${figures.tick} Given step1 # steps.js:2\n` +
            `       Attachment (text/plain): Some info.\n` +
            `       Attachment (application/json)\n` +
            `       Attachment (image/png)\n` +
            `   ${figures.cross} When step2 # steps.js:3\n` +
            `       Attachment (text/plain): Other info.\n` +
            '       1) Count: 1\n' +
            '          error\n' +
            '   - Then step3 # steps.js:4\n'
        )
      })
    })
  })
})
