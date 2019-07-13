const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

var tagSchema = new Schema({
	created: Date,
	name: {type: String, index: true},
	product: ObjectId,
	numPosts: Number,
	numReqs: Number,
	url: String
});

var Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
