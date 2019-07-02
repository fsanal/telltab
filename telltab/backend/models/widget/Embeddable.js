const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var embeddableSchema = new Schema({
    created: Date,
    type: String,
    order: Number,
    fontSize: Number,
    font: String,
    color: String,
    imageUrl: String,
    url: String
});

var Embeddable = mongoose.model("Embeddable", embeddableSchema);

module.exports = Embeddable; 