const RoadMap = require('../../models/roadmap/RoadMap');
var mongoose = require('mongoose');

getRoadMap = (req, res) => {
    const id = req.params.id;
    let roadmap = RoadMap.findById(id) = () => {
        if (err) {
            res.json({success: false, error: err});
        }
    }
    res.json(roadmap);
}

createRoadMap = (req, res) => {
    const { name, numReqs, url } = req.body;
    let roadmap = new RoadMap(
        {
            created: new Date(),
            name: name,
            numReqs: 0,
            url: url
        }
    );
    if (numReqs !== undefined) {
        roadmap.numReqs = numReqs;
    }
    if (url !== undefined) {
        roadmap.url = url;
    }

    roadmap.save((err) => {
        if (err) res.json({success: false, error: err});
        res.json(roadmap);
    });
}

editRoadMap = (req, res) => {
    const { name, numReqs, url } = req.body;
    let update = {};
    if (name) update.name = name; 
    if (numReqs) update.numReqs = numReqs;
    if (url) update.url = url;
    RoadMap.findByIdAndUpdate(req.query.roadmapID, {$set: update}, {new: true}, (err, roadmap) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(roadmap);
    });
}

deleteRoadMap = (req, res) => {
    const id = req.params.id;
    RoadMap.findByIdAndRemove(id, (err) => {
        if (err) res.send(err);
        res.json({sucess: true});
    });
}

module.exports = { getRoadMap, createRoadMap, editRoadMap, deleteRoadMap };