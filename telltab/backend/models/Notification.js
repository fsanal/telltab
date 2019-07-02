const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var notificationSchema = new Schema({
	created: Date,
    user: ObjectId,
	product: ObjectId,
	content: String,
	directToUrl: String,
	type: String
});

var Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
