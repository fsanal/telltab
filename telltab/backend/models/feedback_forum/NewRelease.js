const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var newReleaseSchema = new Schema({
    requirement: ObjectId,
    board: ObjectId,
    author: ObjectId,
    form: ObjectId,
    title: String,
    body: String,
    created: Date,
    url: String
});

var NewRelease = mongoose.model("NewRelease", newReleaseSchema);

module.exports = NewRelease; 