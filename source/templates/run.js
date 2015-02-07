var chalk = require('chalk');

module.exports = function run(element, numberStyle, conspicuous) {
  if (typeof element === 'string') {
    return conspicuous ? chalk.magenta(element) : element;
  } else if (element.hasOwnProperty('definition')) {
    return '"' + chalk.green(element.definition) + '"';
  } else if (element.hasOwnProperty('blank')) {
    return chalk.red.underline(element.blank);
  } else if (element.hasOwnProperty('reference')) {
    if (element.broken || element.ambiguous) {
      return chalk.yellow(element.reference);
    } else {
      return chalk.cyan(numberStyle.reference(element.reference));
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element));
  }
};
