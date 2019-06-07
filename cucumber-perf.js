var common = [
    '--require-module @babel/register',
    '--perf-format summary',
    '--perf-format progress',
  ].join(' ')
  
  module.exports = {
    test: common,
    //default: common //this would allways be included
  }