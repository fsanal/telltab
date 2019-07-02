const Notification = require('../models/Notification');
var mongoose = require('mongoose')

createNotification = (req, res) => {
	const { boardID, title, type, directToUrl } = req.body
	let notification = new Notification({
		boardID,
		title,
		type,
		directToUrl,
		created: new Date()
	})
	notification.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(notification)
	});
}

getNotification  = (req, res) => {
	Notification.findById(req.params.notificationID, (err, notification) => {
		if (err) return res.json({success: false, error: err})
		return res.json(notification)
	});
}

deleteNotification = (req, res) => {
	Notification.findByIdAndRemove ( req.params.notificationID, ( err, notification) => {
		if (err) return res.json({success: false, error: err})
		return res.json(notification)
	});
}

module.exports = { createNotification, getNotification, deleteNotification }