'use strict';

var should = require('should');

var app = require('./../../server');
var request = require('supertest')(app);


before(function() {
	app.boot(require('./../config-test'));
});

after(function() {
	app.shutdown();
});

var todo_id;

describe('Todos: api', function() {
 


	it('GET /api/todos', function(done) {

		request
			.get('/api/todos')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);

	});

	it('POST /api/todos', function(done) {

		request
			.post('/api/todos')
			.type('form') //this will simulate a post like a form
    		.send({ name: 'my todos 1' })
			.expect(201)
			.expect(function(res) {
		       todo_id = res.body._id;
		    })
			.end(done);


	});

	it('PUT /api/todos/:todo_id', function(done) {
		request
			.put('/api/todos/' + todo_id)
			.type('form')
			.send({ name: 'my modif todos 1' })
			.expect(200)
			.end(done);


	});

	it('DELETE /api/todos/:todo_id', function(done) {
	

		request
			.del('/api/todos/' + todo_id)
			.expect(200)
			.end(done);

	});


});