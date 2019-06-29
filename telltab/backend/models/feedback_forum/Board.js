const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var boardSchema = new Schema({
    boardID: ObjectId,
    created: Date,
    name: String,
    roadmapIDs: { type: [ObjectId], index: true },
    numPosts: Number,
    url: String
});

var Board = mongoose.model("Board", boardSchema);

module.exports = Board; 