const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var notificationSchema = new Schema({
	created: Date,
    user: {type: ObjectId, ref: 'User'},
	product: {type: ObjectId, ref: 'Product'},
	content: String,
	directToUrl: String,
	type: String
});

var Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
