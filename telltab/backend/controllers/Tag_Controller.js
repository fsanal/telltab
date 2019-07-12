const Tag = require('../models/Tag');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

createTag = (req, res) => {
	const { productID, name, url } = req.body
	let tag = new Tag({
		product: ObjectId(productID),
		name,
		created: new Date()
	})
	if (url) tag.url = url;
	tag.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(tag)
	});
}

getTag = (req, res) => {
	Tag.findById(req.params.id, (err, tag) => {
		if (err) return res.json({success: false, error: err})
		return res.json(tag)
	});
}

deleteTag = (req, res) => {
	Tag.findByIdAndRemove ( req.params.id, ( err, tag) => {
		if (err) return res.json({success: false, error: err})
		return res.json(tag)
	});
}

retrieveTags = (req, res) => {
	const { productID, sort, limit, skip } = req.body;
	let query = Tag.find()
	if (productID) query.where('product').equals(productID);
	if (limit) query.limit(Number(limit));
	if (skip) query.skip(Number(skip));
	query.exec((err, tags) => {
		if (err) return res.json({success: false, error: err });
		return res.json(tags);
	});
}

findTag = (req, res) => {
	const { productID, name } = req.body;
	let query = Tag.findOne()
	if (productID) query.where('product').equals(productID);
	if (name) query.where('name').equals(name);
	query.exec((err, tag) => {
		if (err) return res.json({success: false, error: err });
		return res.json(tag);
	});
}

module.exports = { createTag, getTag, deleteTag, retrieveTags, findTag }