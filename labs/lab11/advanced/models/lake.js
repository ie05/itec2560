var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


/* Represents a bird species */
var lakeSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true 
  },
  run:[{
        start: 
        {
            type: Date,
            validate: {
                        validator : function(date) {
                          //return false if date is in the future
                          return (date.getTime() < Date.now()) ; 
                        },
                        message: '{VALUE} is not a valid run date. Date must be in the past'
             }
        },
        finish: 
        {
            type: Date,
            validate: {
                        validator : function(date) {
                          //return false if date is in the future
                          return (date.getTime() < start.getTime) ; 
                        },
                        message: '{VALUE} is not a valid run date. Your finish time must be later than your start time.'
             }
        },
        duration: 
        {
            type: Date
            
        }
  }]
  
});

var Lake = mongoose.model('Lake', lakeSchema);
lakeSchema.plugin(uniqueValidator);

module.exports = Lake;