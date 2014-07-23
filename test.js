var asval = require('./lib/asval');

var tests = [
  {
    result: true,
    data: {}
  },
  {
    result: true,
    data: {
      object: {
        objectType: 'urn:example:1'
      }
    }
  },
  {
    result: false,
    data: {
      object: {
        objectType: 'test/test'
      }
    }
  }
];

function test(testcase) {
  function reporter(err,info) {}
  var r = asval.validate(testcase.data, reporter);
  console.log(r==testcase.result?'.':'x');
}

tests.forEach(test);