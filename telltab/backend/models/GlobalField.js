const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var globalFieldSchema = new Schema({
    fieldName: String,
    searchable: Boolean,
    filterable: Boolean,
    sortable: Boolean
});

var GlobalField = mongoose.model("GlobalField", globalFieldSchema);

module.exports = GlobalField; 