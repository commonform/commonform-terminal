/* Copyright Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
var chalk = require('chalk')
var run = require('./run')

var TAB = '    '

module.exports = function (paragraph, numberStyle) {
  var number = paragraph.hasOwnProperty('numbering')
      ? paragraph.numbering
      : ''
  var conspicuous = paragraph.hasOwnProperty('conspicuous')
  return new Array(paragraph.depth * 4 + 1).join(' ') +
    (number ? chalk.gray(numberStyle(number)) + TAB : '') +
    (
      paragraph.hasOwnProperty('heading')
        ? chalk.blue.underline(paragraph.heading) + '. '
      : ''
    ) +
    paragraph.content.map(function (element) {
      return run(element, numberStyle, conspicuous)
    }).join('') +
    '\n\n'
}
