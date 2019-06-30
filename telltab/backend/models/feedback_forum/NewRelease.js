const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var newReleaseSchema = new Schema({
    requirementID: ObjectId,
    boardID: ObjectId,
    authorID: ObjectId,
    title: String,
    body: String,
    formID: ObjectId,
    created: Date,
    url: String
});

var NewRelease = mongoose.model("NewRelease", newReleaseSchema);

module.exports = NewRelease; 