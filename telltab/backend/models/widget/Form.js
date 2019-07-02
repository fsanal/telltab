const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var formSchema = new Schema({
    created: Date,
    width: Number,
    height: Number,
    font: String,
    color: String,
    backgroundColor: String,
    formElements: {type: [ObjectId], index: true}
});

var Form = mongoose.model("Form", formSchema);

module.exports = Form; 