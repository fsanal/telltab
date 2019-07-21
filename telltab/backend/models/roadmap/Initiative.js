const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var initiativeSchema = new Schema({
    roadmap: {type: ObjectId, ref: 'Roadmap'},
    created: {type: Date, required: true},
    title: {type: String, required: true},
    numReqs: Number
});

var Initiative = mongoose.model("Initiative", initiativeSchema);

module.exports = Initiative; 