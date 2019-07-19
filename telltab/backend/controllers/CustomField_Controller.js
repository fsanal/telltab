const CustomField = require('../models/CustomField');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;


createCustomField = (req, res) => {
    const { postID, reqID, userID, type, data, globalFieldID } = req.body
	let field = new CustomField({
		type
	})
    if (postID) field.post = ObjectId(postID);
    if (reqID) field.requirement = ObjectId(reqID);
    if (userID) field.user = ObjectId(userID);
    if (data) field.data = data;
    if (data) field.markModified('data');
    if (globalFieldID) field.globalField = ObjectId(globalFieldID);

	field.save((err, field) => {
        if (err) return res.json({success: false, error: err});
        field.populate('post').populate('requirement').populate('user', (err, field) => {
            if (err) return res.json({success: false, error: err});
            return res.json(field);
        });
    });
}

getCustomField = (req, res) => {
    CustomField.findById(req.params.id).populate('post').populate('requirement')
    .populate('user').exec(function(err, field) {
        if (err) return res.json({success: false, error: err});
		return res.json(field);
    });
}

deleteCustomField = (req, res) => {
    CustomField.findByIdAndRemove(req.params.id, (err, field) => {
        if (err) return res.json({success: false, error: err});
        field.populate('post').populate('requirement').populate('user', (err, field) => {
            if (err) return res.json({success: false, error: err});
            return res.json(field);
        });
    });
}

editCustomField = (req, res) => {
    const { id } = req.params;
    const { postID, reqID, userID, data, globalFieldID } = req.body;
    let update = {};
    if (postID) update.post = ObjectId(postID);
    if (reqID) update.requirement = ObjectId(reqID);
    if (userID) update.user = ObjectId(userID);
    if (data) update.data = data;
    if (globalFieldID) update.globalField = ObjectId(globalFieldID);
    CustomField.findByIdAndUpdate ( id, { $set: update }, { new: true }, ( err, field) => {
		if (err) return res.json({success: false, error: err});
		field.populate('post').populate('requirement').populate('user', (err, field) => {
			if (err) return res.json({success: false, error: err});
			return res.json(field);
		});
	});
}

module.exports = { createCustomField, getCustomField, deleteCustomField, editCustomField };