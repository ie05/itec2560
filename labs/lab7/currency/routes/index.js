var express = require('express');
var router = express.Router();

var exchangeRates = {'EUR' : 0.94, 'JPY' : 112.86};


router.get('/', function(req,res){
	res.render('index');
});

router.get('/convert',function(req,res){
	var dollars = req.query.dollar_amount;
	var convertTo = req.query.to_currency;
	var convertFrom = req.query.from_currency;
	var rate = exchangeRates[convertTo];
	var fromRate = exchangeRates[convertFrom];
	var result = dollars * rate;
	var from = dollars / fromRate;


	// res.send('$' + dollars + ' is ' + result + convertTo);
	res.render('results', { dollars : dollars,
						  result : result,
						  convertTo: convertTo,
						  convertFrom: convertFrom,
						  from: from,
						  fromRate: fromRate
						});
});

module.exports = router;