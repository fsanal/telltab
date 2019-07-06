const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic")
const elasticsearch = require("elasticsearch")
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var commentSchema = new Schema({
	created: Date,
	post: ObjectId,
	requirement: ObjectId,
	newRelease: ObjectId,
	parent: ObjectId,
	source: ObjectId,
	numVotes: Number,
	author: ObjectId,
	content: String
});

var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

commentSchema.plugin(mongoosastic, {
	esClient: esClient
});

var Comment = mongoose.model("Comment", commentSchema);


module.exports = Comment;
