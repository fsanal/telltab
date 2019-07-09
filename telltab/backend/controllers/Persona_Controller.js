const Persona = require('../models/Persona');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

createPersona = (req, res) => {
	const { flair, description, isPM, isAdmin, 
		productID, tagIDs, roadMapConfig  } = req.body
	let persona = new Persona({
		product: ObjectId(productID),
		flair,
		created: new Date(),
	})
	if (description) persona.description = description;
	if (tagIDs) persona.tags = tagIDs.map(tagID => ObjectId(tagID));
	if (roadMapConfig) persona.roadMapConfig = roadMapConfig;
    isPM ? persona.isPM = isPM : persona.isPM = false;
    isAdmin ? persona.isAdmin = isAdmin : persona.isAdmin = false;
	persona.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

getPersona = (req, res) => {
	Persona.findById(req.params.id).populate('tags').populate('product')
	.exec(function(err, persona) {
		if (err) return res.json({success: false, error: err})
		return res.json(persona);
	});
}

editPersona = (req, res) => {
	const { id } = req.params;
	const { description, flair, isPM, roadMapConfig, isAdmin } = req.body;
	let update = {};
	if (description) update.description = description;
	if (flair) update.flair = flair;
	if (isPM) update.isPM = isPM;
	if (roadMapConfig) update.roadMapConfig = roadMapConfig;
	if (isAdmin) update.isAdmin = isAdmin;
	Persona.findByIdAndUpdate ( id, { $set: update }, { new: true }, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

deletePersona = (req, res) => {
	Persona.findByIdAndRemove ( req.params.id, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

addTag = (req, res) => {
	const { id } = req.params;
	const { tagID } = req.body;
	update = {};
	update.tags = ObjectId(tagID);
    Persona.findByIdAndUpdate ( id, { $push: update }, { new: true }, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

deleteTag = (req, res) => {
	const { id } = req.params;
	const { tagID } = req.body;
	update = {};
	update.tags = ObjectId(tagID)
    Persona.findByIdAndUpdate ( id, { $pull: update }, { new: true }, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}


retrievePersonas = (req, res) => {
	const { tagIDs, isAdmin, productID, isPM, roadMapConfig, sort, limit, skip } = req.body;
	let query = Persona.find()
	if (tagIDs) query.where('tags').all(tagIDs);
	if (productID) query.where('product').equals(productID);
	if (isAdmin) query.where('isAdmin').equals(isAdmin);
	if (isPM) query.where('isPM').equals(isPM);
	if (roadMapConfig) query.where('roadMapConfig').equals(roadMapConfig);
	if (limit) query.limit(Number(limit));
	if (skip) query.skip(Number(skip));
	query.populate('tags').populate('product').exec((err, personas) => {
		if (err) return res.json({success: false, error: err });
		return res.json(personas);
	});
}

module.exports = { retrievePersonas, createPersona, getPersona, editPersona, deletePersona, addTag,
deleteTag }