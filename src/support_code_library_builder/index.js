import _ from 'lodash'
import util from 'util'
import TransformLookupBuilder from './parameter_type_registry_builder'
import {
  buildParameterType,
  buildGroupDefinition,
  buildGroupHookDefinition,
  buildTestRunHookDefinition,
} from './build_helpers'
import { wrapDefinitions } from './finalize_helpers'

export class SupportCodeLibraryBuilder {
  constructor() {
    this.methods = {
      defineParameterType: this.defineParameterType.bind(this),
      defineGroup: this.defineGroup.bind(this),
      setDefaultTimeout: milliseconds => {
        this.options.defaultTimeout = milliseconds
      },
      setDefinitionFunctionWrapper: fn => {
        this.options.definitionFunctionWrapper = fn
      },
      setWorldConstructor: fn => {
        this.options.World = fn
      },
    }
    this.methods.Group = this.methods.defineGroup
  }

  defineParameterType(options) {
    const parameterType = buildParameterType(options)
    this.options.parameterTypeRegistry.defineParameterType(parameterType)
  }

  defineGroup(pattern, options, code) {
    const groupDefinition = buildGroupDefinition({
      pattern,
      options,
      code,
      cwd: this.cwd,
    })
    this.options.groupDefinitions.push(groupDefinition)
  }

  defineTestCaseHook(collectionName) {
    return (options, code) => {
      const hookDefinition = buildTestCaseHookDefinition({
        options,
        code,
        cwd: this.cwd,
      })
      this.options[collectionName].push(hookDefinition)
    }
  }

  defineTestRunHook(collectionName) {
    return (options, code) => {
      const hookDefinition = buildTestRunHookDefinition({
        options,
        code,
        cwd: this.cwd,
      })
      this.options[collectionName].push(hookDefinition)
    }
  }

  finalize() {
    wrapDefinitions({
      cwd: this.cwd,
      definitionFunctionWrapper: this.options.definitionFunctionWrapper,
      definitions: _.chain([
        'group',
      ])
        .map(key => this.options[`${key}Definitions`])
        .flatten()
        .value(),
    })
    return this.options
  }

  reset(cwd) {
    this.cwd = cwd
    this.options = _.cloneDeep({
      defaultTimeout: 5000,
      definitionFunctionWrapper: null,
      groupDefinitions: [],
      parameterTypeRegistry: TransformLookupBuilder.build(),
      World({ attach, parameters }) {
        this.attach = attach
        this.parameters = parameters
      },
    })
  }
}

export default new SupportCodeLibraryBuilder()