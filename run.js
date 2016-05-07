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
    done(conspicuous ? chalk.magenta(element) : element);
  } else if (element.hasOwnProperty('word')) {
    done(conspicuous ? chalk.magenta(element.word) : element.word);
  } else if (element.hasOwnProperty('definition')) {
    done('"' + chalk.green(element.definition) + '"');
  } else if (element.hasOwnProperty('use')) {
    return chalk.magenta(element.use);
  } else if (element.hasOwnProperty('blank')) {
    if (element.blank === undefined) {
      done(chalk.red.underline('[_]'));
    } else {
      done(chalk.red.underline('[' + element.blank + ']'));
    }
  } else if (element.hasOwnProperty('heading')) {
    var numbering = element.numbering;
    var heading = element.heading;
    if (
      element.hasOwnProperty('broken') ||
      element.hasOwnProperty('ambiguous')
    ) {
      done(chalk.yellow(heading));
    } else {
      done(chalk.cyan(
        numberStyle(numbering) +
        ' (' + heading + ')'
      ));
    }
  } else {
    throw new Error('Invalid type: ' + JSON.stringify(element));
  }
  function done(input) {
    var returned = ''
    if (element.deleted) {
      returned += chalk.styles.strikethrough.open }
    if (element.inserted) {
      returned += chalk.styles.underline.open }
    returned += input
    if (element.deleted) {
      returned += chalk.styles.strikethrough.close }
    if (element.inserted) {
      returned += chalk.styles.underline.close }
    return returned }
};
