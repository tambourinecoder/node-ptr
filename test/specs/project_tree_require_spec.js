/* jshint -W068 */
"use strict";

var join = require('path').join
  , ptr


function requirePtr() {
  var ptrPath = join(process.cwd(), 'lib/project_tree_require')
    , cacheKey = require.resolve(ptrPath)

  delete require.cache[cacheKey]
  ptr = require(ptrPath)
}


describe('ProjectTreeRequire', function() {
  beforeEach(requirePtr)

  describe('.root', function() {
    it('allows for fluid interfaces', function() {
      ptr.root('other/root').should.equal(ptr)
    })

    it('does not blow up when called without arguments', function() {
      (function() { ptr.root() }).should.not.throw()
    })
  })

  describe('.configure', function() {
    it('allows for fluid interfaces', function() {
      ptr.configure({}).should.equal(ptr)
    })

    it('does not blow up when called without arguments', function() {
      (function() { ptr.configure() }).should.not.throw()
    })
  })


  describe('.relative', function() {
    it('requires modules relative to the cwd (default)', function() {
      ptr.relative('test/fixtures/foo').should.equal('foo module')
    })

    it('requires modules relative to a specified root', function() {
      ptr.root(__dirname + '/..')
      ptr.relative('fixtures/foo').should.equal('foo module')
    })

    it('throws an error when the module does not exist', function() {
      (function() { ptr.relative('non-existing') })
        .should.throw(/^Cannot find module.*non-existing/)
    })
  })

  describe('custom subdir methods', function() {
    beforeEach(function() {
      ptr.configure({ myFixtures: 'test/fixtures', myFooDir: 'test/fixtures/foo' })
    })

    it('requires modules relative to the cwd / custom subdir (default)', function() {
      ptr.myFixtures('foo').should.equal('foo module')
    })

    it('requires modules relative to a specified root / custom subdir', function() {
      ptr.root(__dirname + '/..').configure({ myFixtures: 'fixtures' })
      ptr.myFixtures('foo').should.equal('foo module')
    })

    it('can be called with no arguments', function() {
      ptr.myFooDir().should.equal('foo module')
    })

    it('throws an error when the module does not exist', function() {
      (function() { ptr.myFixtures('non-existing') })
        .should.throw(/^Cannot find module.*non-existing/)
    })
  })
})
