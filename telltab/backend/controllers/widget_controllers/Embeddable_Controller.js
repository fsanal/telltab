const Embeddable = require('../../models/widget/Embeddable');
var mongoose = require('mongoose')

createEmbeddable = (req, res) => {
    const { type, order, fontSize, font, 
        color, imageUrl, url } = req.body;
    let embeddable = new Embeddable(
        {
            type,
            order,
            fontSize,
            font,
            color,
            created: new Date(),
        }
    );
    if (imageUrl) embeddable.imageUrl = imageUrl;
    if (url) embeddable.url = url;
    embeddable.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(embeddable);
    });
}

getEmbeddable = (req, res) => {
    Embeddable.findById(req.params.id, 
        (err, embeddable) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(embeddable);
    });
}

editEmbeddable = (req, res) => {
    const { id } = req.params;
    const { type, order, fontSize, font, color, imageUrl, url } = req.body;
    let update = {};
    if (type) update.type = type; 
    if (order) update.order = order;
    if (fontSize) update.fontSize = fontSize;
    if (font) update.font = font;
    if (color) update.color = color;
    if (imageUrl) update.imageUrl = imageUrl;
    if (url) update.url = url;
    Embeddable.findByIdAndUpdate(id, {$set: update}, 
        {new: true}, (err, embeddable) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(embeddable);
    });
}

deleteEmbeddable = (req, res) => {
    const { id } = req.params;
    Embeddable.findByIdAndRemove(id, 
        (err, embeddable) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(embeddable);
    });
}

module.exports = {createEmbeddable, getEmbeddable, editEmbeddable, deleteEmbeddable}