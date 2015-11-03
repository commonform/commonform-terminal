/* Copyright Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
var chalk = require('chalk');

module.exports = function run(element, numberStyle, conspicuous) {
  if (typeof element === 'string') {
    return conspicuous ? chalk.magenta(element) : element;
  } else if (element.hasOwnProperty('definition')) {
    return '"' + chalk.green(element.definition) + '"';
  } else if (element.hasOwnProperty('use')) {
    return chalk.magenta(element.use);
  } else if (element.hasOwnProperty('blank')) {
    return chalk.red.underline('[_]');
  } else if (element.hasOwnProperty('heading')) {
    var numbering = element.numbering;
    var heading = element.heading;
    if (
      element.hasOwnProperty('broken') ||
      element.hasOwnProperty('ambiguous')
    ) {
      return chalk.yellow(heading);
    } else {
      return chalk.cyan(
        numberStyle(numbering) +
        ' (' + heading + ')'
      );
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element));
  }
};
