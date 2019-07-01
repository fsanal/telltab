const Requirement = require('../../models/roadmap/Requirement');
const Initiative = require('../../models/roadmap/Initiative');
const TimeBlock = require('../../models/roadmap/TimeBlock');
const Persona = require('../../models/Persona')
var mongoose = require('mongoose');

getRequirement = (req, res) => {
    const id = req.params.id;
    let requirement = Requirement.findById(id) = () => {
        if (err) {
            res.json({success: false, error: err});
        }
    }
    res.json(requirement);
}

createRequirement = (req, res) => {
    const { Initiative, beginDate, endDate, purpose, TimeBlock, priority, value, Persona,
    title, body, visibility, tags, author, assignments, customFields } = req.body;
    let requirement = new Requirement(
        {
            created: new Date(),
            purpose: purpose,
            TimeBlock: TimeBlock,
            author: author
        }
    );
    if (Initiative !== undefined) {
        requirement.Initiative = Initiative;
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
    if (Persona !== undefined) {
        requirement.Persona = Persona;
    }
    if (title !== undefined) {
        requirement.title = title;
    }
    if (body !== undefined) {
        requirement.body = body;
    }
    if (visibility !== undefined) {
        requirement.visibility = visibility;
    }
    if (tags !== undefined) {
        requirement.tags = tags;
    }
    if (assignments !== undefined) {
        requirement.assignments = assignments;
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
    const { Initiative, beginDate, endDate, purpose, TimeBlock, priority, value, Persona,
        title, body, visibility, tags, author, assignments, customFields } = req.body;
    let update = {};
    if (Initiative) update.Initiative = Initiative; 
    if (beginDate) update.beginDate = beginDate;
    if (endDate) update.endDate = endDate;
    if (purpose) update.purpose = purpose;
    if (TimeBlock) update.TimeBlock = TimeBlock;
    if (priority) update.priority = priority;
    if (value) update.value = value;
    if (Persona) update.Persona = Persona;
    if (title) update.title = title;
    if (body) update.body = body;
    if (visibility) update.visibility = visibility;
    if (tags) update.tags = tags;
    if (author) update.author = author;
    if (assignments) update.assignments = assignments;
    if (customFields) update.customFields = customFields;
    Requirement.findByIdAndUpdate(req.query.requirementID, {$set: update}, {new: true}, (err, requirement) => {
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