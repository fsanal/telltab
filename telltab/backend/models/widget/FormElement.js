const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

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
    customFields: {type: Map, of: Mixed}
});

var FormElement = mongoose.model("FormElement", formElementSchema);

module.exports = FormElement; 