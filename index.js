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
  use: wrapper(ansi.dim),
  definition: wrapper(ansi.bold, { open: '"', close: '"' }),
  reference: wrapper({ open: '[Reference: ', close: ']' }),
  blank: wrapper({ open: '[____', close: '____]' }) }

var insertion = wrapper(ansi.underline, ansi.bgGreen)
var deletion = wrapper(ansi.strikethrough, ansi.bgRed)

function editStyle(element) {
  if (element.deleted) {
    return deletion }
  else if (element.inserted) {
    return insertion }
  else {
    return id } }

function stringify(diff) {
  return childString({ heading: [ ], form: diff }, 0) }

function contentString(content) {
  var returned = ''
  Object.keys(styles)
    .forEach(function(key) {
      if (content.hasOwnProperty(key)) {
        returned += styles[key](content[key]) } })
  return editStyle(content)(returned) }

var INDENT = '    '

var CONSPICUOUS = '[CONSPICUOUS:]'

var CHANGED = '*'

function childString(child, depth) {
  var returned = ( ( hasEdit(child) ? CHANGED : '' ) + ' ' )
  returned += INDENT.repeat(depth)
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

function wrapper(/* style1, style2 ... */) {
  var styles = Array.prototype.slice.call(arguments)
  return function(argument) {
    return styles
      .reduce(
        function(returned, style) {
          return ( style.open + returned + style.close ) },
        argument) } }

function hasEdit(child) {
  return [ ]
    .concat(child.heading)
    .concat(child.form.conspicuous)
    .concat(child.form.content)
    .some(function(element) {
      return (
        element.hasOwnProperty('deleted') ||
        element.hasOwnProperty('inserted') ) }) }
