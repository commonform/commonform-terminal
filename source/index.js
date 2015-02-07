var validate = require('commonform-validate');

var doc = require('./templates/document');

module.exports = function(project) {
  if (!validate.project(project)) {
    throw new Error('Invalid project');
  }
  process.stdout.end(doc(project));
};

module.exports.version = '0.1.0';
