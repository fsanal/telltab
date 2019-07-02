const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types

var productSchema = new Schema({
    created: Date,
    name: {type: String, required: true},
    url: String
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product; 