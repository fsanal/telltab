const Vote = require('../../models/feedback_forum/Vote');
var mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

// how to make sure vote doesnt have both post and comment ID
createVote = (req, res) => {
    let { userID, postID, commentID, url } = req.body;
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
    vote.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(vote);
    });
}

getVote = (req, res) => {
    Vote.findById(req.params.id, (err, vote) => {
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

module.exports = { createVote, getVote, deleteVote }