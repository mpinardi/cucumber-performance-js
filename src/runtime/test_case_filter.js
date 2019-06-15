import _ from 'lodash'
const TAG_PATTERN = '@(.*)(?=[ ,])|@.*(?=[@])|@.*'

export default class TestCaseFilter {
  constructor(testCases) {
    this.testCases = testCases
  }

  filter(text) {
    let testCases = []
    for (let testCase of this.testCases) {
      if (this.isMatch({ testCase, text })) testCases.push(testCase)
    }
    return testCases
  }

  isMatch({ testCase, text }) {
    if (_.startsWith(text, '@')) {
      let match = text.match(TAG_PATTERN)
      let matches = []
      while (match !== null) {
        for (let m of match) {
          if (_.startsWith(m, '@')) {
            matches.push(m + '')
            text = text.substring((m + '').length)
            match = text.match(TAG_PATTERN)
          }
        }
      }
      for (let tag of testCase.pickle.tags) {
        for (let m of matches) {
          if (tag.name === m) return true
        }
      }
    } else if (
      testCase.uri.endsWith(text) ||
      testCase.uri.endsWith(text + '.feature')
    ) {
      return true
    }
  }
}
