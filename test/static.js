var mocha = require('mocha')
var assert = require('assert')
var describe = mocha.describe
var it = mocha.it

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
})
