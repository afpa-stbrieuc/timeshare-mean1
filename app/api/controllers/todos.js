var express = require('express');
var router = express.Router();

var Todo = require('../models/todos');

router.get('/', function(req, res) {
	Todo.find(function(err, todos) {
		if (err)
			res.send(err);

		res.json(todos);
	});
});

//add todo
router.post('/', function(req, res) {

	var todo = new Todo(); // create a new instance of the Todo model
	todo.name = req.body.name; // set the Todos name (comes from the request)

	todo.save(function(err) {
		if (err)
			res.send(err);

		res.json(201, todo);
	});


});

// get the Todo with that id
router.get('/:todo_id', function(req, res) {

		Todo.findById(req.params.todo_id, function(err, todo) {
			if (err)
				res.send(err);
			res.json(todo);
		});

});

// update the Todo with this id
router.put('/:todo_id', function(req, res) {

	if (req.params.todo_id === undefined) return res.send(400,'todo id empty');

	Todo.findById(req.params.todo_id, function(err, todo) {

		if (err)
			res.send(err);

		todo.name = req.body.name;
		todo.save(function(err) {
			if (err)
				res.send(err);

			res.json(todo);
		});

	});	
});

// delete the Todo with this id
router.delete('/:todo_id', function(req, res) {

	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		res.json({
			message: 'Successfully deleted'
		});
	});

});


module.exports = router