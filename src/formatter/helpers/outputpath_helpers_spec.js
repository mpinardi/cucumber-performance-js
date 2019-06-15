import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import { getPathWithPrefix } from './outputpath_helpers'

describe('OutputPath Helpers', () => {
  describe('formatPath', () => {
    describe('numbers', () => {
      beforeEach(function() {
        this.result = getPathWithPrefix({
          outputTo: 'C:/test/summary|#1.text',
          count: 2,
        })
      })

      it('path is correctly formated', function() {
        expect(this.result).to.eql('C:/test/summary2.text')
      })
    })
    describe('padded numbers', () => {
      beforeEach(function() {
        this.result = getPathWithPrefix({
          outputTo: 'C:/test/summary|#0001.text',
          count: 2,
        })
      })
      it('path is correctly formated', function() {
        expect(this.result).to.eql('C:/test/summary0002.text')
      })
    })
    describe('2 padded numbers', () => {
      beforeEach(function() {
        this.result = getPathWithPrefix({
          outputTo: 'C:/test/summary|#0001#01.text',
          count: 2,
        })
      })
      it('path is correctly formated', function() {
        expect(this.result).to.eql('C:/test/summary000202.text')
      })
    })
    describe('2 padded numbers with seperator _', () => {
      beforeEach(function() {
        this.result = getPathWithPrefix({
          outputTo: 'C:/test/summary|#0001_#01.text',
          count: 2,
        })
      })
      it('path is correctly formated', function() {
        expect(this.result).to.eql('C:/test/summary0002_02.text')
      })
    })
    describe('2 padded numbers with seperator -', () => {
      beforeEach(function() {
        this.result = getPathWithPrefix({
          outputTo: 'C:/test/summary|#0001-#01.text',
          count: 2,
        })
      })
      it('path is correctly formated', function() {
        expect(this.result).to.eql('C:/test/summary0002-02.text')
      })
    })
  })
})
