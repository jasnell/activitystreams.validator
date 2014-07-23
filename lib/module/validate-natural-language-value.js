
/********************************************************
 * Validate a Natural Language Value
 ********************************************************/

var validate_language_tag = require('./validate-language-tag');

var errs = {
  ERR0001: {
    message: 'Natural Language Values MUST be either Strings or a JSON-LD Language Map [Key: %s, Was: %s]'
  },
  ERR0002: {
    message: 'Individual Natural Language Values options MUST be Strings [Key: %s, Lang: %s, Was: %s]'
  }
};

exports.validate = function(key, value, reporter, context) {
  try {
    var answer = true;
    if (typeof value === 'object' && !Array.isArray(value)) {
      var keys = Object.getOwnPropertyNames(value);
      keys.forEach(function(tag) {
        var a = validate_language_tag.validate(key, tag, reporter, context);
        if (!a) {
          answer = false;
        } else if (typeof value[tag] !== 'string') {
          reporter(null, errs.ERR0002, key, tag, typeof value[tag]);
          answer = false;
        }
      });
    } else if (typeof value !== 'string') {
      reporter(null, errs.ERR0001, key, typeof value);
      answer = false;
    }
    return answer;
  } catch (err) {
    reporter(err);
  }
}