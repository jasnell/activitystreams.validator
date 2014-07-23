var moment = require('moment');

var errs = {
  ERR0001: {
    message: "Only JSON Objects and Arrays can be validated."
  },
  WRN0001: {
    type: "warning",
    message: "Keys with explicit Null values SHOULD be omitted [Key: %s]"
  }
};

function validate(key, value, reporter, context) {
  try {
    var answer = true;
    if (typeof value !== 'object') {
      reporter(null,errs.ERR0001);
      answer = false;
    } else if (Array.isArray(value)) {
      value.forEach(function(item) {
        if (context.isUndefinedOrNull(item)) {
          reporter(null,errs.WRN0001, key);
          answer = false;
        } else if (!validate(key, item, reporter, context)) {
          answer = false;
        }
      });
    } else {
      var keys = Object.getOwnPropertyNames(value);
      keys.forEach(function(key) {
        var val = value[key];
        if (context.isUndefinedOrNull(val)) {
          reporter(null,errs.WRN0001, key);
          answer = false;
        } else if (!context.validate(key, val, reporter)) {
          answer = false;
        }
      });
    }

    return answer;
  } catch (err) {
    throw err;
    reporter(err);
  }
}

exports.validate = validate;