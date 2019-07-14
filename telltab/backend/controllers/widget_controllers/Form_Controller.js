const Form = require('../../models/widget/Form');
const FormElement = require('../../models/widget/FormElement');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

createForm = (req, res) => {
    const { width, height, font, color, 
        backgroundColor, formElementIDs } = req.body;
    let form = new Form({
        created: new Date()
    });
    if (width) { form.width = width } else form.width = 50;
    if (height) { form.height = height } else form.height = 100;
    if (font) form.font = font;
    if (backgroundColor) form.backgroundColor = backgroundColor;
    if (color) form.color = color;
    if (formElementIDs) form.formElements = formElementIDs.map(formElementID => 
        ObjectId(formElementID));
    form.save((err, form) => {
        if (err) return res.json({ success: false, error: err });
        form.populate('formElements', (err, form) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(form);
        });
    });
}

getForm = (req, res) => {
    Form.findById(req.params.id).populate('formElements').exec(function(err, form) {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

editForm = (req, res) => {
    const { id } = req.params;
    const { width, height, font, color, backgroundColor } = req.body;
    let update = {};
    if (width) update.width = width; 
    if (height) update.height = height;
    if (backgroundColor) update.backgroundColor = backgroundColor;
    if (font) update.font = font;
    if (color) update.color = color;
    Form.findByIdAndUpdate(id, {$set: update}, 
        {new: true}, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        form.populate('formElements', (err, form) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(form);
        });
    });
}

deleteForm = (req, res) => {
    const { id } = req.params;
    Form.findByIdAndRemove(id, 
        (err, form) => {
        if (err) return res.json({ success: false, error: err });
        form.populate('formElements', (err, form) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(form);
        });
    });
}

addFormElement = (req, res) => {
    const { id } = req.params;
    const { formElementID } = req.body;
    let update = {};
    if (formElementID) update.formElements = ObjectId(formElementID);
    Form.findByIdAndUpdate(id, {$push: update}, 
        {new: true}, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        form.populate('formElements', (err, form) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(form);
        });
    });
}

deleteFormElement = (req, res) => {
    const { id } = req.params;
    const { formElementID } = req.body;
    let update = {};
    if (formElementID) update.formElements = ObjectId(formElementID);
    Form.findByIdAndUpdate(id, {$pull: update}, 
        {new: true}, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        form.populate('formElements', (err, form) => {
            if (err) return res.json({ success: false, error: err });
            return res.json(form);
        });
    });
}

retrieveFormElements = (req, res) => {
    let { secret, type, sort, limit, skip } = req.body;
    let query = FormElement.find()
	if (type) query.where('type').all(type);
	if (limit) query.limit(Number(limit));
	if (skip) query.skip(Number(skip));
	query.populate('formElements').exec((err, formElements) => {
		if (err) return res.json({success: false, error: err });
		return res.json(formElements);
	});
}

module.exports = { createForm, getForm, editForm, deleteForm, addFormElement, deleteFormElement, retrieveFormElements }