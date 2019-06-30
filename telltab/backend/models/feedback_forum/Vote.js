const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var voteSchema = new Schema({
    userID: {type: ObjectId, required: true},
    postID: ObjectId,
    commentID: ObjectId,
    created: {type: Date, required: true},
    url: String
});

var Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote; 