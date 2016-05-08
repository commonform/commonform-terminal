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
module.exports = stringify

var ansi = require('ansi-styles')

var styles = {
  word: id,
  use: wrap(ansi.blue),
  definition: wrap(ansi.green),
  reference: wrap(ansi.red),
  blank: id }

function stringify(diff) {
  return childString({ heading: [ ], form: diff }, 0) }

function contentString(content) {
  var returned = ''

  var wrapper = id
  if (content.hasOwnProperty('deleted')) {
    wrapper = wrap(ansi.strikethrough) }
  else if (content.hasOwnProperty('inserted')) {
    wrapper = wrap(ansi.underline) }

  Object.keys(styles)
    .forEach(function(key) {
      if (content.hasOwnProperty(key)) {
        returned += styles[key](
          ( key === 'blank'
              ? '[________]'
              : content[key] )) } })

  return wrapper(returned) }

var INDENT = '    '

function childString(child, depth) {
  var returned = INDENT.repeat(depth)
  if (child.heading.length !== 0) {
    returned += wrap(ansi.bold)(
      child.heading
        .map(function(element) {
          return contentString(element) })
        .join('') +
      ' ') }
  returned += child.form.content
    .map(function(element) {
      if (element.hasOwnProperty('form')) {
        return ( '\n\n' + childString(element, ( depth + 1 )) ) }
      else {
        return contentString(element, process.stdout) } })
      .join('')
  return returned }

function id(x) {
  return x }

function wrap(style) {
  return function(argument) {
    return ( style.open + argument + style.close ) } }
