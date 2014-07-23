/********************************************************
 * Validate a Media Type
 ********************************************************/

var mt = require('media-type');

var errs = {
  ERR0001: {
    message: "Invalid media type [key: %s, was: %s]"
  }
}

 exports.validate = function(key, value, reporter, context) {
  try {
    if (typeof value === 'string') {
      var m = mt.fromString(value);
      if (m.isValid()) 
        return true;
    }
    reporter(null,errs.ERR0001,key,value);
    return false;
  } catch (err) {
    reporter(null,errs.ERR0001,key,value);
  }
 }