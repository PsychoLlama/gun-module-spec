/*jslint node: true */



// Change 'gun' to reference your module.
var Gun = require('gun');
var extension = new Gun({
	// module setup options
});



module.exports = {

	// Your extension should be a gun instance,
	// and it's what we'll run the tests on.
	extension: extension,

	// The name of your module. It will be
	// used as the title for your test messages.
	name: 'gun-level'

};
