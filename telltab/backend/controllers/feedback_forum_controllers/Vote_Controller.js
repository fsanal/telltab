const Vote = require('../../models/feedback_forum/Vote');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// how to make sure vote doesnt have both post and comment ID
createVote = (req, res) => {
    let { userID, postID, forumID, commentID, url } = req.body;
    let vote = new Vote(
        {
            user: ObjectId(userID),
            created: new Date()
        }
    );
    if (url) vote.url = url;
    if (postID) {
        vote.post = ObjectId(postID)
    } else if (commentID) {
        vote.comment = ObjectId(commentID)
    }
    if (forumID) vote.forum = ObjectId(forumID);
    vote.save((err, vote) => {
        if (err) return res.json({ success: false, error: err });
        vote.populate('user').populate('forum').populate('post', (err, vote) => {
            if (err) return res.json(err);
            return res.json(vote);
        });
    });
}

getVote = (req, res) => {
    Vote.findById(req.params.id).populate('user').populate('post').populate('comment')
    .exec(function(err, vote) {
        if (err) return res.json({ success: false, error: err });
        return res.json(vote);
    });
}

deleteVote = (req, res) => {
    const { id } = req.params;
    Vote.findByIdAndRemove(id, (err, vote) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(vote);
    });
}

retrieveVotes = (req, res) => {
    let { secret, userID, forumID, postID, newReleaseID, commentID, limit, skip } = req.body;
    let query = Vote.find();
    if (userID) query.where('user').equals(userID);
    if (forumID) query.where('forum').equals(forumID);
    if (postID) query.where('post').equals(postID);
    if (newReleaseID) query.where('comment').equals(commentID);
    if (limit) query.limit(Number(limit));
    if (skip) query.skip(Number(skip));
    query.populate('user').populate('post').populate('comment').exec( (err, votes) => {
        if (err) return res.json({success: false, error: err });
        return res.json(votes);
    });
}
module.exports = { createVote, getVote, deleteVote, retrieveVotes }