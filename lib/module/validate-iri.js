var iri = require('iri');

var errs = {
  ERR0001: {
    message: "%s MUST be a string[key: %s, was: %s]"
  },
  ERR0002: {
    message: "%s MUST either be an absolute IRI or isegment-nz-nc token [key: %s, was: %s]"
  }
};

exports.validate = function(key, value, reporter, context) {
  var answer = true;
  if (typeof value !== 'string') {
    reporter(null,errs.ERR0001,key,key,typeof value);
    answer = false;
  } else {
    var i = new iri.IRI(value);
    if (!i.isAbsolute()) {
      var path = i.path();
      answer = path.indexOf('/') === -1;
      if (!answer)
        reporter(null,errs.ERR0002,key,key,value);
    }
  }
  return answer;
}