const TimeBlock = require('../../models/roadmap/TimeBlock');
var mongoose = require('mongoose');

getTimeBlock = (req, res) => {
    const id = req.params.id;
    let timeblock = TimeBlock.findById(id) = () => {
        if (err) {
            res.json({success: false, error: err});
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
            beginDate: beginDate,
            endDate: endDate
        }
    );
    if (beginDate !== undefined) {
        roadmap.beginDate = beginDate;
    }
    if (endDate !== undefined) {
        roadmap.endDate = endDate;
    }

    timeblock.save((err) => {
        if (err) res.json({success: false, error: err});
        res.json(timeblock);
    });
}

editTimeBlock = (req, res) => {
    const { title, beginDate, endDate } = req.body;
    let update = {};
    if (title) update.title = title; 
    if (beginDate) update.beginDate = beginDate;
    if (endDate) update.endDate = endDate;
    TimeBlock.findByIdAndUpdate(req.query.timeblockID, {$set: update}, {new: true}, (err, timeblock) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(timeblock);
    });
}

deleteTimeBlock = (req, res) => {
    const id = req.params.id;
    TimeBlock.findByIdAndRemove(id, (err) => {
        if (err) res.send(err);
        res.json({sucess: true});
    });
}

module.exports = { getTimeBlock, createTimeBlock, editTimeBlock, deleteTimeBlock };