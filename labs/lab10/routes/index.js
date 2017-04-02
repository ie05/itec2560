var express = require('express');
var router = express.Router();

/* GET home page, a list of incomplete tasks . */
router.get('/', function(req, res, next) {

	req.task_col.find({completed:false}).toArray(function(err, tasks){
		if (err) {
			return next(err);
		}
		console.log(tasks);
		res.render('index', { title: 'TODO list' , tasks: tasks });
	});
});


/* Add new task, then redirect to task list */
router.post('/add', function(req, res, next){

	if (!req.body || !req.body.text) {
		console.log('no task info provided'); // todo inform user of error
		res.redirect('/');
	}

	else {
		// Save new task with text provided, and completed = false
		var task = { task : req.body.text, completed: false};

		req.task_col.insertOne(task, function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/')
		})
	}

});

module.exports = router;