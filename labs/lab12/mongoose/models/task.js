var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define schema, how the model will be structured
var taskSchema = new Schema({
	text: String,
	completed: Boolean
});

// compile schema into model, and name it Task
var Task = mongoose.model('Task', taskSchema);

module.exports = Task;