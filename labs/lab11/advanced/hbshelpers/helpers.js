var moment = require('moment');

function dateFormat(date) {
  m = moment.utc(date);
  return m.parseZone().format("MMMM Do YYYY, h:mm:ss a");
}

function timeFormat(date) {
  m = moment.utc(date);
  if (date.getTime()<3600000) {
  	return m.parseZone().format("mm:ss");

  }else{
  	return m.parseZone().format("h:mm:ss");
  	
  }
}

function getRunDuration(start,finish){
	var runDuration = new Date(finish).getTime() - new Date(start).getTime();
	return new Date(runDuration).toISOString();
}

var helpers = {
  dateFormatter : dateFormat,
  timeFormatter : timeFormat,
  getRunDuration: getRunDuration
};

module.exports = helpers;