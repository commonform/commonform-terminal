var chalk = require('chalk');

module.exports = function run(element, numberStyle, conspicuous) {
  if (typeof element === 'string') {
    return conspicuous ? chalk.magenta(element) : element;
  } else if (element.hasOwnProperty('definition')) {
    return '"' + chalk.green(element.definition) + '"';
  } else if (element.hasOwnProperty('blank')) {
    return chalk.red.underline(element.blank);
  } else if (element.hasOwnProperty('reference')) {
    var reference = element.reference;
    if (
      element.hasOwnProperty('broken') ||
      element.hasOwnProperty('ambiguous')
    ) {
      return chalk.yellow(reference);
    } else {
      return chalk.cyan(numberStyle.reference(reference));
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element));
  }
};
