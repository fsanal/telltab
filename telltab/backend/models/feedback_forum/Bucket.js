const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var bucketSchema = new Schema({
    boardID: {type: ObjectId, required: true},
    created: {type: Date, required: true},
    name: {type: String, required: true},
    numPosts: {type: Number, required: true},
    url: String
});

var Bucket = mongoose.model("Bucket", bucketSchema);

module.exports = Bucket; 