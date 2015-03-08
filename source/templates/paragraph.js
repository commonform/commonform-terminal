var chalk = require('chalk');
var run = require('./run');

var TAB = '    ';

module.exports = function(paragraph, numberStyle) {
  var number = paragraph.has('numbering') ?
    paragraph.get('numbering').toJS() : '';
  var conspicuous = paragraph.has('conspicuous');
  return new Array(paragraph.get('depth') * 4 + 1).join(' ') +
    (number ?
      chalk.gray(numberStyle.provision(number)) + TAB : '') +
    (paragraph.has('heading') ?
      chalk.blue.underline(paragraph.get('heading')) + '. ' : '') +
    paragraph.get('content').map(function(element) {
      return run(element, numberStyle, conspicuous);
    }).join('') +
    '\n\n';
};
