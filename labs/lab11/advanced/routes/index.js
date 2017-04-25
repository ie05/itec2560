var express = require('express');
var router = express.Router();
var moment = require('moment');
var Lake = require('../models/lake');
var helpers = require('../hbshelpers/helpers');
var getRunDuration = helpers.getRunDuration;
// GET home
router.get('/', function(req,res,next){
  Lake.find(function(err,lakes){
    if (err) {
      return next(err);
    }
    res.render('index', {lakes:lakes});
  });
});

/* POST to home page - handle form submit */
router.post('/', function(req, res, next){

    // Make a copy of non-blank fields from req.body
    var lakeData = {};

    for (var field in req.body) {
      if (req.body[field]) { // Empty strings is false
        lakeData[field] = req.body[field];
      }
    }

    if (lakeData.start || lakeData.finish) {
        var duration = getRunDuration(lakeData.start,lakeData.finish);
        lakeData.run = {
          start: lakeData.start,
          finish: lakeData.finish,
          duration: duration
        };
    }
  // Remove non-nested data 
  delete(lakeData.start);
  delete(lakeData.finish);
  var lake = Lake(lakeData);
    
  lake.save(function(err, newLake){

      if (err) {

        if (err.name == 'ValidationError') {

            //Loop over error messages and add the message to messages array
            var messages = [];
            for (var err_name in err.errors) {
              messages.push(err.errors[err_name].message);
            }

            req.flash('error', messages);
            return res.redirect('/')
        }

        if (err.code == 11000) { //Duplicate key error code
            req.flash('error', 'A lake run with that name already exists');
            return res.redirect('/')
        }

        //For other errors we have not anticipated, send to generic error handler
        return next(err);
    }
    // console.log(newLake);
    return res.redirect('/');
    });
});

router.post('/add', function(req, res, next){

      if (!req.body.start || !req.body.finish) {
        req.flash('error', 'Please provide a start and end time for your run');
        return res.redirect('/');
      }

    // Find the Lake with the given name, and add this new date to the run array
    Lake.findById( req.body._id, function(err, Lake) {

          if (err) {
            return next(err);
          }

          if (!Lake) {
            res.statusCode = 404;
            return next(new Error('Not found, Lake with id ' + req.body._id));
          }

        // And sort run
        Lake.run.sort(function(a, b) {
        if (a.duration.getTime() > b.duration.getTime()) { return 1; }
        if (a.duration.getTime() < b.duration.getTime()) { return -1; }
        return 0;
        });
        var duration = getRunDuration(req.body.start,req.body.finish);
        Lake.run.push(
          {
            start: req.body.start,
            finish: req.body.finish,
            duration: duration
          }); // Add new date to run array

        Lake.save(function(err){
          if (err) {
            if (err.name == 'ValidationError') {
              //Loop over error messages and add the message to messages array
              var messages = [];
              for (var err_name in err.errors) {
                messages.push(err.errors[err_name].message);
              }
              req.flash('error', messages);
              return res.redirect('/')
              }
              return next(err); // For all other errors
         }


        return res.redirect('/'); //If saved successfully, redirect to main page
        });
    });
});

module.exports = router;
