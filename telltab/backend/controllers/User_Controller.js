const User = require('../models/User');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

createUser = (req, res) => {
    const { externalID, name, email, password, personaIDs, 
        isAuth, notificationPref, url, imageUrl } = req.body
	let user = new User({
		name,
		created: new Date(),
	})
	if (externalID) user.externalID = externalID;
    if (email) user.email = email;
    if (password) user.password = password;
    if (personas) user.personas = personas;
    if (isAuth) { user.isAuth = isAuth; } else { user.isAuth = false; }
    if (personas) user.personas = personaIDs.map(personaID => ObjectId(personaID));
    if (notificationPref) user.notificationPref = notificationPref;
    if (url) user.url = url;
    if (imageUrl) user.imageUrl = imageUrl;
	user.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

getUser = (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

editUser = (req, res) => {
	const { id, name, email, url, imageUrl, password, notificationPref } = req.body;
	let update = {};
	if (name) update.name = name;
	if (email) update.email = email;
	if (url) update.url = url;
	if (imageUrl) update.imageUrl = imageUrl;
	if (password) update.password = password;
	User.findByIdAndUpdate ( id, { $set: update }, { new: true }, ( err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

deleteUser = (req, res) => {
	User.findByIdAndRemove ( req.params.id, ( err, user) => {
	    if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

addPersona = (req, res) => {
	const { id, personaID } = req.body
	update = {}
	update.personaIDs = ObjectId(personaID)
    User.findByIdAndUpdate ( id, { $push: update }, { new: true }, ( err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

deletePersona = (req, res) => {
	const { id, personaID } = req.body
	update = {}
	update.personaIDs = ObjectId(personaID)
    User.findByIdAndUpdate ( id, { $pull: update }, { new: true }, ( err, user) => {
		if (err) return res.json({success: false, error: err})
		return res.json(user)
	});
}

module.exports = { createUser, getUser, editUser, deleteUser, addPersona, deletePersona }