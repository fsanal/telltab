const Requirement = require('../../models/roadmap/Requirement');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

getRequirement = (req, res) => {
    const { id } = req.params;
    Requirement.findById(id).populate('roadmap').populate('initiative').populate('timeblock')
    .populate('persona').populate('author').populate('visibility').populate('tags')
    .populate('assignments').exec(function(err, requirement) {
        if (err) return res.json({success: false, error: err});
        return res.json(requirement);
    });
}

createRequirement = (req, res) => {
    const { roadmapID, initiativeID, beginDate, endDate, purpose, timeblockID, priority, value, personaID,
    title, body, visibilityIDs, tagIDs, authorID, assignmentIDs } = req.body;
    let requirement = new Requirement(
        {
            created: new Date(),
            purpose: purpose,
            timeblock: ObjectId(timeblockID),
            author: ObjectId(authorID)
        }
    );
    if (roadmapID) requirement.roadmap = roadmapID;
    if (initiativeID) requirement.initiative = initiativeID;
    if (beginDate) requirement.beginDate = beginDate; 
    if (endDate) requirement.endDate = endDate;
    (priority) ? requirement.priority = priority : requirement.priority = 0;
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
        requirement.assignments = assignmentIDs.map(assignmentID => ObjectId(assignmentID));
    }
    console.log("1: " + requirement);
    requirement.save((err, requirement) => {
        if (err) res.json({success: false, error: err});
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

editRequirement = (req, res) => {
    const { id } = req.params;
    const { roadmapID, initiativeID, beginDate, endDate, purpose, timeblockID, priority, value, personaID,
        title, body, authorID } = req.body;
    let update = {};
    if (roadmapID) update.roadmap = ObjectId(roadmapID);
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
    if (authorID) update.author = ObjectId(authorID);
    Requirement.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

deleteRequirement = (req, res) => {
    const { id } = req.params;
    Requirement.findByIdAndRemove(id, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

addVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

removeVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

addTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

deleteTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

addAssignment = (req, res) => {
    const { id } = req.params;
    const { assignmentID } = req.body;
    let update = {};
    if (assignmentID) update.assignments = ObjectId(assignmentID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

deleteAssignment = (req, res) => {
    const { id } = req.params;
    const { assignmentID } = req.body;
    let update = {};
    if (assignmentID) update.assignments = ObjectId(assignmentID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

createCustomField = (req, res) => {
    const { id } = req.params;
    const { fieldID } = req.body;
    let update = {};
    if (fieldID) update.customFields = ObjectId(fieldID);
    Requirement.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

deleteCustomField = (req, res) => {
    const { id } = req.params;
    const { fieldID } = req.body;
    let update = {};
    if (fieldID) update.customFields = ObjectId(fieldID);
    Requirement.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, requirement) => {
        if (err) return res.json({ success: false, error: err });
        requirement.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments', (err, requirement) => {
            if (err) res.json({success: false, error: err});
            return res.json(requirement);
        });
    });
}

retrieveRequirements = (req, res) => {
    let { secret, roadmapID, authorID, search, purpose, initiativeID, timeblockID,
        limit, skip, personaID, visibilityIDs, tagIDs, assignmentIDs, sort } = req.body;
    let query, aggregate;

    if (search) {
        let body = {};
        body.query = {
            "bool": {
                "should": [
                    { "match": 
                        { "title": 
                            { "query": search,
                            "fuzziness": "AUTO",
                            "max_expansions": 10,
                            "boost": 2.0
                            }
                        }
                    },
                    { "match": 
                        { "body": 
                            { "query": search,
                            "fuzziness": "AUTO",
                            "max_expansions": 10
                            }
                        }
                    },
                ],
                minimum_should_match: 1
            }
        };
        body.query.bool.filter = [];
        if (roadmapID) body.query.bool.filter.push({ "term": { "roadmap": roadmapID }});
        if (authorID) body.query.bool.filter.push({ "term": { "author": authorID }});
        if (initiativeID) body.query.bool.filter.push({ "term": { "initiative": initiativeID }});
        if (visibilityIDs) body.query.bool.filter.push({ "terms": { "visibility": visibilityIDs }});
        if (tagIDs) body.query.bool.filter.push({  "terms": { "tags": tagIDs }});
        if (personaID) body.query.bool.filter.push({  "term": { "persona": personaID }});
        if (timeblockID) body.query.bool.filter.push({  "term": { "timeblock": timeblockID }});
        if (assignmentIDs) body.query.bool.filter.push({  "terms": { "assignments": assignmentIDs }});
        if (purpose) body.query.bool.filter.push({ "term": { "purpose": purpose }});
        if (skip) body.from = Number(skip);
        if (limit) body.size = Number(limit);  
        esClient.search({
            index: 'requirements',
            body: body
        }, (err, response, status) => {
            if (err) return res.json(err)
            idArr = response.hits.hits.map(hit => ObjectId(hit._id));   
            aggregate = Requirement.aggregate();
            aggregate.match({ _id : { $in: idArr }});
            aggregate.addFields({ ordering : { $indexOfArray : [ idArr, "$_id" ]}});
            aggregate.sort({ ordering : 1 });
            aggregate.exec( (err, requirements) => {
                if (err) return res.json({success: false, error: err });
                Requirement.populate(requirements, {path: "roadmap initiative timeblock persona author visibility tags assignment"}, (err, requirements) => {
                    if (err) return res.json({success: false, error: err });
                    return res.json(requirements);
                });
            });
        });
    }
    else {
        query = Requirement.find();
        if (roadmapID) query.where('roadmap').equals(roadmapID);
        if (authorID) query.where('author').equals(authorID);
        if (initiativeID) query.where('initiative').equals(initiativeID);
        if (visibilityIDs) query.where('visibility').all(visibilityIDs);
        if (tagIDs) query.where('tags').all(tagIDs);
        if (personaID) query.where('persona').equals(personaID);
        if (timeblockID) query.where('timeblock').equals(timeblockID);
        if (assignmentIDs) query.where('assignments').all(assignmentIDs);
        if (purpose) query.where('purpose').equals(purpose);
        if (limit) query.limit(Number(limit));
        if (skip) query.skip(Number(skip));
        query.populate('roadmap').populate('initiative').populate('timeblock')
        .populate('persona').populate('author').populate('visibility').populate('tags')
        .populate('assignments').exec( (err, requirements) => {
            if (err) return res.json({success: false, error: err });
            return res.json(requirements);
        });
    }
}

module.exports = { getRequirement, createRequirement, editRequirement, deleteRequirement, 
    addVisibility, removeVisibility, addTag, deleteTag, addAssignment, deleteAssignment,
    createCustomField, deleteCustomField, retrieveRequirements };