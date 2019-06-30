const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var voteSchema = new Schema({
    userID: ObjectId,
    postID: ObjectId,
    commentID: ObjectId,
    created: Date,
    url: String
});

var Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote; 