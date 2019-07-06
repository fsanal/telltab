const CustomField = require('../models/CustomField');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;
const { Post } = require('../models/feedback_forum/Post');
const { Requirement } = require('../models/roadmap/Requirement');
const { User } = require('../models/User');

createPostCustomField = (req, res) => {
    const { postID, fieldname, type, data } = req.body;
	let field = new CustomField({
		type
	})
	if (postID) field.post = ObjectId(postID);
    if (fieldname) field.fieldname = fieldname;
    if (data) field.data = data;

    let update = {};
    update.customFields = field._id;
    Post.findByIdAndUpdate(postID, {$push: update}, {new: true}, (err) => {
        if (err) return res.json({ success: false, error: err });
    });

	field.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(field)
    });
}

createRequirementCustomField = (req, res) => {
    const { reqID, fieldname, type, data } = req.body;
	let field = new CustomField({
		type
	})
	if (reqID) field.requirement = ObjectId(reqID);
    if (fieldname) field.fieldname = fieldname;
    if (data) field.data = data;

    let update = {};
    update.customFields = field._id;
    Requirement.findByIdAndUpdate(reqID, {$push: update}, {new: true}, (err) => {
        if (err) return res.json({ success: false, error: err });
    });

	field.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(field)
    });
}

createUserCustomField = (req, res) => {
    const { userID, fieldname, type, data } = req.body
	let field = new CustomField({
		type
	})
	if (userID) field.post = ObjectId(userID);
    if (fieldname) field.fieldname = fieldname;
    if (data) field.data = data;

    let update = {};
    update.customFields = field._id;
    User.findByIdAndUpdate(userID, {$push: update}, {new: true}, (err) => {
        if (err) return res.json({ success: false, error: err });
    });

	field.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(field)
    });
}

getCustomField = (req, res) => {
	CustomField.findById(req.params.id, (err, field) => {
		if (err) return res.json({success: false, error: err})
		return res.json(field)
	});
}

deletePostCustomField = (req, res) => { //from post array, need to delete from CustomFields too?
    CustomField.findById(req.params.id, (err, field) => {
		if (err) {
            return res.json({success: false, error: err})
        } else {
            let postID = field.post;
            let update = {};
            if (postID) update.customFields = req.params.id;
            Post.findByIdAndUpdate(postID, {$pull: update}, {new: true}, (err, post) => {
                if (err) return res.json({ success: false, error: err });
                return res.json(post);
            });
        }
    });
}

// 7/5/19
//Make sure populate works//

module.exports = { createPostCustomField, createRequirementCustomField, 
    createUserCustomField, getCustomField, deletePostCustomField };