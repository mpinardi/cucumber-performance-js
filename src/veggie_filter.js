import _ from 'lodash'
import path from 'path'
import parse from 'cucumber-tag-expressions'

const PLAN_LINENUM_REGEXP = /^(.*?)((?::[\d]+)+)?$/

export default class VeggieFilter {
  constructor({ planPaths, names, tagExpression }) {
    this.planUriToLinesMapping = this.getPlanUriToLinesMapping(planPaths || [])
    this.names = names || []
    if (tagExpression) {
      this.tagExpressionNode = parse(tagExpression || '')
    }
  }

  getPlanUriToLinesMapping(planPaths) {
    const mapping = {}
    planPaths.forEach(planPath => {
      const match = PLAN_LINENUM_REGEXP.exec(planPath)
      if (match) {
        const uri = path.resolve(match[1])
        const linesExpression = match[2]
        if (linesExpression) {
          if (!mapping[uri]) {
            mapping[uri] = []
          }
          linesExpression
            .slice(1)
            .split(':')
            .forEach(line => {
              mapping[uri].push(parseInt(line))
            })
        }
      }
    })
    return mapping
  }

  matches({ veggie, uri }) {
    return (
      this.matchesAnyLine({ veggie, uri }) &&
      this.matchesAnyName(veggie) &&
      this.matchesAllTagExpressions(veggie)
    )
  }

  matchesAnyLine({ veggie, uri }) {
    const lines = this.planUriToLinesMapping[path.resolve(uri)]
    if (lines) {
      return _.size(_.intersection(lines, _.map(veggie.locations, 'line'))) > 0
    }
    return true
  }

  matchesAnyName(veggie) {
    if (this.names.length === 0) {
      return true
    }
    return _.some(this.names, name => veggie.name.match(name))
  }

  matchesAllTagExpressions(veggie) {
    if (!this.tagExpressionNode) {
      return true
    }
    return this.tagExpressionNode.evaluate(_.map(veggie.tags, 'name'))
  }
}
