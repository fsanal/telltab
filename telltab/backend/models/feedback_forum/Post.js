const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed, ObjectId} = Schema.Types


var postSchema = new Schema({
    boardID: ObjectId,
    bucketID: ObjectId,
    personaID: ObjectId,
    authorID: ObjectId,
    visibilityIDs: { type: [ObjectId], index: true},
    requirementIDs: { type: [ObjectId], index: true},
    tagIDs: { type: [ObjectId], index: true},
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