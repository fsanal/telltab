const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var timeblockSchema = new Schema({
    roadmap: {type: ObjectId, ref: 'Roadmap'},
    created: {type: Date, required: true},
    title: {type: String, required: true},
    requirements: [{ type: ObjectId, index: true, ref: 'Requirement'}],
    beginDate: String,
    endDate: String
});

var Timeblock = mongoose.model("Timeblock", timeblockSchema);

module.exports = Timeblock;