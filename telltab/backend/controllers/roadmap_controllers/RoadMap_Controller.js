const RoadMap = require('../../models/roadmap/RoadMap');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

getRoadMap = (req, res) => {
    const { id } = req.params;
    RoadMap.findById(id, (err, roadmap) => {
        if (err) return res.json({success: false, error: err});
        return res.json(roadmap);
    })
}

createRoadMap = (req, res) => {
    const { name, productID, url } = req.body;
    let roadmap = new RoadMap(
        {
            created: new Date(),
            name: name,
            numReqs: 0,
        }
    );
    if (url) roadmap.url = url;
    if (productID) roadmap.product = ObjectId(productID);
    roadmap.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json(roadmap);
    });
}

editRoadMap = (req, res) => {
    const { id } = req.params;
    const { name, productID, url } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (url) update.url = url;
    if (productID) update.product = ObjectId(productID);
    RoadMap.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, roadmap) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(roadmap);
    });
}

deleteRoadMap = (req, res) => {
    const id = req.params.id;
    RoadMap.findByIdAndRemove(id, (err, roadmap) => {
        if (err) return res.send(err);
        return res.json(roadmap);
    });
}

retrieveRoadMaps = (req, rest) => {
    let { secret, limit, skip } = req.body;
    let query = RoadMap.find();
    if (limit) query.limit(Number(limit));
    if (skip) query.skip(Number(skip));
    query.exec((err, roadmaps) => {
        if (err) return res.json({success: false, error: err });
        return res.json(roadmaps);
    });
}

module.exports = { getRoadMap, createRoadMap, editRoadMap, deleteRoadMap, retrieveRoadMaps };