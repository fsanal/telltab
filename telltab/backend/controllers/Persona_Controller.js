const Persona = require('../models/Persona');
var mongoose = require('mongoose')

createPersona = (req, res) => {
	const { flair, description, isPM, isAdmin, tagIDs, roadMapConfig, customFields } = req.body
	let persona = new Persona({
		flair,
		created: new Date(),
	})
	if (description) persona.description = description;
	if (tagIDs) persona.tagIDs = tagIDs;
	if (roadMapConfig) persona.roadMapConfig = roadMapConfig;
	if (customFields) persona.customFields = customFields;
    if (isPM) {
		persona.isPM = isPM;
	} else {
		persona.isPM = false;
	}
    if (isAdmin) {
		persona.isAdmin = isAdmin;
	} else {
		persona.isAdmin = false;
	}
	persona.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

getPersona = (req, res) => {
	Persona.findById(req.params.personaID, (err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

editPersona = (req, res) => {
	const { personaID, description, flair, isPM, roadMapConfig, isAdmin } = req.body;
	let update = {};
	if (description) update.description = description;
	if (flair) update.flair = flair;
	if (isPM) update.isPM = isPM;
	if (roadMapConfig) update.roadMapConfig = roadMapConfig;
	if (isAdmin) update.isAdmin = isAdmin;
	Persona.findByIdAndUpdate ( personaID, { $set: update }, { new: true }, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

deletePersona = (req, res) => {
	Persona.findByIdAndRemove ( req.params.personaID, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

addTag = (req, res) => {
	const { personaID, tagID } = req.body
	update = {}
	update.tagIDs = tagID
    Persona.findByIdAndUpdate ( personaID, { $push: update }, { new: true }, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

deleteTag = (req, res) => {
	const { personaID, tagID } = req.body
	update = {}
	update.tagIDs = tagID
    Persona.findByIdAndUpdate ( personaID, { $pull: update }, { new: true }, ( err, persona) => {
		if (err) return res.json({success: false, error: err})
		return res.json(persona)
	});
}

module.exports = { createPersona, getPersona, editPersona, deletePersona, addTag, deleteTag }