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
	var renderResults, text1, text2;
	text1 = '$' + dollars + ' is equivalent to ' + result + ' ' + convertTo;
	text2 = dollars + ' ' + convertFrom + ' is equivalent to $' + from;
	convertFrom == convertTo ? renderResults = text1 : renderResults = text1 + ' AND ' + text2 ;
	res.render('results', {
						  renderResults : renderResults
						});
});

module.exports = router;