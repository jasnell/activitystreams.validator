
var validate_iri = require('./validate-iri'),
    validate_link_value = require('./validate-link-value');


exports.validate = function(key, value, reporter, context) {
  var answer = true;
  if (typeof value !== 'object') {
    reporter(null,{message:'Actions MUST be an object [key: %s, was: %s]'},key,typeof value);
    answer = false;
  } else if (Array.isArray(value)) {
    reporter(null,{message:'Actions MUST be an object [key: %s, was: %s]'},key,'array');
    answer = false;
  } else {
    var keys = Object.getOwnPropertyNames(value);
    keys.forEach(function(verb) {
      var a = validate_iri.validate(verb,verb,reporter,context);
      if (!a) {
        answer = false;
      } else {
        var a = validate_link_value.validate(verb,value[verb],reporter,context);
        if (!a) {
          reporter(null,{message:'Actions object values MUST be valid Link Values [key: %s]'},verb);
          answer = false;
        }
      }
    });
  }
  return answer;
}