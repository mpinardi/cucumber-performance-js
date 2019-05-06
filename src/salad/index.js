(function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module
      define([], factory)
    }
  
    if (typeof module !== 'undefined' && module.exports) {
      // Node.js/RequireJS
      module.exports = factory();
    }
  
    if (typeof window === 'object'){
      // Browser globals
      window.Salad = factory();
    }
  
  }(function () {
    return {
      Parser: require('./parser'),
      TokenScanner: require('./token_scanner'),
      TokenMatcher: require('./token_matcher'),
      AstBuilder: require('./ast_builder'),
      Compiler: require('./veggies/compiler'),
      DIALECTS: require('./dialects'),
      generateEvents: require('./generate_events')
    };
  
  }));