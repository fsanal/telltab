const Vote = require('../../models/feedback_forum/Vote');
var mongoose = require('mongoose')


// how to make sure vote doesnt have both post and comment ID
createVote = (req, res) => {
    const { userID, postID, commentID, url } = req.body;
    let vote = new Vote(
        {
            userID: userID,
            created: new Date()
        }
    );
    if (url !== undefined) vote.url = url;
    if (postID !== undefined) {
        vote.postID = postID
    } else if (commentID !== undefined) {
        vote.commentID = commentID
    }
    vote.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(vot);
    });
}

getVote = (req, res) => {
    Vote.findById(req.param.voteID, (err, vote) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(vote);
    });
}

deleteVote = (req, res) => {
    const { voteID } = req.param;
    Vot.findByIdAndRemove(voteID, (err, vote) => {
        if (err) return res.json({ success: false, error: err });
        return res.json(vote);
    });
}