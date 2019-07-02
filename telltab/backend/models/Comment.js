const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var commentSchema = new Schema({
	created: Date,
	post: ObjectId,
	requirement: ObjectId,
	newRelease: ObjectId,
	parent: ObjectId,
	numVotes: Number,
	author: ObjectId,
	content: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
