/********************************************************
 * Validate a Type Value
 ********************************************************/

var validate_object = require('./validate-object'), 
    validate_absolute_iri = require('./validate-absolute-iri');

var errs = {
  ERR0001: {
    message: "Link Value's MUST be either absolute IRI strings, Objects or Arrays of IRI strings and Objects [Key: %s, Was: %s]"
  },
  WRN0001: {
    type: 'warning',
    message: "Link Value's SHOULD contain either an 'id', '@id' or 'url' property. A 'self' property will also work."
  }
};

function validate(key, value, reporter, context) {
  try {
    var answer = true;
    if (typeof value === 'string') {
      answer = validate_absolute_iri.validate(key, value, reporter, context);
    } else if (Array.isArray(value)) {
      value.forEach(function(item) {
        var a = validate(key, item, reporter, context);
        if (!a) answer = false;
      });
    } else if (typeof value === 'object') {
      // check for one of the following: id, url, self
      var url = value['id'] || value['@id'] || value['url'] || value['self'];
      if (typeof url === 'undefined')
        reporter(null, errs.WRN0001);
      answer = validate_object.validate(key, value, reporter, context);
    } else {
      reporter(null,errs.ERR0001, key, typeof value);
      answer = false;
    }
    return answer;
  } catch (err) {
    reporter(err);
  }
}

exports.validate = validate;