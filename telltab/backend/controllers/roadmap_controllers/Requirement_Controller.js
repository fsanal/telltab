const Requirement = require('../../models/roadmap/Requirement');
var mongoose = require('mongoose');

getRequirement = (req, res) => {
    const id = req.params.reqID;
    let requirement = Requirement.findById(id) = () => {
        if (err) {
            res.json({success: false, error: err});
        }
    }
    res.json(requirement);
}

createRequirement = (req, res) => {
    const { initiativeID, beginDate, endDate, purpose, timeblockID, priority, value, personaID,
    title, body, visibilityIDs, tagIDs, author, assignmentIDs, customFields } = req.body;
    let requirement = new Requirement(
        {
            created: new Date(),
            purpose: purpose,
            timeblockID: timeblockID,
            author: author
        }
    );
    if (initiativeID !== undefined) {
        requirement.initiativeID = initiativeID;
    }
    if (beginDate !== undefined) {
        requirement.beginDate = beginDate;
    }
    if (endDate !== undefined) {
        requirement.endDate = endDate;
    }
    if (priority !== undefined) {
        requirement.priority = priority;
    }
    if (value !== undefined) {
        requirement.value = value;
    }
    if (personaID !== undefined) {
        requirement.personaID = personaID;
    }
    if (title !== undefined) {
        requirement.title = title;
    }
    if (body !== undefined) {
        requirement.body = body;
    }
    if (visibilityIDs !== undefined) {
        requirement.visibilityIDs = visibilityIDs;
    }
    if (tagIDs !== undefined) {
        requirement.tagIDs = tagIDs;
    }
    if (assignmentIDs !== undefined) {
        requirement.assignmentIDs = assignmentIDs;
    }
    if (customFields !== undefined) {
        requirement.customFields = customFields;
    }

    requirement.save((err) => {
        if (err) res.json({success: false, error: err});
        res.json(requirement);
    });
}

editRequirement = (req, res) => {
    const { initiativeID, beginDate, endDate, purpose, timeblockID, priority, value, personaID,
        title, body, visibilityIDs, tagIDs, author, assignmentIDs, customFields } = req.body;
    let update = {};
    if (initiativeID) update.initiativeID = initiativeID; 
    if (beginDate) update.beginDate = beginDate;
    if (endDate) update.endDate = endDate;
    if (purpose) update.purpose = purpose;
    if (timeblockID) update.timeblockID = timeblockID;
    if (priority) update.priority = priority;
    if (value) update.value = value;
    if (personaID) update.personaID = personaID;
    if (title) update.title = title;
    if (body) update.body = body;
    if (visibilityIDs) update.visibilityIDs = visibilityIDs;
    if (tagIDs) update.tagIDs = tagIDs;
    if (author) update.author = author;
    if (assignmentIDs) update.assignmentIDs = assignmentIDs;
    if (customFields) update.customFields = customFields;
    Requirement.findByIdAndUpdate(req.query.requirementID, {$set: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

deleteRequirement = (req, res) => {
    const { reqID } = req.param;
    Requirement.findByIdAndRemove(reqID, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

addVisibility = (req, res) => {
    const { reqID, visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibilityIDs = visibilityID;
    Requirement.findByIdAndUpdate(reqID, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

removeVisibility = (req, res) => {
    const { reqID, visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibilityIDs = visibilityID;
    Requirement.findByIdAndUpdate(reqID, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

addTag = (req, res) => {
    const { reqID, tagID } = req.body;
    let update = {};
    if (tagID) update.tagIDs = tagID;
    Requirement.findByIdAndUpdate(reqID, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

deleteTag = (req, res) => {
    const { reqID, tagID } = req.body;
    let update = {};
    if (tagID) update.tagIDs = tagID;
    Requirement.findByIdAndUpdate(reqID, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}


addAssignment = (req, res) => {
    const { reqID, assignmentID } = req.body;
    let update = {};
    if (assignmentID) update.assignmentIDs = assignmentID;
    Requirement.findByIdAndUpdate(reqID, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}

deleteAssignment = (req, res) => {
    const { reqID, assignmentID } = req.body;
    let update = {};
    if (assignmentID) update.assignmentIDs = assignmentID;
    Requirement.findByIdAndUpdate(reqID, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(requirement);
    });
}


module.exports = { getRequirement, createRequirement, editRequirement, deleteRequirement, addVisibility, removeVisibility, addTag, deleteTag, addAssignment, deleteAssignment };