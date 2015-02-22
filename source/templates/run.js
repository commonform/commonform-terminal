var chalk = require('chalk');

module.exports = function run(element, numberStyle, conspicuous) {
  if (typeof element === 'string') {
    return conspicuous ? chalk.magenta(element) : element;
  } else if (element.has('definition')) {
    return '"' + chalk.green(element.get('definition')) + '"';
  } else if (element.has('blank')) {
    return chalk.red.underline(element.get('blank'));
  } else if (element.has('reference')) {
    var reference = element.get('reference');
    if (element.has('broken') || element.has('ambiguous')) {
      return chalk.yellow(reference);
    } else {
      return chalk.cyan(numberStyle.reference(reference.toJS()));
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element));
  }
};
