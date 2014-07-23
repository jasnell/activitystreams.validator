
var iri = require('iri');

var errs = {
  ERR0001: {
    message: "Aliases MUST be strings [key: %s, was: %s]"
  },
  ERR0002: {
    message: "Aliases MUST either be absolute IRIs or isegment-nz-nc tokens [key: %s, was: %s]"
  }
};

exports.validate = function(key, value, reporter, context) {
  var answer = true;
  if (typeof value !== 'string') {
    reporter(null,errs.ERR0001,key,typeof value);
    answer = false;
  } else {
    var i = new iri.IRI(value);
    if (!i.isAbsolute()) {
      var path = i.path();
      answer = path.indexOf('/') === -1;
      if (!answer)
        reporter(null,errs.ERR0002,key,value);
    }
  }
  return answer;
}