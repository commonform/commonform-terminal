var doc = require('./document');

module.exports = function() {
  var codes = doc.apply(this, arguments);
  return codes.slice(0, codes.length - 2);
};
