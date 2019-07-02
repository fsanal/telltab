const Initiative = require('../../models/roadmap/Initiative');
var mongoose = require('mongoose');

getInitiative = (req, res) => {
    const id = req.params.id;
    let initiative = Initiative.findById(id) = () => {
        if (err) {
            return res.json({success: false, error: err});
        }
    }
    return res.json(initiative);
}

createInitiative = (req, res) => {
    const { title, roadmapID } = req.body;
    let initiative = new Initiative(
        {
            created: new Date(),
            title: title,
            numReqs: 0,
            roadmapID: roadmapID
        }
    );
    initiative.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json(initiative);
    });
}

editInitiative = (req, res) => {
    const { initiativeID, title, numReqs, roadmapID } = req.body;
    let update = {};
    if (title) update.title = title; 
    if (numReqs) update.numReqs = numReqs;
    if (roadmapID) update.roadmapID = roadmapID;
    Initiative.findByIdAndUpdate(initiativeID, {$set: update}, {new: true}, (err, initiative) => {
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