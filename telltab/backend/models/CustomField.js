const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed, ObjectId } = Schema.Types

var customFieldSchema = new Schema({
    post: {type: ObjectId, ref: 'Post'},
    requirement: {type: ObjectId, ref: 'Requirement'},
    user: {type: ObjectId, ref: 'User'},
    fieldname: String,
    type: {type: String, required: true},
    data: Mixed
});

var CustomField = mongoose.model("CustomField", customFieldSchema);

module.exports = CustomField; 