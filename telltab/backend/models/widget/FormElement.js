const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var formElementSchema = new Schema({
    created: Date,
    order: Number,
    type: String, 
    text: String,
    height: Number,
    width: Number,
    font: String,
    fontSize: Number,
    backgroundColor: String,
    color: String,
    alignment: String,
    customFields: {type: Map, of: String}
});

var FormElement = mongoose.model("FormElement", formElementSchema);

module.exports = FormElement; 