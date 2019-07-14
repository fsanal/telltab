const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var voteSchema = new Schema({
    user: {type: ObjectId, ref: 'User'},
    post: {type: ObjectId, ref: 'Post'},
    forum: {type: ObjectId, ref: 'Forum'},
    comment: {type: ObjectId, ref: 'Comment'},
    created: Date,
    url: String
});

var Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote; 