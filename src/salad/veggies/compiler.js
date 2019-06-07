var countSymbols = require('../count_symbols');

function Compiler() {
  this.compile = function (salad_document) {
    var veggies = [];

    if (salad_document.plan == null) return veggies;

    var plan = salad_document.plan;
    var language = plan.language;
    var planTags = plan.tags;

    plan.children.forEach(function (simulationDefinition) {
        compileSimulation(planTags, simulationDefinition, language, veggies);
    });
    return veggies;
  };

  function compileSimulation(planTags,simulation, language,veggies) {
    var groups = []

    var tags = [].concat(planTags).concat(simulation.tags);
   
    simulation.groups.forEach(function (group) {
      groups.push(veggieGroup(group));
    });

    var veggie = {
      tags: veggieTags(tags),
      name: simulation.name,
      language: language,
      locations: [veggieLocation(simulation.location)],
      groups: groups,
      rampUp: simulation.rampUp,
      rampDown: simulation.rampDown,
      randomWait: simulation.randomWait,
      synchronize: simulation.synchronize,
      time: simulation.time,
    };
   
    veggies.push(veggie);
  }

  function createVeggieArguments(argument, variableCells, valueCells) {
    var result = [];
    if (!argument) return result;
    if (argument.type === 'DataTable') {
      var table = {
        rows: argument.rows.map(function (row) {
          return {
            cells: row.cells.map(function (cell) {
              return {
                location: veggieLocation(cell.location),
                value: interpolate(cell.value, variableCells, valueCells)
              };
            })
          };
        })
      };
      result.push(table);
    } else if (argument.type === 'DocString') {
      var docString = {
        location: veggieLocation(argument.location),
        content: interpolate(argument.content, variableCells, valueCells),
      };
      if(argument.contentType) {
        docString.contentType = interpolate(argument.contentType, variableCells, valueCells);
      }
      result.push(docString);
   } else if (argument.type === 'Time') {
      var time = {
        location: veggieLocation(argument.location),
        content: interpolate(argument.content, variableCells, valueCells),
      };
      if(argument.contentType) {
        time.contentType = interpolate(argument.contentType, variableCells, valueCells);
      }
      result.push(time);
    } else if (argument.type === 'Count') {
      var count = {
        location: veggieLocation(argument.location),
        content: interpolate(argument.content, variableCells, valueCells),
      };
      if(argument.contentType) {
        count.contentType = interpolate(argument.contentType, variableCells, valueCells);
      }
      result.push(count);
    } else if (argument.type === 'Runners') {
      var runners = {
        location: veggieLocation(argument.location),
        content: interpolate(argument.content, variableCells, valueCells),
      };
      if(argument.contentType) {
        runners.contentType = interpolate(argument.contentType, variableCells, valueCells);
      }
      result.push(runners);
    } else {
      throw Error('Internal error');
    }
    return result;
  }

  function interpolate(name, variableCells, valueCells) {
    variableCells.forEach(function (variableCell, n) {
      var valueCell = valueCells[n];
      var search = new RegExp('<' + variableCell.value + '>', 'g');
      // JS Specific - dollar sign needs to be escaped with another dollar sign
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
      var replacement = valueCell.value.replace(new RegExp('\\$', 'g'), '$$$$')
      name = name.replace(search, replacement);
    });
    return name;
  }

  function veggieGroups(simulationDefinition) {
    return simulationDefinition.groups.map(function (group) {
      return veggieGroup(group);
    });
  }

  function veggieGroup(group) {
    return {
      text: group.text,
      arguments: createVeggieArguments(group.argument, [], []),
      runners:(group.runners!= undefined)?group.runners.text:'0',
      count: (group.count!= undefined)?group.count.text:'0',
      locations: [veggieGroupLocation(group)]
    }
  }

  function veggieGroupLocation(group) {
    return {
      line: group.location.line,
      column: group.location.column + (group.keyword ? countSymbols(group.keyword) : 0)
    };
  }

  function veggieLocation(location) {
    return {
      line: location.line,
      column: location.column
    }
  }

  function veggieTags(tags) {
    return tags.map(function (tag) {
      return veggieTag(tag);
    });
  }

  function veggieTag(tag) {
    return {
      name: tag.name,
      location: veggieLocation(tag.location)
    };
  }
}

module.exports = Compiler;