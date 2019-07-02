const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed, ObjectId} = Schema.Types


var postSchema = new Schema({
    forum: ObjectId,
    bucket: ObjectId,
    persona: ObjectId,
    author: ObjectId,
    visibility: { type: [ObjectId], index: true},
    requirements: { type: [ObjectId], index: true},
    assignments: {type: [ObjectId], index: true},
    tags: { type: [ObjectId], index: true},
    created: Date,
    title: String,
    body: String,
    value: Number,
    progress: String,
    numComments: Number,
    numVotes: Number,
    url: String,
    customFields: {type: Map, of: Mixed}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post; 