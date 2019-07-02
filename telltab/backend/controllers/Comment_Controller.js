const Comment = require('../models/Comment')
var mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

createComment = (req, res) => {
	const { requirementID, postID, newReleaseID,
		 parentID, authorID, content } = req.body
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

getComment  = (req, res) => {
	Comment.findById(req.params.id, (err, comment) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}

editComment = (req, res) => {
	const { content, id } = req.body;
	let update = {};
	if (content) update.content = content;
	Comment.findByIdAndUpdate ( id, { $set: update }, { new: true }, ( err, comment) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}

deleteComment = (req, res) => {
	Comment.findByIdAndRemove ( req.params.id, ( err, comment) => {
		if (err) return res.json({success: false, error: err})
		return res.json(comment)
	});
}


module.exports = { createComment, getComment, editComment, deleteComment }