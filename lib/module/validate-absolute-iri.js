/*******************************************
 * Validate Absolute IRI 
 *******************************************/

var iri = require('iri');

var errs = {
  ERR0001: {
    message: "IRI Value MUST be a String [Key: %s, Expected: %s, Was: %s]"
  },
  ERR0002: {
    message: "IRI Value MUST be absolute [Key: %s, Was: %s]"
  }
}

exports.validate = function(key, value, reporter, context) {
  try {
    if (typeof value !== 'string') {
      reporter(
        null,
        errs.ERR0001,
        key,
        'string', 
        value === null ? 
          null : 
          typeof value);
      return false;
    }
    var test = new iri.IRI(value);
    if (!test.isAbsolute()) {
      reporter(
        null,
        errs.ERR0002,
        key, 
        value);
      return false;
    }
    return true;
  } catch (err) {
    reporter(err);
  }
}