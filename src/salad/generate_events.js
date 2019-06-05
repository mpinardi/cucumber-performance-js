var Parser = require('./parser')
var Compiler = require('./veggies/compiler')

var compiler = new Compiler()
var parser = new Parser()
parser.stopAtFirstError = false

function generateEvents(data, uri, types, language) {
  types = Object.assign({
    'source': true,
    'salad-document': true,
    'veggie': true
  }, types || {})

  let result = []
  
  try {
    if (types['source']) {
      result.push({
        type: 'source',
        uri: uri,
        data: data,
        media: {
          encoding: 'utf-8',
          type: 'text/x.cucumber-perf.salad+plain'
        }
      })
    }

    if (!types['salad-document'] && !types['veggie'])
      return result

    var saladDocument = parser.parse(data, language)

    if (types['salad-document']) {
      result.push({
        type: 'salad-document',
        uri: uri,
        document: saladDocument
      })
    }
    if (types['veggie']) {
      var veggies = compiler.compile(saladDocument)
      for (var p in veggies) {
        result.push({
          type: 'veggie',
          uri: uri,
          veggie: veggies[p]
        })
      }
    }
   } catch (err) {
    var errors = err.errors || [err]
    for (var e in errors) {
      result.push({
        type: "attachment",
        source: {
          uri: uri,
          start: {
            line: errors[e].location.line,
            column: errors[e].location.column
          }
        },
        data: errors[e].message,
        media: {
          encoding: "utf-8",
          type: "text/x.cucumber.stacktrace+plain"
        }
      })
    }
  }
  return result
}

module.exports = generateEvents