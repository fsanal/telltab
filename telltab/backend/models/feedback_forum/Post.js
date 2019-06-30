const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed, ObjectId} = Schema.Types


var postSchema = new Schema({
    boardID: {type: ObjectId, required: true},
    bucketID: ObjectId,
    personaID: ObjectId,
    authorID: {type: ObjectId, required: true},
    visibilityIDs: { type: [ObjectId], index: true},
    requirementIDs: { type: [ObjectId], index: true},
    tagIDs: { type: [ObjectId], index: true},
    created: {type: Date, required: true},
    title: {type: String, required: true},
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