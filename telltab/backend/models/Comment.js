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
	numVotes: Number,
	author: ObjectId,
	content: String
});

var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

commentSchema.plugin(mongoosastic, {
	esClient: esClient
});

var Comment = mongoose.model("Comment", commentSchema);

Comment.createMapping(function(err, mapping){  
	if(err){
	  console.log('error creating mapping');
	  console.log(err);
	}else{
	  console.log('mapping created!');
	  console.log(mapping);
	}
});

module.exports = Comment;
