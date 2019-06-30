const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var newReleaseSchema = new Schema({
    requirementID: ObjectId,
    boardID: {type: ObjectId, required: true},
    userID: {type: ObjectId, required: true},
    title: String,
    body: String,
    formID: ObjectId,
    created: {type: Date, required: true},
    url: String
});

var NewRelease = mongoose.model("NewRelease", newReleaseSchema);

module.exports = NewRelease; 