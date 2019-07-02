const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

var userSchema = new Schema({
	created: Date,
	externalID: String,
	name: String,
	email: String,
	password: String,
	personas: {type: [ObjectId], index: true},
	isAuth: Boolean,
	notificationPref: {type: [Boolean]},
	url: String,
	imageUrl: String,
	customFields: {type: Map, of: Mixed}
});

var User = mongoose.model("User", userSchema);

module.exports = User;
