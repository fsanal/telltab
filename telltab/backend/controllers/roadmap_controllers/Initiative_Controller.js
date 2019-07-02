const Initiative = require('../../models/roadmap/Initiative');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;


getInitiative = (req, res) => {
    const id = req.params.id;
    Initiative.findById(id, (err, initiative) => {
        if (err) return res.json({success: false, error: err});
        return res.json(initiative);
    });
}

createInitiative = (req, res) => {
    const { title, roadmapID } = req.body;
    let initiative = new Initiative(
        {
            created: new Date(),
            title: title,
            numReqs: 0,
            roadmap: ObjectId(roadmapID)
        }
    );
    initiative.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json(initiative);
    });
}

editInitiative = (req, res) => {
    const { id, title, numReqs, roadmapID } = req.body;
    let update = {};
    if (title) update.title = title; 
    if (numReqs) update.numReqs = numReqs;
    if (roadmapID) update.roadmap = ObjectId(roadmapID);
    Initiative.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, initiative) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(initiative);
    });
}

deleteInitiative = (req, res) => {
    const id = req.params.id;
    Initiative.findByIdAndRemove(id, (err, initiative) => {
        if (err) return res.send(err);
        return res.json(initiative);
    });
}

module.exports = { getInitiative, createInitiative, editInitiative, deleteInitiative };