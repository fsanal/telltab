const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var commentSchema = new Schema({
	created: Date,
	postID: ObjectId,
	requirementID: ObjectId,
	newReleaseID: ObjectId,
	parentID: ObjectId,
	numVotes: Number,
	authorID: ObjectId,
	content: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
