const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

var widgetSchema = new Schema({
    created: Date,
    forum: {type: ObjectId, ref: 'Forum'},
    embeddables: [{type: ObjectId, index: true, ref: 'Embeddable'}],
    form: {type: ObjectId, ref: 'Form'},
    type: String,
    orientation: String,
    height: Number,
    width: Number,
    color: String,
    backgroundColor: String,
    font: String
});

widgetSchema.plugin(mongoosastic, { esClient });

var Widget = mongoose.model("Widget", widgetSchema);

module.exports = { Widget, esClient }; 