var mongoose = require('mongoose');

var KeySchema = mongoose.Schema({
	key:{type:Number},
	password:{type:Number}
});

module.exports = mongoose.model('key',KeySchema); 
