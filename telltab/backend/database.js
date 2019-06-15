// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// this will be our data base's data structure
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

var Data = mongoose.model("Data", DataSchema);

// Feedback Schema
var feedbackSchema = new Schema({
    feedbackId: ObjectId,
    companyId: ObjectId,
    userId: ObjectId,
    content: {type: String, require: true},
    votes: {type: Number, require: true},
    progress: {type: String, require: true},
    admin: {type: Boolean, require: true},
    category: {type: String, require: true},
    // tags: [{
    //     user: ObjectId,
    //     values: Schema.Types.Mixed
    // }],
    tags: {type: [String], require: true},
    priority: {type: String, require: true},
    visibility: {type: Boolean, require: true},
    resolved: {type: Boolean, require: true}
});

var Feedback = mongoose.model("Feedback", feedbackSchema);

// Group Schema
var groupSchema = new Schema({
    groupId: ObjectId,
    companyId: ObjectId,
    name: {type: String, require: true},
    users: {type: [String], require: true}
});

var Group = mongoose.model("Group", groupSchema);

// Comment Schema
var commentSchema = new Schema({
    commentId: ObjectId,
    feedbackId: ObjectId,
    userId: ObjectId,
    content: {type: String, require: true}
});

var Comment = mongoose.model("Comment", commentSchema);

// Company Schema
var companySchema = new Schema({
    companyId: ObjectId,
    companyName: {type: String, require: true},
    config: {type: String, require: true},
    tags: {type: [String], require: true}
});

var Company = mongoose.model("Company", companySchema);

// export the new Schema so we could modify it using Node.js
//module.exports = mongoose.model("Data", DataSchema);
module.exports = {
    Data: Data,
    Feedback: Feedback,
    Group: Group,
    Comment: Comment,
    Company: Company
};
