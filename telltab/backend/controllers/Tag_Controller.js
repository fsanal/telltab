const Tag = require('../models/Tag');
var mongoose = require('mongoose')

createTag = (req, res) => {
	const { productID, name, url, customFields, } = req.body
	let tag = new Tag({
		productID,
		name,
		created: new Date()
	})
	if (url) tag.url = url;
	if (customFields) tag.customFields = customFields;
	tag.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(tag)
	});
}

getTag  = (req, res) => {
	Tag.findById(req.params.tagID, (err, tag) => {
		if (err) return res.json({success: false, error: err})
		return res.json(tag)
	});
}

deleteTag = (req, res) => {
	Tag.findByIdAndRemove ( req.params.tagID, ( err, tag) => {
		if (err) return res.json({success: false, error: err})
		return res.json(tag)
	});
}

module.exports = { createTag, getTag, deleteTag }