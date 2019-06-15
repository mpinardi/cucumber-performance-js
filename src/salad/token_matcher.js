var DIALECTS = require('./dialects')
var Errors = require('./errors')
var LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/

module.exports = function TokenMatcher(defaultDialectName) {
  defaultDialectName = defaultDialectName || 'en'

  var dialect
  var dialectName
  var activeDocStringSeparator
  var indentToRemove

  function changeDialect(newDialectName, location) {
    var newDialect = DIALECTS[newDialectName]
    if (!newDialect) {
      throw Errors.NoSuchLanguageException.create(newDialectName, location)
    }

    dialectName = newDialectName
    dialect = newDialect
  }

  this.reset = function() {
    if (dialectName !== defaultDialectName) changeDialect(defaultDialectName)
    activeDocStringSeparator = null
    indentToRemove = 0
  }

  this.reset()

  this.matchTagLine = function matchTagLine(token) {
    if (token.line.startsWith('@')) {
      setTokenMatched(token, 'TagLine', null, null, null, token.line.getTags())
      return true
    }
    return false
  }

  this.matchPlanLine = function matchPlanLine(token) {
    return matchTitleLine(token, 'PlanLine', dialect.plan)
  }

  this.matchSimulationLine = function matchSimulationLine(token) {
    return matchTitleLine(token, 'SimulationLine', dialect.simulation)
  }

  this.matchSimulationPeriodLine = function matchSimulationPeriodLine(token) {
    return matchTitleLine(
      token,
      'SimulationPeriodLine',
      dialect.simulationPeriod
    )
  }

  this.matchTableRow = function matchTableRow(token) {
    if (token.line.startsWith('|')) {
      // TODO: indent
      setTokenMatched(
        token,
        'TableRow',
        null,
        null,
        null,
        token.line.getTableCells()
      )
      return true
    }
    return false
  }

  this.matchEmpty = function matchEmpty(token) {
    if (token.line.isEmpty) {
      setTokenMatched(token, 'Empty', null, null, 0)
      return true
    }
    return false
  }

  this.matchComment = function matchComment(token) {
    if (token.line.startsWith('#')) {
      var text = token.line.getLineText(0) // take the entire line, including leading space
      setTokenMatched(token, 'Comment', text, null, 0)
      return true
    }
    return false
  }

  this.matchLanguage = function matchLanguage(token) {
    var match
    if ((match = token.line.trimmedLineText.match(LANGUAGE_PATTERN))) {
      var newDialectName = match[1]
      setTokenMatched(token, 'Language', newDialectName)

      changeDialect(newDialectName, token.location)
      return true
    }
    return false
  }

  this.matchDocStringSeparator = function matchDocStringSeparator(token) {
    return activeDocStringSeparator == null
      ? // open
        _matchDocStringSeparator(token, '"""', true) ||
          _matchDocStringSeparator(token, '```', true)
      : // close
        _matchDocStringSeparator(token, activeDocStringSeparator, false)
  }

  function _matchDocStringSeparator(token, separator, isOpen) {
    if (token.line.startsWith(separator)) {
      let contentType = null
      if (isOpen) {
        contentType = token.line.getRestTrimmed(separator.length)
        activeDocStringSeparator = separator
        indentToRemove = token.line.indent
      } else {
        activeDocStringSeparator = null
        indentToRemove = 0
      }

      // TODO: Use the separator as keyword. That's needed for pretty printing.
      setTokenMatched(token, 'DocStringSeparator', contentType)
      return true
    }
    return false
  }

  this.matchEOF = function matchEOF(token) {
    if (token.isEof) {
      setTokenMatched(token, 'EOF')
      return true
    }
    return false
  }

  this.matchGroupLine = function matchGroupLine(token) {
    let length = dialect.group.length
    for (let i = 0; i < length; i++) {
      let keyword = dialect.group[i]
      if (token.line.startsWith(keyword)) {
        let title = token.line.getRestTrimmed(keyword.length)
        setTokenMatched(token, 'GroupLine', title, keyword)
        return true
      }
    }
    return false
  }

  this.matchRunnersLine = function matchRunnersLine(token) {
    return matchTitleLine(token, 'RunnersLine', dialect.runners)
  }

  this.matchCountLine = function matchCountLine(token) {
    return matchTitleLine(token, 'CountLine', dialect.count)
  }

  this.matchTimeLine = function matchTimeLine(token) {
    return matchTitleLine(token, 'TimeLine', dialect.time)
  }

  this.matchRampUpLine = function matchRampUpLine(token) {
    return matchTitleLine(token, 'RampUpLine', dialect.rampup)
  }

  this.matchRampDownLine = function matchRampDownLine(token) {
    return matchTitleLine(token, 'RampDownLine', dialect.rampdown)
  }

  this.matchSynchronizedLine = function matchSynchronizedLine(token) {
    return matchTitleLine(token, 'SynchronizedLine', dialect.synchronized)
  }

  this.matchRandomWaitLine = function matchRandomWaitLine(token) {
    return matchTitleLine(token, 'RandomWaitLine', dialect.randomwait)
  }

  this.matchOther = function matchOther(token) {
    var text = token.line.getLineText(indentToRemove) // take the entire line, except removing DocString indents
    setTokenMatched(token, 'Other', unescapeDocString(text), null, 0)
    return true
  }

  function matchTitleLine(token, tokenType, keywords) {
    let length = keywords.length
    for (var i = 0; i < length; i++) {
      let keyword = keywords[i]

      if (token.line.startsWithTitleKeyword(keyword)) {
        var title = token.line.getRestTrimmed(keyword.length + ':'.length)
        setTokenMatched(token, tokenType, title, keyword)
        return true
      }
    }
    return false
  }

  function setTokenMatched(token, matchedType, text, keyword, indent, items) {
    token.matchedType = matchedType
    token.matchedText = text
    token.matchedKeyword = keyword
    token.matchedIndent =
      typeof indent === 'number'
        ? indent
        : token.line == null
        ? 0
        : token.line.indent
    token.matchedItems = items || []

    token.location.column = token.matchedIndent + 1
    token.matchedSaladDialect = dialectName
  }

  function unescapeDocString(text) {
    return activeDocStringSeparator != null
      ? text.replace('\\"\\"\\"', '"""')
      : text
  }
}
