const RoadMap = require('../../models/roadmap/RoadMap');
var mongoose = require('mongoose');

getRoadMap = (req, res) => {
    const id = req.params.id;
    let roadmap = RoadMap.findById(id) = () => {
        if (err) {
            return res.json({success: false, error: err});
        }
    }
    return res.json(roadmap);
}

createRoadMap = (req, res) => {
    const { name, numReqs, url } = req.body;
    let roadmap = new RoadMap(
        {
            created: new Date(),
            name: name,
            numReqs: 0,
        }
    );
    if (url !== undefined) {
        roadmap.url = url;
    }
    roadmap.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json(roadmap);
    });
}

editRoadMap = (req, res) => {
    const { roadmapID, name, numReqs, url } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (numReqs) update.numReqs = numReqs;
    if (url) update.url = url;
    RoadMap.findByIdAndUpdate(roadmapID, {$set: update}, {new: true}, (err, roadmap) => {
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

module.exports = { getRoadMap, createRoadMap, editRoadMap, deleteRoadMap };