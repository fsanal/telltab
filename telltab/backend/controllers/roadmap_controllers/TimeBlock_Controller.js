const TimeBlock = require('../../models/roadmap/TimeBlock');
var mongoose = require('mongoose');

getTimeBlock = (req, res) => {
    const id = req.params.id;
    let timeblock = TimeBlock.findById(id) = () => {
        if (err) {
            return res.json({success: false, error: err});
        }
    }
    res.json(timeblock)
}

createTimeBlock = (req, res) => {
    const { title, beginDate, endDate } = req.body;
    let timeblock = new TimeBlock(
        {
            created: new Date(),
            title: title,
        }
    );
    if (beginDate !== undefined) {
        roadmap.beginDate = beginDate;
    }
    if (endDate !== undefined) {
        roadmap.endDate = endDate;
    }
    timeblock.save((err) => {
        if (err) return res.json({success: false, error: err});
        return res.json(timeblock);
    });
}

editTimeBlock = (req, res) => {
    const { timeblockID, title, beginDate, endDate } = req.body;
    let update = {};
    if (title) update.title = title; 
    if (beginDate) update.beginDate = beginDate;
    if (endDate) update.endDate = endDate;
    TimeBlock.findByIdAndUpdate(timeblockID, {$set: update}, {new: true}, (err, timeblock) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(timeblock);
    });
}

deleteTimeBlock = (req, res) => {
    const id = req.params.id;
    TimeBlock.findByIdAndRemove(id, (err, timeblock) => {
        if (err) return res.send(err);
        return res.json(timeblock);
    });
}

module.exports = { getTimeBlock, createTimeBlock, editTimeBlock, deleteTimeBlock };