const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var requirementSchema = new Schema({
    created: {type: Date, required: true},
    initiative: Initiative,
    beginDate: Date,
    endDate: Date,
    purpose: String,
    timeBlock: TimeBlock,
    priority: Number,
    value: Number,
    persona: Persona,
    title: String,
    body: String,
    visibility: { type: [ObjectId], index: true}, //Persona
    tags: { type: [ObjectId], index: true}, //Tag
    author: User,
    assignments: { type: [ObjectId], index: true}, //User
    customFields: {type: Map, of: Mixed}
});

var Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = Requirement; 