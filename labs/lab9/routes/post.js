var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	req.db.collection('flowers').distinct('color', function(err, colorDocs){
		if (err) {
			return next(err)
		}

		req.db.collection('flowers').find().toArray(function (err, docs) {
			if (err) {
				return next(err);
			}
			return res.render('all_flowers', {'flowers': docs, 'colors': colorDocs});
		});
	});
});

router.post('/', function(req, res, next) {
	var flowers = req.db.collection('flowers');
	
	flowers.distinct('color', function(err, colorDocs){
		if (err) {
			return next(err)
		}

		if (req.body.color_filter) {

			flowers.find({"color":req.body.color_filter}).toArray(function (err, docs) {
				
				// var color_filter = req.body.color_filter;
				
				if (err) {
					return next(err);
				}
				return res.render('all_flowers', {'flowers': docs, 'colors': colorDocs});

			});

		} else {
			flowers.find().toArray(function (err, docs) {
				if (err) {
					return next(err);
				}
				return res.render('all_flowers', {'flowers': docs, 'colors': colorDocs});

			});
		}
	});
});

module.exports = router;