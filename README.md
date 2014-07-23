To install:

```javascript
var validator = require('activitystreams.validator');

var result = validator.validate({
  id: 'foo',
  displayName: 'this won't be valid'
});

console.log(result);
```

By default, the validation information will be printed to the console.