// This file is generated. Do not edit! Edit gherkin-javascript.razor instead.
var Errors = require('./errors');
var AstBuilder = require('./ast_builder');
var TokenScanner = require('./token_scanner');
var TokenMatcher = require('./token_matcher');

var RULE_TYPES = [
  'None',
  '_EOF', // #EOF
  '_Empty', // #Empty
  '_Comment', // #Comment
  '_TagLine', // #TagLine
  '_PlanLine', // #PlanLine
  '_SimulationLine', // #SimulationLine
  '_SimulationPeriodLine', // #SimulationPeriodLine
  '_SynchronizedLine', // #SynchronizedLine
  '_TimeLine', // #TimeLine
  '_GroupLine', // #GroupLine
  '_DocStringSeparator', // #DocStringSeparator
  '_TableRow', // #TableRow
  '_Language', // #Language
  '_CountLine', // #CountLine
  '_RandomWaitLine', // #RandomWaitLine
  '_RunnersLine', // #RunnersLine
  '_RampUpLine', // #RampUpLine
  '_RampDownLine', // #RampDownLine
  '_Other', // #Other
  'SaladDocument', // SaladDocument! := Plan?
  'Plan', // Plan! := Plan_Header Simulation_Definition*
  'Plan_Header', // Plan_Header! := #Language? Tags? #PlanLine Description_Helper
  'Simulation_Definition', // Simulation_Definition! := Tags? (Simulation | SimulationPeriod)
  'Simulation', // Simulation! := #SimulationLine Description_Helper Group* Synchronized? RampUp? RampDown? RandomWait?
  'SimulationPeriod', // SimulationPeriod! := #SimulationPeriodLine Description_Helper Group* Time* Synchronized? RampUp? RampDown? RandomWait?
  'Time', // Time! := #TimeLine Description_Helper
  'Group', // Group! := #GroupLine Group_Arg?
  'Group_Arg', // Group_Arg := DataTable? DocString? Runners* Count?
  'DataTable', // DataTable! := #TableRow+
  'DocString', // DocString! := #DocStringSeparator #Other* #DocStringSeparator
  'Runners', // Runners! := #RunnersLine
  'Count', // Count! := #CountLine
  'RampUp', // RampUp! := #RampUpLine
  'RampDown', // RampDown! := #RampDownLine
  'Tags', // Tags! := #TagLine+
  'Synchronized', // Synchronized! := #SynchronizedLine
  'RandomWait', // RandomWait! := #RandomWaitLine
  'Description_Helper', // Description_Helper := #Empty* Description? #Comment*
  'Description', // Description! := #Other+
];

module.exports = function Parser(builder) {
  builder = builder || new AstBuilder();
  var self = this;
  var context;

  this.parse = function(tokenScanner, tokenMatcher) {
    if(typeof tokenScanner == 'string') {
      tokenScanner = new TokenScanner(tokenScanner);
    }
    tokenMatcher = tokenMatcher || new TokenMatcher();
    builder.reset();
    tokenMatcher.reset();
    context = {
      tokenScanner: tokenScanner,
      tokenMatcher: tokenMatcher,
      tokenQueue: [],
      errors: []
    };
    startRule(context, "SaladDocument");
    var state = 0;
    var token = null;
    while(true) {
      token = readToken(context);
      state = matchToken(state, token, context);
      if(token.isEof) break;
    }

    endRule(context, "SaladDocument");

    if(context.errors.length > 0) {
      throw Errors.CompositeParserException.create(context.errors);
    }

    return getResult();
  };

  function addError(context, error) {
    context.errors.push(error);
    if (context.errors.length > 10)
      throw Errors.CompositeParserException.create(context.errors);
  }

  function startRule(context, ruleType) {
    handleAstError(context, function () {
      builder.startRule(ruleType);
    });
  }

  function endRule(context, ruleType) {
    handleAstError(context, function () {
      builder.endRule(ruleType);
    });
  }

  function build(context, token) {
    handleAstError(context, function () {
      builder.build(token);
    });
  }

  function getResult() {
    return builder.getResult();
  }

  function handleAstError(context, action) {
    handleExternalError(context, true, action)
  }

  function handleExternalError(context, defaultValue, action) {
    if(self.stopAtFirstError) return action();
    try {
      return action();
    } catch (e) {
      if(e instanceof Errors.CompositeParserException) {
        e.errors.forEach(function (error) {
          addError(context, error);
        });
      } else if(
        e instanceof Errors.ParserException ||
        e instanceof Errors.AstBuilderException ||
        e instanceof Errors.UnexpectedTokenException ||
        e instanceof Errors.NoSuchLanguageException
      ) {
        addError(context, e);
      } else {
        throw e;
      }
    }
    return defaultValue;
  }

  function readToken(context) {
    return context.tokenQueue.length > 0 ?
      context.tokenQueue.shift() :
      context.tokenScanner.read();
  }

  function matchToken(state, token, context) {
    switch(state) {
    case 0:
      return matchTokenAt_0(token, context);
    case 1:
      return matchTokenAt_1(token, context);
    case 2:
      return matchTokenAt_2(token, context);
    case 3:
      return matchTokenAt_3(token, context);
    case 4:
      return matchTokenAt_4(token, context);
    case 5:
      return matchTokenAt_5(token, context);
    case 6:
      return matchTokenAt_6(token, context);
    case 7:
      return matchTokenAt_7(token, context);
    case 8:
      return matchTokenAt_8(token, context);
    case 9:
      return matchTokenAt_9(token, context);
    case 10:
      return matchTokenAt_10(token, context);
    case 11:
      return matchTokenAt_11(token, context);
    case 12:
      return matchTokenAt_12(token, context);
    case 13:
      return matchTokenAt_13(token, context);
    case 14:
      return matchTokenAt_14(token, context);
    case 15:
      return matchTokenAt_15(token, context);
    case 16:
      return matchTokenAt_16(token, context);
    case 17:
      return matchTokenAt_17(token, context);
    case 18:
      return matchTokenAt_18(token, context);
    case 19:
      return matchTokenAt_19(token, context);
    case 20:
      return matchTokenAt_20(token, context);
    case 21:
      return matchTokenAt_21(token, context);
    case 22:
      return matchTokenAt_22(token, context);
    case 23:
      return matchTokenAt_23(token, context);
    case 24:
      return matchTokenAt_24(token, context);
    case 25:
      return matchTokenAt_25(token, context);
    case 26:
      return matchTokenAt_26(token, context);
    case 27:
      return matchTokenAt_27(token, context);
    case 28:
      return matchTokenAt_28(token, context);
    case 29:
      return matchTokenAt_29(token, context);
    case 30:
      return matchTokenAt_30(token, context);
    case 31:
      return matchTokenAt_31(token, context);
    case 32:
      return matchTokenAt_32(token, context);
    case 33:
      return matchTokenAt_33(token, context);
    case 34:
      return matchTokenAt_34(token, context);
    case 35:
      return matchTokenAt_35(token, context);
    default:
      throw new Error("Unknown state: " + state);
    }
  }


  // Start
  function matchTokenAt_0(token, context) {
    if(match_EOF(context, token)) {
      build(context, token);
      return 36;
    }
    if(match_Language(context, token)) {
      startRule(context, 'Plan');
      startRule(context, 'Plan_Header');
      build(context, token);
      return 1;
    }
    if(match_TagLine(context, token)) {
      startRule(context, 'Plan');
      startRule(context, 'Plan_Header');
      startRule(context, 'Tags');
      build(context, token);
      return 2;
    }
    if(match_PlanLine(context, token)) {
      startRule(context, 'Plan');
      startRule(context, 'Plan_Header');
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 0;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 0;
    }
    
    var stateComment = "State: 0 - Start";
    token.detach();
    var expectedTokens = ["#EOF", "#Language", "#TagLine", "#PlanLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 0;
  }


  // SaladDocument:0>Plan:0>Plan_Header:0>#Language:0
  function matchTokenAt_1(token, context) {
    if(match_TagLine(context, token)) {
      startRule(context, 'Tags');
      build(context, token);
      return 2;
    }
    if(match_PlanLine(context, token)) {
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 1;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 1;
    }
    
    var stateComment = "State: 1 - SaladDocument:0>Plan:0>Plan_Header:0>#Language:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#PlanLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 1;
  }


  // SaladDocument:0>Plan:0>Plan_Header:1>Tags:0>#TagLine:0
  function matchTokenAt_2(token, context) {
    if(match_TagLine(context, token)) {
      build(context, token);
      return 2;
    }
    if(match_PlanLine(context, token)) {
      endRule(context, 'Tags');
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 2;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 2;
    }
    
    var stateComment = "State: 2 - SaladDocument:0>Plan:0>Plan_Header:1>Tags:0>#TagLine:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#PlanLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 2;
  }


  // SaladDocument:0>Plan:0>Plan_Header:2>#PlanLine:0
  function matchTokenAt_3(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Plan_Header');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 3;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 5;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 4;
    }
    
    var stateComment = "State: 3 - SaladDocument:0>Plan:0>Plan_Header:2>#PlanLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 3;
  }


  // SaladDocument:0>Plan:0>Plan_Header:3>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_4(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Plan_Header');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 5;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 4;
    }
    
    var stateComment = "State: 4 - SaladDocument:0>Plan:0>Plan_Header:3>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 4;
  }


  // SaladDocument:0>Plan:0>Plan_Header:3>Description_Helper:2>#Comment:0
  function matchTokenAt_5(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Plan_Header');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 5;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Plan_Header');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 5;
    }
    
    var stateComment = "State: 5 - SaladDocument:0>Plan:0>Plan_Header:3>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 5;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:0>Tags:0>#TagLine:0
  function matchTokenAt_6(token, context) {
    if(match_TagLine(context, token)) {
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Tags');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Tags');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 6;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 6;
    }
    
    var stateComment = "State: 6 - SaladDocument:0>Plan:1>Simulation_Definition:0>Tags:0>#TagLine:0";
    token.detach();
    var expectedTokens = ["#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 6;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:0>#SimulationLine:0
  function matchTokenAt_7(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 7;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 9;
    }
    if(match_GroupLine(context, token)) {
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 8;
    }
    
    var stateComment = "State: 7 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:0>#SimulationLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 7;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:1>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_8(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 9;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 8;
    }
    
    var stateComment = "State: 8 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:1>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 8;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:1>Description_Helper:2>#Comment:0
  function matchTokenAt_9(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 9;
    }
    if(match_GroupLine(context, token)) {
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 9;
    }
    
    var stateComment = "State: 9 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:1>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 9;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:0>#GroupLine:0
  function matchTokenAt_10(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'DataTable');
      build(context, token);
      return 11;
    }
    if(match_DocStringSeparator(context, token)) {
      startRule(context, 'DocString');
      build(context, token);
      return 12;
    }
    if(match_RunnersLine(context, token)) {
      startRule(context, 'Runners');
      build(context, token);
      return 14;
    }
    if(match_CountLine(context, token)) {
      startRule(context, 'Count');
      build(context, token);
      return 15;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 10;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 10;
    }
    
    var stateComment = "State: 10 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:0>#GroupLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#RunnersLine", "#CountLine", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 10;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:0>DataTable:0>#TableRow:0
  function matchTokenAt_11(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_TableRow(context, token)) {
      build(context, token);
      return 11;
    }
    if(match_DocStringSeparator(context, token)) {
      endRule(context, 'DataTable');
      startRule(context, 'DocString');
      build(context, token);
      return 12;
    }
    if(match_RunnersLine(context, token)) {
      endRule(context, 'DataTable');
      startRule(context, 'Runners');
      build(context, token);
      return 14;
    }
    if(match_CountLine(context, token)) {
      endRule(context, 'DataTable');
      startRule(context, 'Count');
      build(context, token);
      return 15;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 11;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 11;
    }
    
    var stateComment = "State: 11 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:0>DataTable:0>#TableRow:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#RunnersLine", "#CountLine", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 11;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:1>DocString:0>#DocStringSeparator:0
  function matchTokenAt_12(token, context) {
    if(match_DocStringSeparator(context, token)) {
      build(context, token);
      return 13;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 12;
    }
    
    var stateComment = "State: 12 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:1>DocString:0>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#DocStringSeparator", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 12;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:1>DocString:2>#DocStringSeparator:0
  function matchTokenAt_13(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RunnersLine(context, token)) {
      endRule(context, 'DocString');
      startRule(context, 'Runners');
      build(context, token);
      return 14;
    }
    if(match_CountLine(context, token)) {
      endRule(context, 'DocString');
      startRule(context, 'Count');
      build(context, token);
      return 15;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 13;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 13;
    }
    
    var stateComment = "State: 13 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:1>DocString:2>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RunnersLine", "#CountLine", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 13;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:2>Runners:0>#RunnersLine:0
  function matchTokenAt_14(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RunnersLine(context, token)) {
      endRule(context, 'Runners');
      startRule(context, 'Runners');
      build(context, token);
      return 14;
    }
    if(match_CountLine(context, token)) {
      endRule(context, 'Runners');
      startRule(context, 'Count');
      build(context, token);
      return 15;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 14;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 14;
    }
    
    var stateComment = "State: 14 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:2>Runners:0>#RunnersLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RunnersLine", "#CountLine", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 14;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:3>Count:0>#CountLine:0
  function matchTokenAt_15(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 10;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 16;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 15;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 15;
    }
    
    var stateComment = "State: 15 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:2>Group:1>Group_Arg:3>Count:0>#CountLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#GroupLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 15;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:3>Synchronized:0>#SynchronizedLine:0
  function matchTokenAt_16(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Synchronized');
      startRule(context, 'RampUp');
      build(context, token);
      return 17;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Synchronized');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Synchronized');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 16;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 16;
    }
    
    var stateComment = "State: 16 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:3>Synchronized:0>#SynchronizedLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 16;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:4>RampUp:0>#RampUpLine:0
  function matchTokenAt_17(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'RampUp');
      startRule(context, 'RampDown');
      build(context, token);
      return 18;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'RampUp');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 17;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 17;
    }
    
    var stateComment = "State: 17 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:4>RampUp:0>#RampUpLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 17;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:5>RampDown:0>#RampDownLine:0
  function matchTokenAt_18(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'RampDown');
      startRule(context, 'RandomWait');
      build(context, token);
      return 19;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 18;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 18;
    }
    
    var stateComment = "State: 18 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:5>RampDown:0>#RampDownLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 18;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:6>RandomWait:0>#RandomWaitLine:0
  function matchTokenAt_19(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'Simulation');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 19;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 19;
    }
    
    var stateComment = "State: 19 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:0>Simulation:6>RandomWait:0>#RandomWaitLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 19;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:0>#SimulationPeriodLine:0
  function matchTokenAt_20(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 22;
    }
    if(match_GroupLine(context, token)) {
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 21;
    }
    
    var stateComment = "State: 20 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:0>#SimulationPeriodLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 20;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:1>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_21(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 22;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Description');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 21;
    }
    
    var stateComment = "State: 21 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:1>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 21;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:1>Description_Helper:2>#Comment:0
  function matchTokenAt_22(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 22;
    }
    if(match_GroupLine(context, token)) {
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 22;
    }
    
    var stateComment = "State: 22 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:1>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 22;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:0>#GroupLine:0
  function matchTokenAt_23(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_TableRow(context, token)) {
      startRule(context, 'DataTable');
      build(context, token);
      return 24;
    }
    if(match_DocStringSeparator(context, token)) {
      startRule(context, 'DocString');
      build(context, token);
      return 25;
    }
    if(match_RunnersLine(context, token)) {
      startRule(context, 'Runners');
      build(context, token);
      return 27;
    }
    if(match_CountLine(context, token)) {
      startRule(context, 'Count');
      build(context, token);
      return 28;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 23;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 23;
    }
    
    var stateComment = "State: 23 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:0>#GroupLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#RunnersLine", "#CountLine", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 23;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:0>DataTable:0>#TableRow:0
  function matchTokenAt_24(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_TableRow(context, token)) {
      build(context, token);
      return 24;
    }
    if(match_DocStringSeparator(context, token)) {
      endRule(context, 'DataTable');
      startRule(context, 'DocString');
      build(context, token);
      return 25;
    }
    if(match_RunnersLine(context, token)) {
      endRule(context, 'DataTable');
      startRule(context, 'Runners');
      build(context, token);
      return 27;
    }
    if(match_CountLine(context, token)) {
      endRule(context, 'DataTable');
      startRule(context, 'Count');
      build(context, token);
      return 28;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'DataTable');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 24;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 24;
    }
    
    var stateComment = "State: 24 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:0>DataTable:0>#TableRow:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#RunnersLine", "#CountLine", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 24;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:1>DocString:0>#DocStringSeparator:0
  function matchTokenAt_25(token, context) {
    if(match_DocStringSeparator(context, token)) {
      build(context, token);
      return 26;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 25;
    }
    
    var stateComment = "State: 25 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:1>DocString:0>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#DocStringSeparator", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 25;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:1>DocString:2>#DocStringSeparator:0
  function matchTokenAt_26(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RunnersLine(context, token)) {
      endRule(context, 'DocString');
      startRule(context, 'Runners');
      build(context, token);
      return 27;
    }
    if(match_CountLine(context, token)) {
      endRule(context, 'DocString');
      startRule(context, 'Count');
      build(context, token);
      return 28;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'DocString');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 26;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 26;
    }
    
    var stateComment = "State: 26 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:1>DocString:2>#DocStringSeparator:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RunnersLine", "#CountLine", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 26;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:2>Runners:0>#RunnersLine:0
  function matchTokenAt_27(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RunnersLine(context, token)) {
      endRule(context, 'Runners');
      startRule(context, 'Runners');
      build(context, token);
      return 27;
    }
    if(match_CountLine(context, token)) {
      endRule(context, 'Runners');
      startRule(context, 'Count');
      build(context, token);
      return 28;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Runners');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 27;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 27;
    }
    
    var stateComment = "State: 27 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:2>Runners:0>#RunnersLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RunnersLine", "#CountLine", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 27;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:3>Count:0>#CountLine:0
  function matchTokenAt_28(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_GroupLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'Group');
      build(context, token);
      return 23;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Count');
      endRule(context, 'Group');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 28;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 28;
    }
    
    var stateComment = "State: 28 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:2>Group:1>Group_Arg:3>Count:0>#CountLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#GroupLine", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 28;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:3>Time:0>#TimeLine:0
  function matchTokenAt_29(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 29;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 31;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      startRule(context, 'Description');
      build(context, token);
      return 30;
    }
    
    var stateComment = "State: 29 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:3>Time:0>#TimeLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Empty", "#Comment", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 29;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:3>Time:1>Description_Helper:1>Description:0>#Other:0
  function matchTokenAt_30(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      endRule(context, 'Description');
      build(context, token);
      return 31;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Description');
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Other(context, token)) {
      build(context, token);
      return 30;
    }
    
    var stateComment = "State: 30 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:3>Time:1>Description_Helper:1>Description:0>#Other:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Other"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 30;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:3>Time:1>Description_Helper:2>#Comment:0
  function matchTokenAt_31(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 31;
    }
    if(match_TimeLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'Time');
      build(context, token);
      return 29;
    }
    if(match_SynchronizedLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'Synchronized');
      build(context, token);
      return 32;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Time');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Time');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 31;
    }
    
    var stateComment = "State: 31 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:3>Time:1>Description_Helper:2>#Comment:0";
    token.detach();
    var expectedTokens = ["#EOF", "#Comment", "#TimeLine", "#SynchronizedLine", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 31;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:4>Synchronized:0>#SynchronizedLine:0
  function matchTokenAt_32(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RampUpLine(context, token)) {
      endRule(context, 'Synchronized');
      startRule(context, 'RampUp');
      build(context, token);
      return 33;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'Synchronized');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'Synchronized');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'Synchronized');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 32;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 32;
    }
    
    var stateComment = "State: 32 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:4>Synchronized:0>#SynchronizedLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RampUpLine", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 32;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:5>RampUp:0>#RampUpLine:0
  function matchTokenAt_33(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RampDownLine(context, token)) {
      endRule(context, 'RampUp');
      startRule(context, 'RampDown');
      build(context, token);
      return 34;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'RampUp');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'RampUp');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 33;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 33;
    }
    
    var stateComment = "State: 33 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:5>RampUp:0>#RampUpLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RampDownLine", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 33;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:6>RampDown:0>#RampDownLine:0
  function matchTokenAt_34(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_RandomWaitLine(context, token)) {
      endRule(context, 'RampDown');
      startRule(context, 'RandomWait');
      build(context, token);
      return 35;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'RampDown');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 34;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 34;
    }
    
    var stateComment = "State: 34 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:6>RampDown:0>#RampDownLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#RandomWaitLine", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 34;
  }


  // SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:7>RandomWait:0>#RandomWaitLine:0
  function matchTokenAt_35(token, context) {
    if(match_EOF(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      endRule(context, 'Plan');
      build(context, token);
      return 36;
    }
    if(match_TagLine(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Tags');
      build(context, token);
      return 6;
    }
    if(match_SimulationLine(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation');
      build(context, token);
      return 7;
    }
    if(match_SimulationPeriodLine(context, token)) {
      endRule(context, 'RandomWait');
      endRule(context, 'SimulationPeriod');
      endRule(context, 'Simulation_Definition');
      startRule(context, 'Simulation_Definition');
      startRule(context, 'SimulationPeriod');
      build(context, token);
      return 20;
    }
    if(match_Comment(context, token)) {
      build(context, token);
      return 35;
    }
    if(match_Empty(context, token)) {
      build(context, token);
      return 35;
    }
    
    var stateComment = "State: 35 - SaladDocument:0>Plan:1>Simulation_Definition:1>__alt0:1>SimulationPeriod:7>RandomWait:0>#RandomWaitLine:0";
    token.detach();
    var expectedTokens = ["#EOF", "#TagLine", "#SimulationLine", "#SimulationPeriodLine", "#Comment", "#Empty"];
    var error = token.isEof ?
      Errors.UnexpectedEOFException.create(token, expectedTokens, stateComment) :
      Errors.UnexpectedTokenException.create(token, expectedTokens, stateComment);
    if (self.stopAtFirstError) throw error;
    addError(context, error);
    return 35;
  }



  function match_EOF(context, token) {
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_EOF(token);
    });
  }


  function match_Empty(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Empty(token);
    });
  }


  function match_Comment(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Comment(token);
    });
  }


  function match_TagLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_TagLine(token);
    });
  }


  function match_PlanLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_PlanLine(token);
    });
  }


  function match_SimulationLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_SimulationLine(token);
    });
  }


  function match_SimulationPeriodLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_SimulationPeriodLine(token);
    });
  }


  function match_SynchronizedLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_SynchronizedLine(token);
    });
  }


  function match_TimeLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_TimeLine(token);
    });
  }


  function match_GroupLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_GroupLine(token);
    });
  }


  function match_DocStringSeparator(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_DocStringSeparator(token);
    });
  }


  function match_TableRow(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_TableRow(token);
    });
  }


  function match_Language(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Language(token);
    });
  }


  function match_CountLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_CountLine(token);
    });
  }


  function match_RandomWaitLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_RandomWaitLine(token);
    });
  }


  function match_RunnersLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_RunnersLine(token);
    });
  }


  function match_RampUpLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_RampUpLine(token);
    });
  }


  function match_RampDownLine(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_RampDownLine(token);
    });
  }


  function match_Other(context, token) {
    if(token.isEof) return false;
    return handleExternalError(context, false, function () {
      return context.tokenMatcher.match_Other(token);
    });
  }



}