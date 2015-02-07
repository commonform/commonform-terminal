var validate = require('commonform-validate');

var doc = require('./templates/document');

module.exports = function(project) {
  if (!validate.project(project)) {
    throw new Error('Invalid project');
  }
  return doc(project);
};

module.exports.version = '0.1.1';
