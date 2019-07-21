const Roadmap = require('../../models/roadmap/Roadmap');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

createRoadmap = (req, res) => {
    const { name, productID, url } = req.body;
    let roadmap = new Roadmap(
        {
            created: new Date(),
            name: name,
            numReqs: 0,
        }
    );
    if (url) roadmap.url = url;
    if (productID) roadmap.product = ObjectId(productID);
    roadmap.save((err, roadmap) => {
        if (err) return res.json({success: false, error: err});
        roadmap.populate('product', (err, roadmap) => {
            if (err) return res.json({success: false, error: err});
            return res.json(roadmap);
        });
    });
}

getRoadmap = (req, res) => {
    const { id } = req.params;
    Roadmap.findById(id).populate('product').exec(function(err, roadmap) {
        if (err) return res.json({success: false, error: err});
        return res.json(roadmap);
    });
}

getProductRoadmap = (req, res) => {
    const { productID } = req.body;
    let query = Roadmap.find();
    query.where('product').equals(productID);
    query.populate('product').exec((err, roadmap) => {
		if (err) return res.json({success: false, error: err });
		return res.json(roadmap);
	});
}

editRoadmap = (req, res) => {
    const { id } = req.params;
    const { name, productID, url } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (url) update.url = url;
    if (productID) update.product = ObjectId(productID);
    Roadmap.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, roadmap) => {
        if (err) return res.json({ success: false, error: err });
        roadmap.populate('product', (err, roadmap) => {
            if (err) return res.json({success: false, error: err});
            return res.json(roadmap);
        });
    });
}

deleteRoadmap = (req, res) => {
    const id = req.params.id;
    Roadmap.findByIdAndRemove(id, (err, roadmap) => {
        if (err) return res.send(err);
        roadmap.populate('product', (err, roadmap) => {
            if (err) return res.json({success: false, error: err});
            return res.json(roadmap);
        });
    });
}

module.exports = { getRoadmap, createRoadmap, getProductRoadmap, editRoadmap, deleteRoadmap };