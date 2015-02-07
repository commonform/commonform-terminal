var chalk = require('chalk');
var run = require('./run');

var TAB = '    ';

module.exports = function(paragraph, numberStyle) {
  var number = paragraph.hasOwnProperty('numbering') ?
    paragraph.numbering : '';
  var conspicuous = paragraph.conspicuous === 'true';
  return new Array(paragraph.depth * 4 + 1).join(' ') +
    (number ?
      chalk.gray(numberStyle.provision(number)) + TAB : '') +
    (paragraph.summary ?
      chalk.blue.underline(paragraph.summary) + '. ' : '') +
    paragraph.flattened.map(function(element) {
      return run(element, numberStyle, conspicuous);
    }).join('') +
    '\n\n';
};
