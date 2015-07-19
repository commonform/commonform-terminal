var chalk = require('chalk');

module.exports = function run(element, numberStyle, conspicuous) {
  if (typeof element === 'string') {
    return conspicuous ? chalk.magenta(element) : element;
  } else if (element.hasOwnProperty('definition')) {
    return '"' + chalk.green(element.definition) + '"';
  } else if (element.hasOwnProperty('blank')) {
    return chalk.red.underline(element.blank);
  } else if (element.hasOwnProperty('numbering')) {
    var numbering = element.numbering;
    var heading = element.heading;
    if (
      element.hasOwnProperty('broken') ||
      element.hasOwnProperty('ambiguous')
    ) {
      return chalk.yellow(heading);
    } else {
      return chalk.cyan(
        'Section ' + numberStyle(numbering) +
        ' (' + heading + ')'
      );
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element));
  }
};
