var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var Task = require('../models/task.js');

/* GET home page, a list of incomplete tasks . */
router.get('/', function(req, res, next) {

  Task.find({completed:false}, function(err, tasks){
    if (err) {
      return next(err);
    }
    res.render('index', { title: 'TODO list' , tasks: tasks });
  });
});


/* GET all completed tasks. */
router.get('/completed', function(req, res, next){
  Task.find({completed:true}, function(err, tasks){
    if (err) {
      return next(err);
    }
    res.render('tasks_completed', { title: 'Completed tasks' , tasks: tasks });
  });
});


/* Mark a task as done. Task _id should be provided as a body parameter */
router.post('/alldone', function(req, res, next){

  Task.update( {completed:false}, {completed : true},{ multi: true}, function(err) {

    if (err) {
      return next(err);
    }

    req.flash('info', 'All tasks are done!');
    return res.redirect('/')
  });
});

router.post('/add', function(req, res, next){

  if (!req.body || !req.body.text) {
    req.flash('error', 'Please enter some text');
    res.redirect('/');
  }

  else {
    // Save new task with text provided, and completed = false
    var task = new Task({ text : req.body.text, completed: false});

    task.save(function(err) {
      if (err) {
        return next(err);
      }
      res.redirect('/')
    })
  }

});


/* Mark a task as done. Task _id should be provided as body parameter */
router.post('/done', function(req, res, next){
 var id = req.body._id;
 Task.findByIdAndUpdate(id, { completed : true }, function(err, task){

    if (err) {
      // For database errors, 500 error
      return next(err);   
    }

    if (!task) {
      var req_err = new Error('Task not found');
      req_err.status = 404;
      return next(req_err);     // Task not found error
    }

    req.flash('info', 'Marked as completed');
    return res.redirect('/')

  })

});


/* Delete a task. Task _id is in req.body */
router.post('/delete', function(req, res,next){
  var id = req.body._id;
  Task.findByIdAndRemove(id, function(err, task){

    if (err) {
      return next(err);    // For database errors
    }

    if (!task) {
      var req_err = new Error('Task not found');
      req_err.status = 404;
      return next(req_err);     // Task not found error
    }

    req.flash('info', 'Deleted');
    return res.redirect('/')

  })

});

router.get('/task/:id', function(req, res, next){

  Task.findById(req.params.id, function(err, task){
    if (err) {
      return next(err);
    }
    return res.render('task_detail', {task:task})
  })
});
module.exports = router;
