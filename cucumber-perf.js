var common = [
    '--require-module @babel/register',
    '--perf-format summary',
    '--perf-format progress',
  ].join(' ')
  
  module.exports = {
    default: common,
  }