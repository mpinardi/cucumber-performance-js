import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import { promisify } from 'bluebird'
import ConfigurationBuilder from './configuration_builder'
import fsExtra from 'fs-extra'
import path from 'path'
import tmp from 'tmp'

const outputFile = promisify(fsExtra.outputFile)

describe('Configuration', () => {
  beforeEach(async function() {
    this.tmpDir = await promisify(tmp.dir)({ unsafeCleanup: true })
    await promisify(fsExtra.mkdirp)(path.join(this.tmpDir, 'features'))
    this.argv = ['path/to/node', 'path/to/cucumber-perf.js']
    this.configurationOptions = {
      argv: this.argv,
      cwd: this.tmpDir,
    }
  })

  describe('no argv', () => {
    beforeEach(async function() {
      this.result = await ConfigurationBuilder.build(this.configurationOptions)
    })

    it('returns the default configuration', function() {
      expect(this.result).to.eql({
        featureDefaultLanguage: '',
        featurePaths: [],
        formatOptions: {
          cwd: this.tmpDir,
        },
        formats: [{ outputTo: '', type: '' }],
        listI18nKeywordsFor: '',
        listI18nLanguages: false,
        order: 'defined',
        perfFormatOptions: {
          cwd: this.tmpDir},
        perfFormats: [
          {
            options:[],
            type: "statistics",
            outputTo:''
          }
        ],
        perfRuntimeOptions: {
          dryRun: false,
          strict: true
        },
        pickleFilterOptions: {
          featurePaths: ['features/**/*.feature'],
          names: [],
          tagExpression: '',
        },
        planPaths: [],
        planDefaultLanguage: "",
        profiles: [],
        runtimeOptions: {
          dryRun: false,
          failFast: false,
          filterStacktraces: true,
          strict: true,
          worldParameters: {},
        },
        shouldExitImmediately: false,
        supportCodePaths: [],
        supportCodeRequiredModules: [],
        veggieFilterOptions: {
          planPaths: ["plans/**/*.plan"],
          names: [],
          tagExpression: "",
        },
      })
    })
  })

  describe('path to a feature', () => {
    beforeEach(async function() {
      this.relativeFeaturePath = path.join('features', 'a.feature')
      this.featurePath = path.join(this.tmpDir, this.relativeFeaturePath)
      await outputFile(this.featurePath, '')
      this.supportCodePath = path.join(this.tmpDir, 'features', 'a.js')
      await outputFile(this.supportCodePath, '')
      this.argv.push(this.relativeFeaturePath)
      this.result = await ConfigurationBuilder.build(this.configurationOptions)
    })

    it('returns the appropriate feature and support code paths', async function() {
      const {
        featurePaths,
        pickleFilterOptions,
        supportCodePaths,
      } = this.result
      expect(featurePaths).to.eql([this.featurePath])
      expect(pickleFilterOptions.featurePaths).to.eql([
        this.relativeFeaturePath,
      ])
      expect(supportCodePaths).to.eql([this.supportCodePath])
    })
  })

  describe('path to a nested feature', () => {
    beforeEach(async function() {
      this.relativeFeaturePath = path.join('features', 'nested', 'a.feature')
      this.featurePath = path.join(this.tmpDir, this.relativeFeaturePath)
      await outputFile(this.featurePath, '')
      this.supportCodePath = path.join(this.tmpDir, 'features', 'a.js')
      await outputFile(this.supportCodePath, '')
      this.argv.push(this.relativeFeaturePath)
      this.result = await ConfigurationBuilder.build(this.configurationOptions)
    })

    it('returns the appropriate feature and support code paths', async function() {
      const {
        featurePaths,
        pickleFilterOptions,
        supportCodePaths,
      } = this.result
      expect(featurePaths).to.eql([this.featurePath])
      expect(pickleFilterOptions.featurePaths).to.eql([
        this.relativeFeaturePath,
      ])
      expect(supportCodePaths).to.eql([this.supportCodePath])
    })
  })

  describe('perf formatters', () => {
    it('adds a default', async function() {
      const formats = await getFormats(this.configurationOptions)
      expect(formats).to.eql([{options:[], type: 'statistics', outputTo:'' }])
    })

    it('splits relative unix paths', async function() {
      this.argv.push('-f', '../custom/formatter:../formatter/output.txt')
      const formats = await getFormats(this.configurationOptions)

      expect(formats).to.eql([
        {options:[], type: 'statistics', outputTo:''},
        { options:[], type: '../custom/formatter', outputTo:'../formatter/output.txt' },
      ])
    })

    it('splits absolute unix paths', async function() {
      this.argv.push('-f', '/custom/formatter:/formatter/output.txt')
      const formats = await getFormats(this.configurationOptions)

      expect(formats).to.eql([
        {options:[], type: 'statistics', outputTo:'' },
        { options:[], type: '/custom/formatter', outputTo:'/formatter/output.txt' },
      ])
    })

    it('splits absolute windows paths', async function() {
      this.argv.push('-f', 'C:\\custom\\formatter:D:\\formatter\\output.txt')
      const formats = await getFormats(this.configurationOptions)

      expect(formats).to.eql([
        {options:[], type: 'statistics', outputTo:'' },
        {
          outputTo: 'D:\\formatter\\output.txt',
          type: 'C:\\custom\\formatter',
          options:[]
        },
      ])
    })

    it('does not split absolute windows paths without an output', async function() {
      this.argv.push('-f', 'C:\\custom\\formatter')
      const formats = await getFormats(this.configurationOptions)

      expect(formats).to.eql([{ options:[], type: 'statistics', outputTo:'' },{options:[], type: 'C:\\custom\\formatter', outputTo:'' }])
    })

    async function getFormats(options) {
      const result = await ConfigurationBuilder.build(options)
      return result.perfFormats
    }
  })
})