/********************************************************
 * Validate a Type Value
 ********************************************************/

var validate_object = require('./validate-object'), 
    validate_iri = require('./validate-iri');

var errs = {
  ERR0001: {
    message: "Type Value's MUST be either absolute IRI strings or Objects [Key: %s, Was: %s]"
  },
  ERR0002: {
    message: "Type Value's that are Objects MUST contain the 'id' or '@id' attribute [Key: %s]"
  }
};

exports.validate = function(key, value, reporter, context) {
  try {
    var answer = true;
    if (typeof value === 'string') {
      answer = validate_iri.validate(key, value, reporter, context);
    } else if (Array.isArray(value)) {
      reporter(null,errs.ERR0001, key, 'array');
      answer = false;
    } else if (typeof value === 'object') {
      if (context.isUndefinedOrNull(value['id'] || value['@id'])) {
        reporter(null,errs.ERR0002, key);
        answer = false;
      } else {
        answer = validate_object.validate(key, value, reporter, context);
      }
    } else {
      reporter(null,errs.ERR0001, key, typeof value);
      answer = false;
    }
    return answer;
  } catch (err) {
    reporter(err);
  }
}

