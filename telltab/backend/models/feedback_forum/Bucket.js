const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var bucketSchema = new Schema({
    bucketID: { ObjectId, index: true},
    created: Date,
    name: String,
    boardID: { type: ObjectId, index: true },
    numPosts: Number,
    url: String
});

var Bucket = mongoose.model("Bucket", bucketSchema);

module.exports = Bucket; 