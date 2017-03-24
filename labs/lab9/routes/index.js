var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	// define reusable error function
	var error = function(err){
		return next(err);
	};

	req.db.collection('flowers').distinct('color', function(err, colorDocs){
		
		!err ?  null : error(err);

		if (req.query.color_filter) {

			req.db.collection('flowers').find({"color":req.query.color_filter}).toArray(function (err, docs) {
				
				!err ?  null : error(err);
				return res.render('all_flowers', {'flowers': docs, 'colors': colorDocs, 'color_filter': req.query.color_filter});
			});

		} else {
			req.db.collection('flowers').find().toArray(function (err, docs) {
				
				!err ?  null : error(err);
				return res.render('all_flowers', {'flowers': docs, 'colors': colorDocs});

			});
		}
	});
});

router.get('/details/:flower', function(req, res, next){
	req.db.collection('flowers').findOne({'name' : req.params.flower}, function(err, doc) {
		!err ?  null : error(err); // 500 error
		 doc ?  null : function(){return next();}; // Creates a 404 error
		return res.render('flower_details', { 'flower' : doc });
	
	});
});

router.post('/addFlower', function(req, res, next){
	// req.db.collection('flowers').insertOne(req.body, function(err){
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	return res.redirect('/');
	// });

	req.db.collection('flowers').find({"name":req.body.name}).toArray(function (err, nameSearch){
			!err ?  null : error(err);
			// create testObj to output db queries to view
			// this is for debugging purposes
			// and should be removed when deployed on production env 
			var testObj = JSON.stringify(nameSearch);
			
			// create var to hold custom errors
			var error_arr = [];

			// check if the flower name returns an array
			if (nameSearch.length > 0) {
					// nameSearch return data, push custom error to error_arr and display
					error_arr.push('This flower already exists, please choose another name.');

					// run a db query for all flowers, store in an arr, and pass to all_flowers view to render
					req.db.collection('flowers').find().toArray(function (err, docs) {
						// if err, err, else render view
						!err ?  null : error(err);
						return res.render('all_flowers', {'flowers': docs, 'error_arr': error_arr, 'debug_var': testObj });

					});
				
			}else{
				// if the flower nameSearch returns an empty array, write the post data
				// to the flower library, to create a new flower.
				req.db.collection('flowers').insertOne(req.body, function(err){
					!err ?  null : error(err);
					return res.redirect('/');
				});
			}
			
	});

	
	
});

router.put('/updateColor', function(req, res, next) {

	var filter = { 'name' : req.body.name };
	var update = { $set : { 'color' : req.body.color }};

	req.db.collection('flowers').findOneAndUpdate(filter, update, function(err) {
		if (err) {
			return next(err);
		}
		return res.send({'color' : req.body.color})
	})
});

module.exports = router;