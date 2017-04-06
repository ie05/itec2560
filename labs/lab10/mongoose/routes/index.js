var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
// include schema module
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
    // pass flash message to res obj before response sends
    req.flash('info', 'All tasks are done!');
    return res.redirect('/')
  });
});

// add a single task
router.post('/add', function(req, res, next){
  
  // req.body does not contain data
  if (!req.body || !req.body.text) {
    req.flash('error', 'Please enter some text');
    res.redirect('/');
  }
  // else if req.body contains data, process data
  else {
    // new task using schema obj
    // Save new task with text provided, and completed = false
    var task = new Task({ text : req.body.text, completed: false});
    // insert the task into db collection
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
 // get id from request obj - much cleaner in mongoose!
 var id = req.body._id;
 Task.findByIdAndUpdate(id, { completed : true }, function(err, task){

    if (err) {
      // For database errors, 500 error
      return next(err);   
    }
    // check if an object was created
    // if no, create error obj
    if (!task) {
      var req_err = new Error('Task not found');
      req_err.status = 404;
      return next(req_err);     // Task not found error
    }
    // else set flash property to completed
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
    // check if an object was created
    // if no, create error obj
    if (!task) {
      var req_err = new Error('Task not found');
      req_err.status = 404;
      return next(req_err);     // Task not found error
    }
    // if success, create flash message
    // alerting the user the obj was deleted
    req.flash('info', 'Deleted');
    return res.redirect('/')

  })

});

// render task details page
// use route paramater to get id
router.get('/task/:id', function(req, res, next){
  // make query based on param.id poperty
  Task.findById(req.params.id, function(err, task){
    if (err) {
      return next(err);
    }
    // if success, render the task detail view
    return res.render('task_detail', {task:task})
  })
});

module.exports = router;
