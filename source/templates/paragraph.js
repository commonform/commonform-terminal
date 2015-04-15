var chalk = require('chalk');
var run = require('./run');

var TAB = '    ';

module.exports = function(paragraph, numberStyle) {
  var number = paragraph.hasOwnProperty('numbering') ?
    paragraph.numbering : '';
  var conspicuous = paragraph.hasOwnProperty('conspicuous');
  return new Array(paragraph.depth * 4 + 1).join(' ') +
    (number ?
      chalk.gray(numberStyle(number)) + TAB : '') +
    (paragraph.hasOwnProperty('heading') ?
      chalk.blue.underline(paragraph.heading) + '. ' : '') +
    paragraph.content.map(function(element) {
      return run(element, numberStyle, conspicuous);
    }).join('') +
    '\n\n';
};
