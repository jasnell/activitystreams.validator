var moment = require('moment');

exports.validate = function(key, value, reporter, context) {
	if (typeof value === 'number') {
		if (value < 0)
			reporter(null,{type:'warning',message:'Duration is supposed to be a non-negative integer [key: %s, was: %s]'},key,value);
		return true;
	} else if (typeof value === 'string') {
    var m = value.match(/^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/i);
    var answer = !context.isUndefinedOrNull(m);
    if (!answer)
      reporter(null,{message:'Invalid ISO8601 duration string [key: %s, was: %s]'},key,value);
    return answer;
	} else {
		reporter(null,{message:'Duration MUST either be a non-negative integer or an ISO8601 duration'},key,typeof value);
		return false;
	}
}