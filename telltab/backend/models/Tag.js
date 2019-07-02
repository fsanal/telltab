const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

var tagSchema = new Schema({
	created: Date,
	name: String,
	product: String,
	numPosts: Number,
	numReqs: Number,
	url: String,
	customFields: {type: Map, of: Mixed}
});

var Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
