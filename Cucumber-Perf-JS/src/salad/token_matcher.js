var DIALECTS = require('./dialects');
var Errors = require('./errors');
var LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/;

module.exports = function TokenMatcher(defaultDialectName) {
  defaultDialectName = defaultDialectName || 'en';

  var dialect;
  var dialectName;
  var activeDocStringSeparator;
  var indentToRemove;

  function changeDialect(newDialectName, location) {
    var newDialect = DIALECTS[newDialectName];
    if(!newDialect) {
      throw Errors.NoSuchLanguageException.create(newDialectName, location);
    }

    dialectName = newDialectName;
    dialect = newDialect;
  }

  this.reset = function () {
    if(dialectName != defaultDialectName) changeDialect(defaultDialectName);
    activeDocStringSeparator = null;
    indentToRemove = 0;
  };

  this.reset();

  this.match_TagLine = function match_TagLine(token) {
    if(token.line.startsWith('@')) {
      setTokenMatched(token, 'TagLine', null, null, null, token.line.getTags());
      return true;
    }
    return false;
  };

  this.match_PlanLine = function match_PlanLine(token) {
    return matchTitleLine(token, 'PlanLine', dialect.plan);
  };

  this.match_SimulationLine = function match_SimulationLine(token) {
    return matchTitleLine(token, 'SimulationLine', dialect.simulation);
  };

  this.match_SimulationPeriodLine = function match_SimulationPeriodLine(token) {
    return matchTitleLine(token, 'SimulationPeriodLine', dialect.simulationPeriod);
  };

  this.match_TableRow = function match_TableRow(token) {
    if (token.line.startsWith('|')) {
      // TODO: indent
      setTokenMatched(token, 'TableRow', null, null, null, token.line.getTableCells());
      return true;
    }
    return false;
  };

  this.match_Empty = function match_Empty(token) {
    if (token.line.isEmpty) {
      setTokenMatched(token, 'Empty', null, null, 0);
      return true;
    }
    return false;
  };

  this.match_Comment = function match_Comment(token) {
    if(token.line.startsWith('#')) {
      var text = token.line.getLineText(0); //take the entire line, including leading space
      setTokenMatched(token, 'Comment', text, null, 0);
      return true;
    }
    return false;
  };

  this.match_Language = function match_Language(token) {
    var match;
    if(match = token.line.trimmedLineText.match(LANGUAGE_PATTERN)) {
      var newDialectName = match[1];
      setTokenMatched(token, 'Language', newDialectName);

      changeDialect(newDialectName, token.location);
      return true;
    }
    return false;
  };

  this.match_DocStringSeparator = function match_DocStringSeparator(token) {
    return activeDocStringSeparator == null
      ?
      // open
      _match_DocStringSeparator(token, '"""', true) ||
      _match_DocStringSeparator(token, '```', true)
      :
      // close
      _match_DocStringSeparator(token, activeDocStringSeparator, false);
  };

  function _match_DocStringSeparator(token, separator, isOpen) {
    if (token.line.startsWith(separator)) {
      var contentType = null;
      if (isOpen) {
        contentType = token.line.getRestTrimmed(separator.length);
        activeDocStringSeparator = separator;
        indentToRemove = token.line.indent;
      } else {
        activeDocStringSeparator = null;
        indentToRemove = 0;
      }

      // TODO: Use the separator as keyword. That's needed for pretty printing.
      setTokenMatched(token, 'DocStringSeparator', contentType);
      return true;
    }
    return false;
  }

  this.match_EOF = function match_EOF(token) {
    if(token.isEof) {
      setTokenMatched(token, 'EOF');
      return true;
    }
    return false;
  };

  this.match_GroupLine = function match_GroupLine(token) {
    var length = dialect.group.length;
    for(var i = 0, keyword; i < length; i++) {
      var keyword =dialect.group[i];
      if (token.line.startsWith(keyword)) {
        var title = token.line.getRestTrimmed(keyword.length);
        setTokenMatched(token, 'GroupLine', title, keyword);
        return true;
      }
    }
    return false;
  };

  this.match_RunnersLine = function match_RunnersLine(token) {
    return matchTitleLine(token, 'RunnersLine', dialect.runners);
  };

  this.match_CountLine = function match_CountLine(token) {
    return matchTitleLine(token, 'CountLine', dialect.count);
  };

  this.match_TimeLine = function match_TimeLine(token) {
    return matchTitleLine(token, 'TimeLine', dialect.time);
  };

  this.match_RampUpLine = function match_RampUpLine(token) {
    return matchTitleLine(token, 'RampUpLine', dialect.rampup);
  };

  this.match_RampDownLine = function match_RampDownLine(token) {
    return matchTitleLine(token, 'RampDownLine', dialect.rampdown);
  };

  this.match_SynchronizedLine = function match_SynchronizedLine(token) {
    return matchTitleLine(token, 'SynchronizedLine', dialect.synchronized);
  };

  this.match_RandomWaitLine = function match_RandomWaitLine(token) {
    return matchTitleLine(token, 'RandomWaitLine', dialect.randomwait);
  };

  this.match_Other = function match_Other(token) {
    var text = token.line.getLineText(indentToRemove); //take the entire line, except removing DocString indents
    setTokenMatched(token, 'Other', unescapeDocString(text), null, 0);
    return true;
  };

  function matchTitleLine(token, tokenType, keywords) {
    var length = keywords.length;
    for(var i = 0, keyword; i < length; i++) {
      var keyword = keywords[i];

      if (token.line.startsWithTitleKeyword(keyword)) {
        var title = token.line.getRestTrimmed(keyword.length + ':'.length);
        setTokenMatched(token, tokenType, title, keyword);
        return true;
      }
    }
    return false;
  }

  function setTokenMatched(token, matchedType, text, keyword, indent, items) {
    token.matchedType = matchedType;
    token.matchedText = text;
    token.matchedKeyword = keyword;
    token.matchedIndent = (typeof indent === 'number') ? indent : (token.line == null ? 0 : token.line.indent);
    token.matchedItems = items || [];

    token.location.column = token.matchedIndent + 1;
    token.matchedSaladDialect = dialectName;
  }

  function unescapeDocString(text) {
    return activeDocStringSeparator != null ? text.replace("\\\"\\\"\\\"", "\"\"\"") : text;
  }
};