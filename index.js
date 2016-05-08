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
  use: wrapper(ansi.grey),
  definition: wrapper(ansi.green),
  reference: wrapper(ansi.red),
  blank: id }

var underline = wrapper(ansi.underline)
var strike = wrapper(ansi.strikethrough)

function editStyle(element) {
  if (element.deleted) {
    return strike }
  else if (element.inserted) {
    return underline }
  else {
    return id } }

function stringify(diff) {
  return childString({ heading: [ ], form: diff }, 0) }

function contentString(content) {
  var returned = ''
  Object.keys(styles)
    .forEach(function(key) {
      if (content.hasOwnProperty(key)) {
        returned += styles[key](
          ( key === 'blank'
              ? '[________]'
              : content[key] )) } })
  return editStyle(content)(returned) }

var INDENT = '    '

var CONSPICUOUS = '[CONSPICUOUS:]'

function childString(child, depth) {
  var returned = INDENT.repeat(depth)
  if (child.heading.length !== 0) {
    returned += wrapper(ansi.bold)(
      child.heading.map(contentString).join('') + '. ') }
  var form = child.form
  var conspicuous = form.conspicuous
  if (conspicuous.length !== 0) {
    returned += editStyle(conspicuous[0])(CONSPICUOUS) }
  returned += form.content
    .map(function(element) {
      return (
        element.hasOwnProperty('form')
          ? ( '\n\n' + childString(element, ( depth + 1 )) )
          : contentString(element) ) })
    .join('')
  return returned }

function id(x) {
  return x }

function wrapper(style) {
  return function(argument) {
    return ( style.open + argument + style.close ) } }
