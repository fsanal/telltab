const Comment = require('../models/Comment');
var mongoose = require('mongoose')

createComment = (req, res) => {
	const { requirementID, postID, newReleaseID, parentID, authorID, content } = req.body
	let comment = new Comment({
		authorID,
		created: new Date(),
		content
	})
	if (postID) { comment.postID = postID } else if (parentID) {
		comment.parentID = parentID;
	} else if (requirementID) {
		comment.requirementID = requirementID;
	} else if (newReleaseID) {
		comment.newReleaseID = newReleaseID;
	}
	comment.save((err) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}

getComment  = (req, res) => {
	Comment.findById(req.params.commentID, (err, comment) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}

editComment = (req, res) => {
	const { content, commentID } = req.body;
	let update = {};
	if (content) update.content = content;
	Comment.findByIdAndUpdate ( commentID, { $set: update }, { new: true }, ( err, comment) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}

deleteComment = (req, res) => {
	Comment.findByIdAndRemove ( req.params.commentID, ( err, comment) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}


module.exports = { createComment, getComment, editComment, deleteComment }