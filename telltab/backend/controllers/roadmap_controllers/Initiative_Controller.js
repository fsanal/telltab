const Initiative = require('../../models/roadmap/Initiative');
var mongoose = require('mongoose');

getInitiative = (req, res) => {
    const id = req.params.id;
    let initiative = Initiative.findById(id) = () => {
        if (err) {
            res.json({success: false, error: err});
        }
    }
    res.json(initiative);
}

createInitiative = (req, res) => {
    const { title, numReqs, roadmapID } = req.body;
    let initiative = new Initiative(
        {
            created: new Date(),
            title: title,
            numReqs: 0,
            roadmapID: roadmapID
        }
    );
    if (numReqs !== undefined) {
        initiative.numReqs = numReqs;
    }

    initiative.save((err) => {
        if (err) res.json({success: false, error: err});
        res.json(initiative);
    });
}

editInitiative = (req, res) => {
    const { title, numReqs, roadmapID } = req.body;
    let update = {};
    if (title) update.title = title; 
    if (numReqs) update.numReqs = numReqs;
    if (roadmapID) update.roadmapID = roadmapID;
    Initiative.findByIdAndUpdate(req.query.initiativeID, {$set: update}, {new: true}, (err, initiative) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(initiative);
    });
}

deleteInitiative = (req, res) => {
    const id = req.params.id;
    Initiative.findByIdAndRemove(id, (err) => {
        if (err) res.send(err);
        res.json({sucess: true});
    });
}

module.exports = { getInitiative, createInitiative, editInitiative, deleteInitiative };