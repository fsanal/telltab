const Widget = require('../../models/widget/Widget');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

createWidget = (req, res) => {
    const { forumID, type, embeddableIDs, orientation, 
        height, width, color, backgroundColor, font, formID } = req.body;
    let widget = new Widget({
        created: new Date(),
        forum: ObjectId(forumID),
        type,
        form: ObjectId(formID)
    });
    if (orientation) { widget.orientation = orientation } else {
        widget.orientation = "left";
    } 
    if (width) { widget.width = width } else widget.width = 50;
    if (height) { widget.height = height } else widget.height = 100;
    if (font) widget.font = font;
    if (backgroundColor) widget.backgroundColor = backgroundColor;
    if (color) widget.color = color;
    if (embeddableIDs) widget.embeddables = embeddableIDs.map(embeddableID => ObjectId(embeddableID));
    widget.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

getWidget = (req, res) => {
    Widget.findById(req.params.id, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

editWidget = (req, res) => {
    const { id, forumID, orientation, 
        height, width, color, 
        backgroundColor, font, formID } = req.body;
    let update = {};
    if (width) update.width = width; 
    if (height) update.height = height;
    if (backgroundColor) update.backgroundColor = backgroundColor;
    if (font) update.font = font;
    if (color) update.color = color;
    if (formID) update.form = ObjectId(formID);
    if (forumID) update.forum = ObjectId(forumID);
    if (orientation) update.orientation = orientation;
    Widget.findByIdAndUpdate(id, {$set: update}, 
        {new: true}, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

deleteWidget = (req, res) => {
    const { id } = req.params;
    Widget.findByIdAndRemove(id, 
        (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

addEmbeddable = (req, res) => {
    const { id, embeddableID } = req.body;
    let update = {};
    if (embeddableID) update.embeddableIDs = ObjectId(embeddableID);
    Widget.findByIdAndUpdate(id, {$push: update}, 
        {new: true}, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

deleteEmbeddable = (req, res) => {
    const { id, embeddableID } = req.body;
    let update = {};
    if (embeddableID) update.embeddableIDs = ObjectId(embeddableID);
    Widget.findByIdAndUpdate(id, {$pull: update}, 
        {new: true}, (err, widget) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(widget);
    });
}

module.exports = { createWidget, getWidget, editWidget, deleteWidget, addEmbeddable, deleteEmbeddable }