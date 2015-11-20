/*jslint node: true */
/*globals describe, it, expect, beforeEach, afterAll, afterEach, beforeAll, jasmine */
'use strict';

var config = require('./config.js');


var Gun = require('gun');
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

describe('The ' + config.name, function () {
	var scope, gun, test, log = console.log;
	console.log = function () {};


	// Fresh instance each test
	beforeEach(function (done) {
		scope = Math.floor(Math.random() * 10e15);

		gun = config.extension
			.get('gun spec test suite').set()
			.path(scope).set({}, done);
	});


	afterEach(function () {
		gun.get('gun spec test suite').path(scope).put(null);
	});

	afterAll(function () {
		console.log = log;
	});


	describe('put method', function () {

		beforeEach(function () {
			gun.put({
				key: 'value'
			});
		});



		it("should permanently save the data", function (done) {
			gun.path('key').val(function (val) {
				expect(val).toBe('value');
				done();
			});
		});

		it("should invoke the callback immediately " +
			"after succeeding or failing",
			function (done) {
				gun.put({
					key: 'new value'
				}, done);
			});

		it("should be able to write without error", function (done) {
			gun.put({
				key: 'new value'
			}, function (err) {
				expect(err).toBe(null);
				done();
			});
		});

		it("should signal errors by sending an " +
			"object into the error parameter",
			function (done) {
				gun.put({
					key: 'new value'
				}, function (error) {
					if (error) {
						expect(error).toEqual(jasmine.any(Object));
					}
					done();
				});
			});

		it('should store error values in an "err" ' +
			'property on the error argument',
			function (done) {
				gun.put({
					key: 'new value'
				}, function (error) {
					if (error) {
						expect(error.err).toBeTruthy();
					}
					done();
				});
			});

		it('should signal success by sending ' +
			'an object in the success parameter',
			function (done) {
				gun.put({
					key: 'new value'
				}, function (error, success) {
					if (!error) {
						expect(success).toEqual(jasmine.any(Object));
					}
					done();
				});
			});

		it('should store the success status in ' +
			'an "ok" property of the success parameter',
			function (done) {
				gun.put({
					key: 'new value'
				}, function (error, success) {
					if (!error && success) {
						expect(success.ok).toBeTruthy();
					}
					done();
				});
			});

	});







	describe('get method', function () {

		beforeEach(function (done) {
			gun.path('get-test').put({
				success: true,
				object: {
					prop: 'value'
				}
			}).key('get-test-key', done);
		});

		it("should be able to find data by it's soul", function (done) {
			gun.path('get-test', function (error, graph) {
				expect(graph).toEqual(jasmine.any(Object));
				done();
			});
		});

		it("should be able to find data by using it's key", function (done) {
			gun.get('get-test-key', function (error, graph) {
				if (!error) {
					expect(graph).toEqual(jasmine.any(Object));
				}
				done();
			});
		});

		it("should terminate the connection stream when it's finished", function (done) {
			gun.get('get-test-key', done);
		});

		it("should terminate the object stream when it's finished", function (done) {
			gun.get('get-test-key').val(done);
		});

		it('should not throw an error for existing keys', function (done) {
			gun.get('get-test-key', function (error) {
				expect(error).toBe(null);
				done();
			});
		});

		it('should not error for empty collections', function (done) {
			gun.get("this key doesn't exist", function (err) {
				expect(err).toBe(null);
				done();
			});
		});

	});





	describe('key method', function () {

		beforeEach(function (done) {
			gun.path('to data').set().path('hidden obscurely').put({
				prop: 'my context',
				object: {
					data: true,
					success: true
				}
			}).key('first key').key('second key', done);
		});



		it('should persist the key name that points to the graph', function (done) {
			gun.get('first key').path('prop').val(function (val) {
				expect(val).toBe('my context');
				done();
			});
		});


		it('should allow several keys to point to the same souls', function (done) {
			gun.get('second key').path('prop').val(function (val) {
				expect(val).toBe('my context');
				done();
			});
		});

		it("should invoke the callback immediately " +
			"after succeeding or failing",
			function (done) {
				gun.key('key-test-name', done);
			});

		it("should not fail to persist keys", function (done) {
			gun.key('key-test-name', function (err) {
				expect(err).toBe(null);
				done();
			});
		});

		it("should signal errors by sending an " +
			"object into the error parameter",
			function (done) {
				gun.key('key-test-name', function (error) {
					if (error) {
						expect(error).toEqual(jasmine.any(Object));
					}
					done();
				});
			});

		it('should store error values in an "err" ' +
			'property on the error argument',
			function (done) {
				gun.key('key-test-name', function (error) {
					if (error) {
						expect(error.err).toBeTruthy();
					}
					done();
				});
			});

		it('should signal success by sending ' +
			'an object in the success parameter',
			function (done) {
				gun.key('key-test-name', function (error, success) {
					if (!error) {
						expect(success).toEqual(jasmine.any(Object));
					}
					done();
				});
			});

		it('should store the success status in ' +
			'an "ok" property of the success parameter',
			function (done) {
				gun.key('key-test-name', function (error, success) {
					if (!error && success) {
						expect(success.ok).toBeTruthy();
					}
					done();
				});
			});

	});

});
