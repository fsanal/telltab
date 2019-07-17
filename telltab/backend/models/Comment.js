const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic")
const elasticsearch = require("elasticsearch")
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var commentSchema = new Schema({
	created: Date,
	parent: {type: ObjectId, ref: 'Comment'},
	post: {type: ObjectId, ref: 'Post'},
	sourcePost: {type: ObjectId, ref: 'Post'},
	requirement: {type: ObjectId, ref: 'Requirement'},
	newRelease: {type: ObjectId, ref: 'NewRelease'},
	numVotes: Number,
	author: {type: ObjectId, ref: 'User'},
	content: String
});

var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

commentSchema.plugin(mongoosastic, {
	esClient: esClient
});

var Comment = mongoose.model("Comment", commentSchema);


module.exports = Comment;
