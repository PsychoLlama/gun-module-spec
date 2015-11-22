# Gun module spec

Test your modules against [the specification](https://github.com/PsychoLlama/extending-gun/blob/master/wire.md)

Get started by running `npm install gun-module-spec`. If you don't want to use jasmine, that's okay. There are two ways to run these tests:

- either include them in your existing jasmine tests
- or tune the `config.js` file and run `npm test`.
You'll never have to touch jasmine this way.

### Including it in a project

First, `require` the spec module. We'll need to
specify what thing we're testing, so we send in
a new instance of your module inside an object.
That will return the tests for that module, which
we plug into a jasmine `describe` function...

```javascript
// grab the config function
var config = require('gun-module-spec')

// make a new instance and
// set it as "module"
var tests = config({
	module: new Gun()
})

// pass the tests into a describe statement
describe('your module name', tests)
```

Boom, done. You're now testing against the official spec!

### Running with npm

If you use a different test framework or don't
want to include these tests with your own, you can
run them out of the way by setting them up in the
`config.js` file. If you downloaded from npm, you'll
find it here:
```
./node_modules/gun-module-spec/config.js
```
Inside that file, you'll tell jasmine where
to find your module and what it should call it.
Inside the file you'll find clear instructions
and examples, should you need them.

Once you've set the configuration, give it a go
by running `npm test` inside the `gun-module-spec`
directory. You're done!

## Final words

Thanks for checking out this project! If you have any
issues, tests you want to see, features, etc., feel free
to submit an issue or pull request.

Good luck!
