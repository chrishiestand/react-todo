/** @jsx React.DOM */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');

var TodoApp        = require('../js/todo');

var assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})


describe('TodoApp', function () {
  it('Should have class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <todoApp />
        );
    assert.ok(instance.getDOMNode().className.match(/\btodoApp\b/));
  });
