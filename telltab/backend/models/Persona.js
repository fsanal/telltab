const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

var personaSchema = new Schema({
	created: Date,
	flair: String,
	description: String,
	isPM: Bool,
	isAdmin: Bool,
	tagIDs: {type: [ObjectId], index: true},
	roadMapConfig: String,
	customFields: {type: Map, of: Mixed}
});

var Persona = mongoose.model("Persona", personaSchema);

module.exports = Persona;
