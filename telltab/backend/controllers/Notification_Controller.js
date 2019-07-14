const Notification = require('../models/Notification');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

createNotification = (req, res) => {
	const { productID, userID, title, type, directToUrl } = req.body
	let notification = new Notification({
		product: ObjectId(productID),
		user: ObjectId(userID),
		title,
		type,
		created: new Date()
	})
	if (directToUrl) notification.directToUrl = directToUrl;
	notification.save((err, notification) => {
		if (err) return res.json({success: false, error: err});
		notification.populate('user').populate('product', (err, notification) => {
			if (err) return res.json({success: false, error: err});
			return res.json(notification);
		});
	});
}

getNotification  = (req, res) => {
	Notification.findById(req.params.id).populate('user').populate('product')
	.exec(function(err, notification) {
		if (err) return res.json({success: false, error: err});
		return res.json(notification);
	});
}

deleteNotification = (req, res) => {
	Notification.findByIdAndRemove ( req.params.id, (err, notification) => {
		if (err) return res.json({success: false, error: err});
		notification.populate('user').populate('product', (err, notification) => {
			if (err) return res.json({success: false, error: err});
			return res.json(notification);
		});
	});
}

module.exports = { createNotification, getNotification, deleteNotification }