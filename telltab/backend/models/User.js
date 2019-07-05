const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { ObjectId} = Schema.Types;

var userSchema = new Schema({
	created: Date,
	externalID: String,
	name: String,
	email: String,
	password: String,
	personas: [{type: ObjectId, index: true, ref: 'Persona'}],
	isAuth: Boolean,
	notificationPref: {type: [Boolean]},
	url: String,
	imageUrl: String,
	customFields: [ObjectId]
});

var User = mongoose.model("User", userSchema);

module.exports = User;
