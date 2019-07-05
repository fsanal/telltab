const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types


var postSchema = new Schema({
    forum: ObjectId,
    bucket: ObjectId,
    persona: ObjectId,
    author: ObjectId,
    visibility: { type: [ObjectId], index: true, ref: 'Persona'},
    requirements: { type: [ObjectId], index: true, ref: 'Requirement'},
    assignments: {type: [ObjectId], index: true, ref: 'User'},
    tags: { type: [ObjectId], index: true, ref: 'Tag'},
    created: Date,
    title: String,
    body: String,
    value: Number,
    progress: String,
    numComments: Number,
    numVotes: Number,
    url: String,
    customFields:{ type: [ObjectId], index: true}
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post; 