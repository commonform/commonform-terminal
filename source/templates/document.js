var decimalStyle = require('commonform-decimal-numbers');
var flatten = require('commonform-flatten');
var number = require('commonform-number');
var resolve = require('commonform-resolve');

var paragraph = require('./paragraph');

module.exports = function(form, values) {
  var form = form;
  var resolved = resolve(form, values);
  var flattened = flatten(resolved);
  return flattened.map(function(element) {
    return paragraph(element, decimalStyle);
  }).join('');
};
