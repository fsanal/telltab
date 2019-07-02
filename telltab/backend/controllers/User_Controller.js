const User = require('../models/User');
var mongoose = require('mongoose')

createUser = (req, res) => {
    const { externalID, name, email, password, personas, 
        isAuth, notificationPref, url, imageUrl, customFields } = req.body
	let user = new User({
		name,
		created: new Date(),
	})
	if (externalID) user.externalID = externalID;
    if (email) user.email = email;
    if (password) user.password = password;
    if (personas) user.personas = personas;
    if (isAuth) { user.isAuth = isAuth; } else { user.isAuth = false; }
    if (personas) user.personas = personas;
    if (notificationPref) user.notificationPref = notificationPref;
    if (url) user.url = url;
    if (imageUrl) user.imageUrl = imageUrl;
	if (customFields) user.customFields = customFields;
	user.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

getUser = (req, res) => {
	User.findById(req.params.userID, (err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

editUser = (req, res) => {
	const { userID, name, email, url, imageUrl, password, notificationPref } = req.body;
	let update = {};
	if (name) update.name = name;
	if (email) update.email = email;
	if (url) update.url = url;
	if (imageUrl) update.imageUrl = imageUrl;
	if (password) update.password = password;
	User.findByIdAndUpdate ( userID, { $set: update }, { new: true }, ( err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

deleteUser = (req, res) => {
	User.findByIdAndRemove ( req.params.userID, ( err, user) => {
	    if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

addPersona = (req, res) => {
	const { userID, personaID } = req.body
	update = {}
	update.personaIDs = personaID
    User.findByIdAndUpdate ( userID, { $push: update }, { new: true }, ( err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

deletePersona = (req, res) => {
	const { userID, personaID } = req.body
	update = {}
	update.personaIDs = personaID
    User.findByIdAndUpdate ( userID, { $pull: update }, { new: true }, ( err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

module.exports = { createUser, getUser, editUser, deleteUser, addPersona, deletePersona }