/********************************************************
 * Validate a Language Tag
 ********************************************************/

var langtag = require('language-tags');

var errs = {
  ERR0001: {
    message: 'Invalid Language Tag [Key: %s, Was: %s]'
  }
};

exports.validate = function(key, value, reporter, context) {
  try {
    var answer = langtag.check(value);
    if (!answer) reporter(null,errs.ERR0001, key, value);
    return answer;
  } catch (err) {
    reporter(null,errs.ERR0001, key, value);
  }
}