const { Post, esClient } = require('../../models/feedback_forum/Post');
const { Comment } = require('../../models/Comment');
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const mongoosastic = require('mongoosastic');

createPost = (req, res) => {
    const { forumID, bucketID, authorID, visibilityIDs, personaIDs, tagIDs, assignmentIDs,
        title, body, progress, requirementIDs, url } = req.body;
    let post = new Post(
        {
            title,
            forum: ObjectId(forumID),
            author: ObjectId(authorID),
            created: new Date(),
            numComments: 0,
            numVotes: 0
        }
    );
    if (url) post.url = url;
    if (body) post.body = body;
    if (bucketID) post.bucket = ObjectId(bucketID);
    if (visibilityIDs) {
        post.visibility = visibilityIDs.map(visibilityID => ObjectId(visibilityID))
    }
    if (personaIDs) post.personas = personaIDs.map(personaID =>ObjectId(personaID));
    if (tagIDs) {
        post.tags = tagIDs.map(tagID => ObjectId(tagID));
    }
    if (assignmentIDs) {
        post.assignments = assignmentIDs.map(assignmentID => ObjectId(assignmentID));
    } 
    if (progress) post.progress = progress;
    if (requirementIDs) {
        post.requirements = requirementIDs.map(requirementID => ObjectId(requirementID));
    }
    post.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

getPost = (req, res) => {
    Post.findById(req.params.id).populate('personas').populate('visibility').populate('requirements').populate('assignments').populate('tags').exec(function(err, post) {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

/// What if the bucket is not in the forumID specified?

editPost = (req, res) => {
    const { id } = req.params;
    const { title, body, progress, forumID, bucketID, personaIDs, url } = req.body;
    let update = {};
    if (title) update.title = title;
    if (body) update.body = body;
    if (progress) update.progress = progress;
    if (forumID) update.forum = ObjectId(forumID);
    if (bucketID) update.bucket = ObjectId(bucketID); 
    if (url) update.url = url
    Post.findByIdAndUpdate(id, {$set: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deletePost = (req, res) => {
    const { id } = req.params;
    Post.findByIdAndRemove(id, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        post.remove((err) => {
            if (err) return res.json({ success: false, error: err });
        });
        return res.json(post);
    });
}



retrievePosts = (req, res) => {
    let { forumID, authorID, bucketID, personas, 
        visibilityIDs, tagIDs, assignmentIDs, 
        sort, progress, limit, skip, search } = req.body;
    let query, aggregate;
    
    if ( search ) {
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
        if (forumID) body.query.bool.filter.push({ "term": { "forum": forumID }});
        if (authorID) body.query.bool.filter.push({ "term": { "author": authorID }});
        if (bucketID) body.query.bool.filter.push({ "term": { "bucket": bucketID }});
        if (visibilityIDs) body.query.bool.filter.push({ "terms": { "visibility": visibilityIDs }});
        if (tagIDs) body.query.bool.filter.push({  "terms": { "tags": tagIDs }});
        if (personas) body.query.bool.filter.push({  "terms": { "personas": personaIDs }});
        if (assignmentIDs) body.query.bool.filter.push({  "terms": { "assignments": assignmentIDs }});
        if (progress) body.query.bool.filter.push({ "term": { "progress": progress }});
        if (skip) body.from = Number(skip);
        if (limit) body.size = Number(limit);  
        esClient.search({
            index: 'posts',
            body: body
        }, (err, response, status) => {
            if (err) return res.json(err)
            idArr = response.hits.hits.map(hit => ObjectId(hit._id));   
            aggregate = Post.aggregate();
            aggregate.match({ _id : { $in: idArr }});
            aggregate.addFields({ ordering : { $indexOfArray : [ idArr, "$_id" ]}});
            aggregate.sort({ ordering : 1 });
            aggregate.exec( (err, posts) => {
                if (err) return res.json({success: false, error: err });
                return res.json(posts);
            });
        });
    } else {
        query = Post.find();
        if (forumID) query.where('forum').equals(forumID);
        if (authorID) query.where('author').equals(authorID);
        if (bucketID) query.where('bucket').equals(bucketID);
        //if (personaID) query.where('persona').equals(personaID);
        if (visibilityIDs) query.where('visibility').all(visibilityIDs);
        if (tagIDs) query.where('tags').all(tagIDs);
        if (assignmentIDs) query.where('assignments').all(assignmentIDs);
        if (progress) query.where('progress').equals(progress);
        if (limit) query.limit(Number(limit));
        if (skip) query.skip(Number(skip));
        query.exec( (err, posts) => {
            if (err) return res.json({success: false, error: err });
            return res.json(posts);
        });
    }
}

addPersona = (req, res) => {
    const { id } = req.params;
    const { personaID } = req.body;
    let update = {};
    if (personaID) update.personas = ObjectId(personaID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deletePersona = (req, res) => {
    const { id } = req.params;
    const { personaID } = req.body;
    let update = {};
    if (personaID) update.personas = ObjectId(personaID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}


addVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

removeVisibility = (req, res) => {
    const { id } = req.params;
    const { visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibility = ObjectId(visibilityID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}


addTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteTag = (req, res) => {
    const { id } = req.params;
    const { tagID } = req.body;
    let update = {};
    if (tagID) update.tags = ObjectId(tagID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

assignPost = (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let update = {};
    if (userID) update.assignments = ObjectId(userID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deassignPost = (req, res) => {
    const { id } = req.params;
    const { userID } = req.body;
    let update = {};
    if (userID) update.assignments = ObjectId(userID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

addRequirement = (req, res) => {
    const { id } = req.params;
    const { reqID } = req.body;
    let update = {};
    if (reqID) update.requirements = ObjectId(reqID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteRequirement = (req, res) => {
    const { id } = req.params;
    const { reqID } = req.body;
    let update = {};
    if (reqID) update.requirements = ObjectId(reqID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

createCustomField = (req, res) => {
    const { id } = req.params;
    const { fieldID } = req.body;
    let update = {};
    if (fieldID) update.customFields = ObjectId(fieldID);
    Post.findByIdAndUpdate(id, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteCustomField = (req, res) => {
    const { id } = req.params;
    const { fieldID } = req.body;
    let update = {};
    if (fieldID) update.customFields = ObjectId(fieldID);
    Post.findByIdAndUpdate(id, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

createMergedPost = (req, res) => {
    const { parentID, childID, requirementID, postID, newReleaseID,
            authorID, content } = req.body
    let comment = new Comment({
        author: ObjectId(authorID),
        created: new Date(),
        content
    })
    if (postID) { comment.post = ObjectId(postID) } else if (parentID) {
        comment.parent = ObjectId(parentID);
    } else if (requirementID) {
        comment.requirement = ObjectId(requirementID);
    } else if (newReleaseID) {
        comment.newRelease = ObjectId(newReleaseID);
    }
    comment.save((err) => {
        if (err) return res.json({success: false, error: err})
        return res.json(comment)
    });
}




module.exports = { createPost, getPost, editPost, deletePost, 
    addVisibility, removeVisibility, addTag, deleteTag, addRequirement, 
    deleteRequirement, assignPost, deassignPost, retrievePosts, createCustomField,
    deleteCustomField, createMergedPost }