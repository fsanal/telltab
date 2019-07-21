const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

var personaSchema = new Schema({
	created: Date,
	flair: String,
	description: String,
	isPM: Boolean,
	isAdmin: Boolean,
	tags: [{type: ObjectId, index: true, ref: 'Tag'}],
	product: {type: ObjectId, ref: 'Product'},
	roadmapConfig: String,
	customFields: {type: Map, of: Mixed}
});

var Persona = mongoose.model("Persona", personaSchema);

module.exports = Persona;
