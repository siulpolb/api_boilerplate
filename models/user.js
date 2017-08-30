var mongoose = require('mongoose');
var resources = require('../utils/resources');

var Schema = mongoose.Schema;

var userSchema = new Schema(
{
	name : {type: String, uppercase: true, trim: true, default: ""},
	email: {type:String, default:""},
	//server side data		
	active : {type: Boolean, select: false, default: true},
	created_at: {type: Date, select: false, default : Date.now},
	updated_at: {type: Date, select: false, default : Date.now}
},
{
	versionKey: false
});

userSchema.set('toObject', { getters: true });
userSchema.set('toJSON', { getters: true });


userSchema.pre('save', function(next) {
	var currentDate = new Date();
	this.updated_at = currentDate;
	next();
});
var User = mongoose.model('User', userSchema);

module.exports = User;