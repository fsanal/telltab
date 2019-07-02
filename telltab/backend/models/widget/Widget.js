const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

var widgetSchema = new Schema({
    created: Date,
    forum: ObjectId,
    embeddables: {type: [ObjectId], index: true},
    form: ObjectId,
    type: String,
    orientation: String,
    height: Number,
    width: Number,
    color: String,
    backgroundColor: String,
    font: String
});

var Widget = mongoose.model("Widget", widgetSchema);

module.exports = Widget; 