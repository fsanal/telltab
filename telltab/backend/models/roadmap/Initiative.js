const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var initiativeSchema = new Schema({
    created: {type: Date, required: true},
    title: {type: String, required: true},
    numReqs: Number,
    roadmapID: ObjectId
});

var Initiative = mongoose.model("Initiative", initiativeSchema);

module.exports = Initiative; 