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
var account_id;
var adverts_id;

describe('Todos & Account & advert : test unit', function() {
 


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

	it('GET /api/account', function(done) {

		request
			.get('/api/account')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);

	});

	it('POST /api/account', function(done) {

		request
			.post('/api/account')
			.type('form') //this will simulate a post like a form
    		.send({ name: 'my todos 1' })
			.expect(201)
			.expect(function(res) {
		       account_id = res.body._id;
		    })
			.end(done);


	});

	it('PUT /api/account/:account_id', function(done) {
		request
			.put('/api/account/' + account_id)
			.type('form')
			.send({ name: 'my modif todos 1' })
			.expect(200)
			.end(done);


	});

	it('DELETE /api/account/:account_id', function(done) {
	

		request
			.del('/api/account/' + account_id)
			.expect(200)
			.end(done);

	});

		it('GET /api/adverts', function(done) {

		request
			.get('/api/adverts')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);

	});

	it('POST /api/adverts', function(done) {

		request
			.post('/api/adverts')
			.type('form') //this will simulate a post like a form
    		.send({ name: 'my advert 1' })
			.expect(201)
			.expect(function(res) {
		       adverts_id = res.body._id;
		    })
			.end(done);


	});

	it('PUT /api/adverts/:adverts_id', function(done) {
		request
			.put('/api/adverts/' + adverts_id)
			.type('form')
			.send({ name: 'my modif adverts 1' })
			.expect(200)
			.end(done);


	});

	it('DELETE /api/adverts/:adverts_id', function(done) {
	

		request
			.del('/api/adverts/' + adverts_id)
			.expect(200)
			.end(done);

	});

});