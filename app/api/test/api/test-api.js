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

var user = { 		lastname: 'Antoine',
			 		firstname: 'Donniou',
			 		adress: 'rue principale',
			 		mail: 'mail@gmail.com',
			 		tel: '0123456789',
			 		verified : false,
			 		media: 'avatar.ico',
			 		password: '12345' };

var advert = {		type : 'offre',
    				title : 'titretest',
    				author : 'auteurtest',
    				author_id : '001',
    				content : 'contenttest',
    				regions : 'bretagne',
    				categories :'cours'};

var reply = {		title : 'repliytest',
    				author : 'auteurtest',
    				author_id : '001',
					toAd_author : '001',
					content : 'contenttest',
 					confirmed :'confirmedtest'};
var reply_id;
var advert_id;    
var advert_author_id = '001';
var user_id;
var account_id;
var adverts_id;
var token;
var media;

describe('Account, User & adverts : test unitaires', function() {
 


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


	it('GET /api/users', function(done) {

		request
			.get('/api/users')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);

	});

	it('POST /api/users/inscription', function(done) {

		request
			.post('/api/users/inscription')
			.send(user)
			.expect(function(res) {
		       user_id = res.body._id;
		       token = res.body.token;
		    })
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);

	});

	it('GET /api/users/:user_id', function(done) {

		request
			.get('/api/users/'+ user_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);

	});



	it('POST /api/users/login', function(done){

		request
			.post('/api/users/login')
			.send(user)
			.expect(200)
			.end(done);
	});



	it('POST /api/adverts/', function(done){
		request
			.post('/api/adverts/')
			.send(advert)
			.expect(function(res) {
		       advert_id = res.body._id;
		    })
			.expect(200)
			.end(done);
	});

		it('GET /api/adverts', function(done){
		request
			.get('/api/adverts')
			.expect(200)
			.end(done);


	});

	it('GET /api/adverts/:advert_id', function(done){
		request
			.get('/api/adverts/'+ advert_id)
			.expect(200)
			.end(done);
	});

	it('GET /api/adverts/editAdverts/:advert_id', function(done){
	 	request
	 		.get('/api/adverts/'+ advert_id)
	 		.expect(200)
	 		.end(done);
	 });

	it('GET /api/adverts/searchAuthor/:advert_author_id', function(done){
	 	request
	 		.get('/api/adverts/searchAuthor/'+ advert_author_id)
	 		.expect(200)
	 		.end(done);
	 });

	it('GET /api/adverts/replyToAd/:advert_id', function(done){
	 	request
	 		.get('/api/adverts/replyToAd/'+ advert_id)
	 		.expect(200)
	 		.end(done);
	 });

	// it('PUT /api/adverts/:advert_id', function(done){
	//  	request
	//  		.put('/api/adverts/'+ advert_id)
	//  		.send(advert)
	//  		.expect(200)
	//  		.end(done);
	//  });

	// it('PUT /api/adverts/media/:advert_id', function(done){
	// 	request
	// 		.put('/api/adverts/media/:advert_id'+ advert_id)
	// 		.send(media)
	// 		.expect(200)
	// 		.end(done);
	// })

	// it('PUT /api/adverts/replies/:advert_id', function(done){
	// 	request
	// 		.put('/api/adverts/replies/'+ advert_id)
	// 		.expect(200)
	//  		.end(done);
	// });


	it('PUT /api/adverts/answered/:advert_id', function(done){
		request
			.put('/api/adverts/answered/'+ advert_id)
			.expect(200)
	 		.end(done);
	});
	
	it('PUT /api/adverts/cancelled/:advert_id', function(done){
		request
			.put('/api/adverts/cancelled/'+ advert_id)
			.expect(200)
	 		.end(done);
	});

//////////////////////////////////////////////////////////////
//		replies test
//////////////////////////////////////////////////////////////

	it('POST /api/replies/', function(done){
		request
			.post('/api/replies/')
			.send(reply)
			.expect(function(res) {
		       reply_id = res.body._id;
		    })
			.expect(200)
			.end(done);
	});

	// it('GET /api/replies', function(done){
	// 	request
	// 		.get('/api/replies')
	// 		.expect(200)
	// 		.end(done);
	// });

	it('GET /api/replies/:reply_id', function(done){
		request
			.get('/api/replies/'+reply_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('PUT /api/replies/:reply_id', function(done){
		request
			.put('/api/replies/'+reply_id)
			.send(reply)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('PUT /api/replies/cancelled/:reply_id', function(done){
		request
			.put('/api/replies/cancelled/'+reply_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('GET /api/replies/approved/:user_id', function(done){
		request
			.get('/api/replies/approved/'+advert_author_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('GET /api/replies/searchReplies/:reply_id', function(done){
		request
			.get('/api/replies/approved/'+reply_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('GET /api/replies/replyToAd/:reply_id', function(done){
		request
			.get('/api/replies/replyToAd/'+reply_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});

	it('GET /api/replies/cancelled/:user_id', function(done){
		request
			.get('/api/replies/cancelled/'+user_id)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
	});




//////////////////////////////////////////////////////////////
//		Fin replies test
//////////////////////////////////////////////////////////////
	
	it('DELETE /api/adverts/:advert_id', function(done){
		request
			.del('/api/adverts/'+ advert_id)
			.expect(200)
	 		.end(done);
	});

	// it('DELETE /api/users/:user_id', function(done){
	// 	request
	// 		.del('/api/users/'+ user_id)
	// 		.expect(200)
	//  		.end(done);
	// });
	// it('POST /api/upload/', function(done){
	// 	request
	// 		.post('/api/upload/')
	// 		.send(file)
	// 		.expect(200)
	// 		.end(done);
	// })	



});