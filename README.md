# Gun module spec
Test your modules against [the specification](https://github.com/PsychoLlama/extending-gun/blob/master/wire.md)

> **note:** these tests are written for gun v0.3

## Getting Started
In your terminal, run

`$ npm install gun-module-spec --save-dev`

The tests use jasmine, though if you don't, that's okay. There are two ways to run these tests:

- either `require` them in your other jasmine tests
- or tune the `config.js` file and run `npm test`.
You'll never have to touch jasmine this way.

### Including it in a project

First, `require` the spec module. We'll need to
specify what thing we're testing, so we send in
a new instance of your module inside an object.
That will return the tests for that module, which
we plug into a jasmine `describe` function...

```javascript
// ... jasmine tests


// Grab the spec function
var test = require('gun-module-spec')

// Pass the name of your module
// then the Gun constructor
// and any [optional] arguments you want to pass to Gun
test('My module name', Gun, {
	'gun options': {
		to: 'pass'
	}
})

// Done! Your module will be tested.
```

### Running with npm
You can run your test by going to `node_modules/gun-module-spec`
and running `$ npm test`. Since the tests need setup information
about your module, there is a file it will look in: `config.js`.

```javascript
module.exports = {
	// the constructor
	Gun: Gun,
	
	// the options to pass the constructor
	options: { /* your options */ },
	
	// the name of your module
	name: 'your module name'
}
```

## Final words

Thanks for checking out this project! If you have any
issues, tests you want to see, features, etc., feel free
to submit an issue or pull request.

Good luck!
