const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var requirementSchema = new Schema({
    initiative: ObjectId,
    timeBlock: ObjectId,
    persona: ObjectId,
    author: ObjectId,
    created: {type: Date, required: true},
    beginDate: Date,
    endDate: Date,
    purpose: String,
    priority: Number,
    value: Number,
    title: String,
    body: String,
    visibility: { type: [ObjectId], index: true}, //Persona
    tags: { type: [ObjectId], index: true}, //Tag
    assignments: { type: [ObjectId], index: true}, //User
    customFields: {type: Map, of: Mixed}
});

var Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = Requirement; 