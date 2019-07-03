const FormElement = require('../../models/widget/FormElement');
var mongoose = require('mongoose')


createFormElement = (req, res) => {
    const { width, height, type, text, font, fontSize, color, 
        backgroundColor, alignment, order } = req.body;
    let formElement = new FormElement({
        type,
        created: new Date()
    });
    if (width) { formElement.width = width } else formElement.width = 10;
    if (height) { formElement.height = height } else formElement.height = 20;
    if (font) formElement.font = font;
    if (backgroundColor) formElement.backgroundColor = backgroundColor
    if (color) formElement.color = color;
    if (fontSize) formElement.fontSize = fontSize;
    if (alignment) { formElement.alignment = alignment } else {
        formElement.alignment = "center";
    }
    if (order) { formElement.order = order } else {
        formElement.order = 0;
    }
    if (text) formElement.text = text;
    formElement.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(formElement);
    });
}

getFormElement = (req, res) => {
    FormElement.findById(req.params.id, (err, formElement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(formElement);
    });
}

editFormElement = (req, res) => {
    const { id } = req.params;
    const { width, height, font, fontSize, color, 
        backgroundColor, alignment, order } = req.body;
    let update = {};
    if (width) update.width = width; 
    if (height) update.height = height;
    if (backgroundColor) update.backgroundColor = backgroundColor;
    if (font) update.font = font;
    if (color) update.color = color;
    if (fontSize) update.fontSize = fontSize;
    if (alignment) update.alignment = alignment;
    if (order) update.order = order;
    FormElement.findByIdAndUpdate(id, {$set: update}, 
        {new: true}, (err, formElement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(formElement);
    });
}

deleteFormElement = (req, res) => {
    const { id } = req.params;
    FormElement.findByIdAndRemove(id, 
        (err, formElement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(formElement);
    });
}

module.exports = { createFormElement, editFormElement, getFormElement, deleteFormElement }