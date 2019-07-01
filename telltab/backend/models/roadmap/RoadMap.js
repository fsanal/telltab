const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var roadmapSchema = new Schema({
    created: {type: Date, required: true},
    name: {type: String, required: true},
    numReqs: Number,
    url: String
});

var RoadMap = mongoose.model("RoadMap", roadmapSchema);

module.exports = RoadMap; 