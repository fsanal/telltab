const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var newReleaseSchema = new Schema({
    requirement: {type: ObjectId, ref: 'Requirement'},
    forum: {type: ObjectId, ref: 'Forum'},
    author: {type: ObjectId, ref: 'User'},
    form: {type: ObjectId, ref: 'Form'},
    title: String,
    body: String,
    created: Date,
    url: String
});

var NewRelease = mongoose.model("NewRelease", newReleaseSchema);

module.exports = NewRelease; 