const Widget = require('../../models/widget/Widget');
var mongoose = require('mongoose')

createWidget = (req, res) => {
    const { boardID, type, embeddableIDs, orientation, 
        height, width, color, backgroundColor, font, formID } = req.body;
    let widget = new Widget({
        created: new Date(),
        boardID,
        type,
        formID
    });
    if (orientation) { widget.orientation = orientation } else {
        widget.orientation = "left";
    } 
    if (width) { widget.width = width } else widget.width = 50;
    if (height) { widget.height = height } else widget.height = 100;
    if (font) widget.font = font;
    if (backgroundColor) {widget.backgroundColor = backgroundColor} 
    else {
        widget.backgroundColor = "white";
    }
    if (color) widget.color = color;
    if (embeddableIDs) widget.embeddableIDs = embeddableIDs;
    widget.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

getWidget = (req, res) => {
    Widget.findById(req.param.widgetID, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

editWidget = (req, res) => {
    const { widgetID, boardID, orientation, 
        height, width, color, 
        backgroundColor, font, formID } = req.body;
    let update = {};
    if (width) update.width = width; 
    if (height) update.height = height;
    if (backgroundColor) update.backgroundColor = backgroundColor;
    if (font) update.font = font;
    if (color) update.color = color;
    if (formID) update.formID = formID;
    if (boardID) update.boardID = boardID;
    if (orientation) update.orientation = orientation;
    Widget.findByIdAndUpdate(widgetID, {$set: update}, 
        {new: true}, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

deleteWidget = (req, res) => {
    const { widgetID } = req.param;
    Widget.findByIdAndRemove(widgetID, 
        (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

addEmbeddable = (req, res) => {
    const { widgetID, embeddableID } = req.body;
    let update = {};
    if (embeddableID) update.embeddableIDs = embeddableID;
    Widget.findByIdAndUpdate(widgetID, {$push: update}, 
        {new: true}, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

deleteEmbeddable = (req, res) => {
    const { widgetID, embeddableID } = req.body;
    let update = {};
    if (embeddableID) update.embeddableIDs = embeddableID;
    Widget.findByIdAndUpdate(widgetID, {$pull: update}, 
        {new: true}, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

module.exports = { createWidget, getWidget, editWidget, deleteWidget, addEmbeddable, deleteEmbeddable }