const newRelease = require('../../models/feedback_forum/newRelease');
var mongoose = require('mongoose')

createNewRelease = (req, res) => {
    const { boardID, bucketID, requirementID, authorID, formID, title, body, url } = req.body;
    let newRelease = new NewRelease(
        {
            title, 
            body,
            boardID,
            requirementID,
            authorID,
            created: new Date(),
        }
    );
    if (url) newRelease.url = url;
    if (bucketID) newRelease.bucketID = bucketID;
    if (formID) newRelease.formID = formID;
    newRelease.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(newRelease);
    });
}

getNewRelease = (req, res) => {
    NewRelease.findById(req.param.newReleaseID, (err, newRelease) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(newRelease);
    });
}

editNewRelease = (req, res) => {
    const { newReleaseID, title, body, formID, boardID, bucketID, url } = req.body;
    let update = {};
    if (title) update.title = title;
    if (body) update.body = body;
    if (bucketID) update.bucketID = bucketID;
    if (formID) update.formID = formID;
    if (boardID) update.boardID = boardID; 
    if (url) update.url = url
    NewRelease.findByIdAndUpdate(newReleaseID, {$set: update}, {new: true}, (err, newRelease) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(newRelease);
    });
}

deleteNewRelease = (req, res) => {
    const { newReleaseID } = req.param;
    Post.findByIdAndRemove(newReleaseID, (err, newRelease) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(newRelease);
    });
}

module.exports = { createNewRelease, getNewRelease, editNewRelease, deleteNewRelease }


