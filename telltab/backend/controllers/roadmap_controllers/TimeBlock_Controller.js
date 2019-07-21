const Timeblock = require('../../models/roadmap/Timeblock');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

getTimeblock = (req, res) => {
    const id = req.params.id;
    Timeblock.findById(id).populate('roadmap').exec(function(err, timeblock) {
        if (err) return res.json({success: false, error: err});
        return res.json(timeblock);
    });
}

createTimeblock = (req, res) => {
    const { title, roadmapID, beginDate, endDate } = req.body;
    let timeblock = new Timeblock(
        {
            created: new Date(),
            title: title,
            roadmap: ObjectId(roadmapID)
        }
    );
    if (beginDate) timeblock.beginDate = beginDate;
    if (endDate) timeblock.endDate = endDate;
    timeblock.save((err, timeblock) => {
        if (err) return res.json({success: false, error: err});
        timeblock.populate('roadmap', (err, timeblock) => {
            if (err) return res.json({success: false, error: err});
            return res.json(timeblock);
        });
    });
}

editTimeblock = (req, res) => {
    const { id } = req.params;
    const { title, beginDate, endDate } = req.body;
    let update = {};
    if (title) update.title = title; 
    if (beginDate) update.beginDate = beginDate;
    if (endDate) update.endDate = endDate;
    Timeblock.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, timeblock) => {
        if (err) return res.json({ success: false, error: err });
        timeblock.populate('roadmap', (err, timeblock) => {
            if (err) return res.json({success: false, error: err});
            return res.json(timeblock);
        });
    });
}

deleteTimeblock = (req, res) => {
    const id = req.params.id;
    Timeblock.findByIdAndRemove(id, (err, timeblock) => {
        if (err) return res.send(err);
        timeblock.populate('roadmap', (err, timeblock) => {
            if (err) return res.json({success: false, error: err});
            return res.json(timeblock);
        });
    });
}

retrieveTimeblocks = (req, res) => {
    const { roadmapID, title, beginDate, endDate } = req.body;
	let query = Timeblock.find();
	if (roadmapID) query.where('roadmap').equals(roadmapID);
	query.populate('roadmap').exec((err, timeblocks) => {
		if (err) return res.json({success: false, error: err });
		return res.json(timeblocks);
	});
}

module.exports = { getTimeblock, createTimeblock, editTimeblock, deleteTimeblock, retrieveTimeblocks };