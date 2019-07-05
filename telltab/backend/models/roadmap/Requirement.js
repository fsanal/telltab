const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

var requirementSchema = new Schema({
    initiative: ObjectId,
    timeblock: ObjectId,
    persona: ObjectId,
    author: ObjectId,
    created: {type: Date, required: true},
    beginDate: Date,
    endDate: Date,
    purpose: String,
    priority: Number,
    value: Number,
    body: String,
    visibility: { type: [ObjectId], index: true, ref: 'Persona'},
    tags: { type: [ObjectId], index: true, ref: 'Tag'},
    assignments: { type: [ObjectId], index: true, ref: 'User'},
    customFields: [Mixed],
    title: 
        {
            type: String,
            es_indexed: true,
            es_boost: 2
        },
    body: 
        {
            type: String,
            es_indexed: true
        },
});

requirementSchema.plugin(mongoosastic, { esClient });

var Requirement = mongoose.model("Requirement", requirementSchema);

module.exports = Requirement; 