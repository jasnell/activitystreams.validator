
var moment = require('moment');

exports.validate = function(key, value, reporter, context) {
  if (typeof value !== 'string') {
    reporter(null,{message: 'Date-time values MUST be RFC3339 date-time Strings [key: %s, was: %s]'},key,typeof value);
    return false;
  }
  try {
    var answer = moment(value,moment.ISO_8601).isValid();
    if (!answer)
      reporter(null,{message: 'Invalid RFC3339 date-time [key: %s, was: %s]'},key,value);
    return answer;
  } catch (err) {
    reporter(null,{message: 'Invalid RFC3339 date-time [key: %s, was: %s]'},key,value);
    return false;
  }
}