const Form = require('../../models/widget/Form');
var mongoose = require('mongoose')

createForm = (req, res) => {
    const { width, height, font, color, 
        backgroundColor, formElementIDs } = req.body;
    let form = new Form({
        created: new Date()
    });
    if (width) { form.width = width } else form.width = 50;
    if (height) { form.height = height } else form.height = 100;
    if (font) form.font = font;
    if (backgroundColor) {form.backgroundColor = backgroundColor} 
    else {
        form.backgroundColor = "white";
    }
    if (color) form.color = color;
    if (formElementIDs) form.formElementIDs = formElementIDs;
    form.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

getForm = (req, res) => {
    Form.findById(req.param.formID, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

editForm = (req, res) => {
    const { formID, width, height, font, color, backgroundColor } = req.body;
    let update = {};
    if (width) update.width = width; 
    if (height) update.height = height;
    if (backgroundColor) update.backgroundColor = backgroundColor;
    if (font) update.font = font;
    if (color) update.color = color;
    Form.findByIdAndUpdate(formID, {$set: update}, 
        {new: true}, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

deleteForm = (req, res) => {
    const { formID } = req.param;
    Form.findByIdAndRemove(formID, 
        (err, form) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

addFormElement = (req, res) => {
    const { formID, formElementID } = req.body;
    let update = {};
    if (formElementID) update.formElementIDs = formElementID;
    Form.findByIdAndUpdate(formID, {$push: update}, 
        {new: true}, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

deleteFormElement = (req, res) => {
    const { formID, formElementID } = req.body;
    let update = {};
    if (formElementID) update.formElementIDs = formElementID;
    Form.findByIdAndUpdate(formID, {$pull: update}, 
        {new: true}, (err, form) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(form);
    });
}

module.exports = { createForm, getForm, editForm, deleteForm, addFormElement, deleteFormElement }