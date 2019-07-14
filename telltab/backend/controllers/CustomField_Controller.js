const CustomField = require('../models/CustomField');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;


createCustomField = (req, res) => {
    const { postID, reqID, userID, fieldname, type, data } = req.body
	let field = new CustomField({
		type
	})
    if (postID) field.post = ObjectId(postID);
    if (reqID) field.requirement = ObjectId(reqID);
    if (userID) field.user = ObjectId(userID);
    if (fieldname) field.fieldname = fieldname;
    if (data) field.data = data;

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

module.exports = { createCustomField, getCustomField, deleteCustomField };