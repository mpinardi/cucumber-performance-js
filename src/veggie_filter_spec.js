import { beforeEach, describe, it } from 'mocha'
import { expect } from 'chai'
import VeggieFilter from './veggie_filter'

describe('VeggieFilter', () => {
  describe('matches', () => {
    beforeEach(function() {
      this.input = {
        veggie: {
          locations: [],
          name: '',
          tags: [],
        },
        uri: '',
      }
    })

    describe('no filters', () => {
      beforeEach(function() {
        this.VeggieFilter = new VeggieFilter({
          planPaths: ['plans'],
          names: [],
          tagExpressions: [],
        })
      })

      it('returns true', function() {
        expect(this.VeggieFilter.matches(this.input)).to.eql(true)
      })
    })

    describe('line filters', () => {
      beforeEach(function() {
        this.VeggieFilter = new VeggieFilter({
          planPaths: ['plans/a.plan', 'plans/b.plan:1:2'],
          names: [],
          tagExpressions: [],
        })
      })

      describe('scenario in plan without line specified', () => {
        beforeEach(function() {
          this.input.uri = 'plans/a.plan'
        })

        it('returns true', function() {
          expect(this.VeggieFilter.matches(this.input)).to.eql(true)
        })
      })

      describe('scenario in plan with line specified', () => {
        beforeEach(function() {
          this.input.uri = 'plans/b.plan'
        })

        describe('scenario line matches', () => {
          beforeEach(function() {
            this.input.veggie.locations = [{ line: 1 }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario line does not match', () => {
          beforeEach(function() {
            this.input.veggie.locations = [{ line: 3 }]
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })

      describe('scenario line using current directory path representation', () => {
        beforeEach(function() {
          this.input.uri = './plans/b.plan'
        })

        describe('scenario line matches', () => {
          beforeEach(function() {
            this.input.veggie.locations = [{ line: 1 }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario line does not match', () => {
          beforeEach(function() {
            this.input.veggie.locations = [{ line: 3 }]
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })
    })

    describe('name filters', () => {
      describe('should match name A', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans'],
            names: ['nameA'],
            tagExpressions: [],
          })
        })

        describe('scenario name matches A', () => {
          beforeEach(function() {
            this.input.veggie.name = 'nameA descriptionA'
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario name does not match A', () => {
          beforeEach(function() {
            this.input.veggie.name = 'nameB descriptionB'
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })

      describe('should match name A or B', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans'],
            names: ['nameA', 'nameB'],
            tagExpressions: [],
          })
        })

        describe('scenario name matches A', () => {
          beforeEach(function() {
            this.input.veggie.name = 'nameA descriptionA'
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario name matches B', () => {
          beforeEach(function() {
            this.input.veggie.name = 'nameB descriptionB'
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario name does not match A or B', () => {
          beforeEach(function() {
            this.input.veggie.name = 'nameC descriptionC'
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })
    })

    describe('tag filters', () => {
      describe('should have tag A', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans'],
            names: [],
            tagExpression: '@tagA',
          })
        })

        describe('scenario has tag A', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagA' }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario does not have tag A', () => {
          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })

      describe('should not have tag A', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans'],
            names: [],
            tagExpression: 'not @tagA',
          })
        })

        describe('scenario has tag A', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagA' }]
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })

        describe('scenario does not have tag A', () => {
          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })
      })

      describe('should have tag A and B', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans'],
            names: [],
            tagExpression: '@tagA and @tagB',
          })
        })

        describe('scenario has tag A and B', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagA' }, { name: '@tagB' }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario has tag A, but not B', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagA' }]
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })

        describe('scenario has tag B, but not A', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagB' }]
          })

          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })

        describe('scenario does have tag A or B', () => {
          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })

      describe('should have tag A or B', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans'],
            names: [],
            tagExpression: '@tagA or @tagB',
          })
        })

        describe('scenario has tag A and B', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagA' }, { name: '@tagB' }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario has tag A, but not B', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagA' }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario has tag B, but not A', () => {
          beforeEach(function() {
            this.input.veggie.tags = [{ name: '@tagB' }]
          })

          it('returns true', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(true)
          })
        })

        describe('scenario does have tag A or B', () => {
          it('returns false', function() {
            expect(this.VeggieFilter.matches(this.input)).to.eql(false)
          })
        })
      })
    })

    describe('line, name, and tag filters', () => {
      beforeEach(function() {
        this.input.uri = 'plans/b.plan'
      })

      describe('scenario matches all filters', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans/b.plan:1:2'],
            names: ['nameA'],
            tagExpressions: ['@tagA'],
          })
          this.input.veggie.locations = [{ line: 1 }]
          this.input.veggie.name = 'nameA descriptionA'
          this.input.veggie.tags = [{ name: '@tagA' }]
        })

        it('returns true', function() {
          expect(this.VeggieFilter.matches(this.input)).to.eql(true)
        })
      })

      describe('scenario matches some filters', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans/b.plan:1:2'],
            names: ['nameA'],
            tagExpressions: ['tagA'],
          })
          this.input.veggie.locations = [{ line: 1 }]
        })

        it('returns false', function() {
          expect(this.VeggieFilter.matches(this.input)).to.eql(false)
        })
      })

      describe('scenario matches no filters', () => {
        beforeEach(function() {
          this.VeggieFilter = new VeggieFilter({
            planPaths: ['plans/b.plan:1:2'],
            names: ['nameA'],
            tagExpression: '@tagA',
          })
          this.input.veggie.locations = [{ line: 1 }]
        })

        it('returns false', function() {
          expect(this.VeggieFilter.matches(this.input)).to.eql(false)
        })
      })
    })
  })
})