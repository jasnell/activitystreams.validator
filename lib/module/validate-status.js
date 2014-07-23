
var valid_values = ['active','canceled','completed','pending','tentative','voided'];

exports.validate = function(key, value, reporter, context) {
  if (typeof value !== 'string') {
    reporter(null, {message:"Status MUST be a string [key: %s, was: %s]"}, key, typeof value);
    return false;
  }
  if (valid_values.indexOf(value) === -1)
    reporter(null, {type:'warning',message:'Status MUST be one of [%s] [key: %s, was: %s]'}, valid_values.join(','), key, value);
  return true;
}