
var AstNode = require('./ast_node');
var Errors = require('./errors');

module.exports = function AstBuilder () {

  var stack = [new AstNode('None')];
  var comments = [];

  this.reset = function () {
    stack = [new AstNode('None')];
    comments = [];
  };

  this.startRule = function (ruleType) {
    stack.push(new AstNode(ruleType));
  };

  this.endRule = function (ruleType) {
    var node = stack.pop();
    var transformedNode = transformNode(node);
    currentNode().add(node.ruleType, transformedNode);
  };

  this.build = function (token) {
    if(token.matchedType === 'Comment') {
      comments.push({
        type: 'Comment',
        location: getLocation(token),
        text: token.matchedText
      });
    } else {
      currentNode().add(token.matchedType, token);
    }
  };

  this.getResult = function () {
    return currentNode().getSingle('SaladDocument');
  };

  function currentNode () {
    return stack[stack.length - 1];
  }

  function getLocation (token, column) {
    return !column ? token.location : {line: token.location.line, column: column};
  }

  function getTags (node) {
    var tags = [];
    var tagsNode = node.getSingle('Tags');
    if (!tagsNode) return tags;
    tagsNode.getTokens('TagLine').forEach(function (token) {
      token.matchedItems.forEach(function (tagItem) {
        tags.push({
          type: 'Tag',
          location: getLocation(token, tagItem.column),
          name: tagItem.text
        });
      });

    });
    return tags;
  }

  function getCells(tableRowToken) {
    return tableRowToken.matchedItems.map(function (cellItem) {
      return {
        type: 'TableCell',
        location: getLocation(tableRowToken, cellItem.column),
        value: cellItem.text
      }
    });
  }

  function getDescription (node) {
    return node.getSingle('Description');
  }

  function getGroups (node) {
    return node.getItems('Group');
  }

  function getTableRows(node) {
    var rows = node.getTokens('TableRow').map(function (token) {
      return {
        type: 'TableRow',
        location: getLocation(token),
        cells: getCells(token)
      };
    });
    ensureCellCount(rows);
    return rows;
  }

  function ensureCellCount(rows) {
    if(rows.length == 0) return;
    var cellCount = rows[0].cells.length;

    rows.forEach(function (row) {
      if (row.cells.length != cellCount) {
        throw GErrors.AstBuilderException.create("inconsistent cell count within the table", row.location);
      }
    });
  }

  function transformNode(node) {
    switch(node.ruleType) {
      case 'Group':
        var groupLine = node.getToken('GroupLine');
        var groupArgument = node.getSingle('DataTable') || node.getSingle('DocString') ||undefined
        // var item = node.getSingle('DataTable')
        // if (item != undefined){
        //   groupArguments.push(item)
        // }
       
        // item = node.getSingle('DocString')
        // if (item != undefined){
        //   groupArguments.push(item)
        // }
        
        // item = node.getSingle('Count')
        // if (item != undefined){
        //   groupArguments.push(item)
        // }

        // item = node.getSingle('Runners')
        // if (item != undefined){
        //   groupArguments.push(item)
        // }
        
        return {
          type: node.ruleType,
          location: getLocation(groupLine),
          keyword: groupLine.matchedKeyword,
          text: groupLine.matchedText,
          argument: groupArgument,
          count: node.getSingle('Count'),
          runners: node.getSingle('Runners'),
        }
      case 'DataTable':
        var rows = getTableRows(node);
        return {
          type: node.ruleType,
          location: rows[0].location,
          rows: rows,
        }
      case 'DocString':
        var separatorToken = node.getTokens('DocStringSeparator')[0];
        var contentType = separatorToken.matchedText.length > 0 ? separatorToken.matchedText : undefined;
        var lineTokens = node.getTokens('Other');
        var content = lineTokens.map(function (t) {return t.matchedText}).join("\n");

        var result = {
          type: node.ruleType,
          location: getLocation(separatorToken),
          content: content
        };
        // conditionally add this like this (needed to make tests pass on node 0.10 as well as 4.0)
        if(contentType) {
          result.contentType = contentType;
        }
        return result;     
      case 'Count':
      var countLine = node.getToken('CountLine');
      return {
        type: node.ruleType,
        location: getLocation(countLine),
        keyword: countLine.matchedKeyword,
        text: countLine.matchedText,
      }
      case 'Runners':
      var runnersLine = node.getToken('RunnersLine');
      return {
        type: node.ruleType,
        location: getLocation(runnersLine),
        keyword: runnersLine.matchedKeyword,
        text: runnersLine.matchedText,
      }
      case 'Simulation_Definition':
        var tags = getTags(node);
        var simulationNode = node.getSingle('Simulation');
        if(simulationNode) {
          var simulationLine = simulationNode.getToken('SimulationLine');
          var description = getDescription(simulationNode);
          var groups = getGroups(simulationNode);
          var rampUp = simulationNode.getSingle('RampUp');
          var rampDown = simulationNode.getSingle('RampDown');
          var synchronize = simulationNode.getSingle('Synchronized');
          var randomWait = simulationNode.getSingle('RandomWait');

          return {
            type: simulationNode.ruleType,
            tags: tags,
            location: getLocation(simulationLine),
            keyword: simulationLine.matchedKeyword,
            name: simulationLine.matchedText,
            description: description,
            groups: groups,
            rampUp: rampUp,
            rampDown: rampDown,
            synchronize: synchronize,
            randomWait: randomWait
          };
        } else {
          var simulationPeriodNode = node.getSingle('SimulationPeriod');
          if(!simulationPeriodNode) throw new Error('Internal grammar error');

          var simulationPeriodLine = simulationPeriodNode.getToken('SimulationPeriodLine');
          var description = getDescription(simulationPeriodNode);
          var groups = getGroups(simulationPeriodNode);
          var time = simulationPeriodNode.getSingle('Time');
          var rampUp = simulationPeriodNode.getSingle('RampUp');
          var rampDown = simulationPeriodNode.getSingle('RampDown');
          var synchronize = simulationPeriodNode.getSingle('Synchronized');
          var randomWait = simulationPeriodNode.getSingle('RandomWait');

          return {
            type: simulationPeriodNode.ruleType,
            tags: tags,
            location: getLocation(simulationPeriodLine),
            keyword: simulationPeriodLine.matchedKeyword,
            name: simulationPeriodLine.matchedText,
            description: description,
            groups: groups,
            time: time,
            rampUp: rampUp,
            rampDown: rampDown,
            synchronize: synchronize,
            randomWait: randomWait
          };
        }
      case 'Description':
        var lineTokens = node.getTokens('Other');
        // Trim trailing empty lines
        var end = lineTokens.length;
        while (end > 0 && lineTokens[end-1].line.trimmedLineText === '') {
            end--;
        }
        lineTokens = lineTokens.slice(0, end);

        var description = lineTokens.map(function (token) { return token.matchedText}).join("\n");
        return description;

      case 'Plan':
        var header = node.getSingle('Plan_Header');
        if(!header) return null;
        var tags = getTags(header);
        var planLine = header.getToken('PlanLine');
        if(!planLine) return null;
        var children = []
        children = children.concat(node.getItems('Simulation_Definition'));
        var description = getDescription(header);
        var language = planLine.matchedSaladDialect;

        return {
          type: node.ruleType,
          tags: tags,
          location: getLocation(planLine),
          language: language,
          keyword: planLine.matchedKeyword,
          name: planLine.matchedText,
          description: description,
          children: children,
        };
      case 'SaladDocument':
        var plan = node.getSingle('Plan');

        return {
          type: node.ruleType,
          plan: plan,
          comments: comments
        };
        case 'Time':
        var timeLine = node.getToken('TimeLine');
        return {
          type: node.ruleType,
          location: getLocation(timeLine),
          keyword: timeLine.matchedKeyword,
          text: timeLine.matchedText,
        }
        case 'RampUp':
        var rampUpLine = node.getToken('RampUpLine');
        return {
          type: node.ruleType,
          location: getLocation(rampUpLine),
          keyword: rampUpLine.matchedKeyword,
          text: rampUpLine.matchedText,
        }
        case 'RampDown':
        var rampDownLine = node.getToken('RampDownLine');
        return {
          type: node.ruleType,
          location: getLocation(rampDownLine),
          keyword: rampDownLine.matchedKeyword,
          text: rampDownLine.matchedText,
        }
        case 'Synchronize':
        var synchronizeLine = node.getToken('SynchronizeLine');
        return {
          type: node.ruleType,
          location: getLocation(synchronizeLine),
          keyword: synchronizeLine.matchedKeyword,
          text: synchronizeLine.matchedText,
        }
        case 'RandomWait':
        var randomWaitLine = node.getToken('RandomWaitLine');
        return {
          type: node.ruleType,
          location: getLocation(randomWaitLine),
          keyword: randomWaitLine.matchedKeyword,
          text: randomWaitLine.matchedText,
        }
      default:
        return node;
    }
  }

};