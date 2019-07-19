const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var timeblockSchema = new Schema({
    roadmap: {type: ObjectId, ref: 'RoadMap'},
    created: {type: Date, required: true},
    title: {type: String, required: true},
    beginDate: String,
    endDate: String
});

var TimeBlock = mongoose.model("TimeBlock", timeblockSchema);

module.exports = TimeBlock;