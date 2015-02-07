var flatten = require('commonform-flatten');
var resolve = require('commonform-resolve');
var styles = require('commonform-number');
var paragraph = require('./paragraph');

module.exports = function(project) {
  var resolved = resolve(project);
  var flattened = flatten(resolved);
  var prefs = project.preferences;
  var numberStyle;

  if (prefs.hasOwnProperty('numbering')) {
    var styleName = prefs.numbering;
    if (typeof styleName === 'string') {
      if (styles.hasOwnProperty(styleName)) {
        numberStyle = styles[styleName];
      } else {
        throw new Error('Unknown numbering style "' + styleName + '"');
      }
    } else {
      throw new Error('Invalid numbering preference');
    }
  } else {
    numberStyle = styles.default;
  }

  return flattened.flattened.map(function(element) {
    return paragraph(element, numberStyle);
  }).join('');
};
