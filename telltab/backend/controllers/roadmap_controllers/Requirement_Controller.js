const Requirement = require('../../models/roadmap/Requirement');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

getRequirement = (req, res) => {
    const id = req.params.reqID;
    Requirement.findById(id, (err, requirement) => {
        if (err) return res.json({success: false, error: err});
        return res.json(requirement);
    });
}

createRequirement = (req, res) => {
    const { initiativeID, beginDate, endDate, purpose, timeblockID, priority, value, personaID,
    title, body, visibilityIDs, tagIDs, authorID, assignmentIDs, customFields } = req.body;
    let requirement = new Requirement(
        {
            created: new Date(),
            purpose: purpose,
            timeblock: ObjectId(timeblockID),
            author: ObjectId(authorID)
        }
    );
    if (initiativeID) requirement.initiative = initiativeID;
    if (beginDate) requirement.beginDate = beginDate; 
    if (endDate) requirement.endDate = endDate;
    if (priority) requirement.priority = priority;
    if (value) requirement.value = value;
    if (personaID) requirement.persona = ObjectId(personaID);
    if (title) requirement.title = title;
    if (body) requirement.body = body;
    if (visibilityIDs) {
        requirement.visibility = visibilityIDs.map(visibilityID => ObjectId(visibilityID));
    }
    if (tagIDs) {
        requirement.tags = tagIDs.map(tagID => ObjectId(tagID));
    }
    if (assignmentIDs) {
        requirement.assignmentss = assignmentIDs.map(assignmentID => ObjectId(assignmentID));
    }
    requirement.save((err) => {
        if (err) res.json({success: false, error: err});
        res.json(requirement);
    });
}

editRequirement = (req, res) => {
    const { id, initiativeID, beginDate, endDate, purpose, timeblockID, priority, value, personaID,
        title, body, authorID } = req.body;
    let update = {};
    if (initiativeID) update.initiative = ObjectId(initiativeID); 
    if (beginDate) update.beginDate = beginDate;
    if (endDate) update.endDate = endDate;
    if (purpose) update.purpose = purpose;
    if (timeblockID) update.timeblock = ObjectId(timeblockID);
    if (priority) update.priority = priority;
    if (value) update.value = value;
    if (personaID) update.persona = ObjectId(personaID);
    if (title) update.title = title;
    if (body) update.body = body;
    if (author) update.author = ObjectId(authorID);
    Requirement.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

deleteRequirement = (req, res) => {
    const { id } = req.params;
    Requirement.findByIdAndRemove(id, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

addVisibility = (req, res) => {
    const { id, visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibilityIDs = ObjectId(visibilityID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

removeVisibility = (req, res) => {
    const { id, visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibilityIDs = ObjectId(visibilityID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

addTag = (req, res) => {
    const { id, tagID } = req.body;
    let update = {};
    if (tagID) update.tagIDs = ObjectId(tagID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

deleteTag = (req, res) => {
    const { id, tagID } = req.body;
    let update = {};
    if (tagID) update.tagIDs = ObjectId(tagID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

addAssignment = (req, res) => {
    const { id, assignmentID } = req.body;
    let update = {};
    if (assignmentID) update.assignmentIDs = ObjectId(assignmentID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

deleteAssignment = (req, res) => {
    const { id, assignmentID } = req.body;
    let update = {};
    if (assignmentID) update.assignmentIDs = ObjectId(assignmentID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}



module.exports = { getRequirement, createRequirement, editRequirement, deleteRequirement, 
    addVisibility, removeVisibility, addTag, deleteTag, addAssignment, deleteAssignment };