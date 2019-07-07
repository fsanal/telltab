const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var forumSchema = new Schema({
    created: Date,
    name: {type: String, required: true},
    product: {type: ObjectId, ref: 'Product'},
    numPosts: Number,
    url: String
});

var Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum; 