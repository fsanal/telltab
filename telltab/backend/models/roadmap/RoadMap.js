const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var roadmapSchema = new Schema({
    product: {type: ObjectId, ref: 'Product'},
    created: {type: Date, required: true},
    name: {type: String, required: true},
    numReqs: Number,
    url: String
});

var Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap; 