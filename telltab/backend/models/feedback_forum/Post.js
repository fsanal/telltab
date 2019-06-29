const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var postSchema = new Schema({
    postID: { type: ObjectId, index: true},
    boardID: ObjectId,
    bucketID: ObjectId,
    created: Date,
    name: String,
    roadmapIDs: { type: [ObjectId], index: true, required: true },
    numPosts: Number,
    url: String
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post; 