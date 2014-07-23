
exports.validate = function(key, value, reporter, context) {
  if (typeof value !== 'number') {
    reporter(null,{message:"Priority value MUST be a number [key: %s, was: %s]"},key,typeof value);
    return false;
  }
  if (value < 0 || value > 1)
    reporter(null,{type:'warning',message:"Priority is supposed to be a number between 0.00 and 1.00 [key: %s, was: %s]"},key,value);
  return true;
}