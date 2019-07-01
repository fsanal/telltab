const Post = require('../../models/feedback_forum/Post');
var mongoose = require('mongoose')

createPost = (req, res) => {
    const { boardID, bucketID, authorID, visibilityIDs, personaID, tagIDs, assignmentIDs,
        title, body, progress, requirementIDs, url, customFields } = req.body;
    let post = new Post(
        {
            title,
            boardID,
            authorID,
            created: new Date(),
            numComments: 0,
            numVotes: 0
        }
    );
    if (url !== undefined) post.url = url;
    if (body !== undefined) post.body = body;
    if (bucketID !== undefined) post.bucketID = bucketID;
    if (visibilityIDs !== undefined) post.visibilityIDs = visibilityIDs;
    if (personaID !== undefined) post.personaID = personaID;
    if (tagIDs !== undefined) post.tagIDs = tagIDs;
    if (assignmentIDs !== undefined) post.assignmentIDs = assignmentIDs;
    if (progress !== undefined) post.progress = progress;
    if (requirementIDs !== undefined) post.requirementIDs = requirementIDs;
    if (customFields !== undefined) post.customFields = customFields;
    post.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

getPost = (req, res) => {
    Post.findById(req.param.postID, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

/// What if the bucket is not in the boardID specified?

editPost = (req, res) => {
    const { title, body, progress, postID, boardID, bucketID, personaID, url } = req.body;
    let update = {};
    if (title) update.title = title;
    if (body) update.body = body;
    if (progress) update.progress = progress;
    if (boardID) update.boardID = boardID;
    if (bucketID) update.bucketID = bucketID; 
    if (personaID) update.personaID = personaID;
    if (url) update.url = url
    Post.findByIdAndUpdate(postID, {$set: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deletePost = (req, res) => {
    const { postID } = req.param;
    Post.findByIdAndRemove(postID, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

addVisibility = (req, res) => {
    const { postID, visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibilityIDs = visibilityID;
    Post.findByIdAndUpdate(postID, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

removeVisibility = (req, res) => {
    const { postID, visibilityID } = req.body;
    let update = {};
    if (visibilityID) update.visibilityIDs = visibilityID;
    Post.findByIdAndUpdate(postID, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

addTag = (req, res) => {
    const { postID, tagID } = req.body;
    let update = {};
    if (tagID) update.tagIDs = tagID;
    Post.findByIdAndUpdate(postID, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteTag = (req, res) => {
    const { postID, tagID } = req.body;
    let update = {};
    if (tagID) update.tagIDs = tagID;
    Post.findByIdAndUpdate(postID, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

assignPost = (req, res) => {
    const { postID, userID } = req.body;
    let update = {};
    if (userID) update.assignmentIDs = userID;
    Post.findByIdAndUpdate(postID, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deassignPost = (req, res) => {
    const { postID, userID } = req.body;
    let update = {};
    if (userID) update.assignmentIDs = userID;
    Post.findByIdAndUpdate(postID, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

addRequirement = (req, res) => {
    const { postID, reqID } = req.body;
    let update = {};
    if (reqID) update.requirementIDs = userID;
    Post.findByIdAndUpdate(postID, {$push: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

deleteRequirement = (req, res) => {
    const { postID, reqID } = req.body;
    let update = {};
    if (reqID) update.requirementIDs = userID;
    Post.findByIdAndUpdate(postID, {$pull: update}, {new: true}, (err, post) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(post);
    });
}

module.exports = { createPost, getPost, editPost, deletePost, 
    addVisibility, removeVisibility, addTag, deleteTag, addRequirement, 
    deleteRequirement, assignPost, deassignPost }