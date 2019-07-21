const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

var requirementSchema = new Schema({
    roadmap: {type: ObjectId, ref: 'Roadmap'},
    initiative: {type: ObjectId, ref: 'Initiative'},
    timeblock: {type: ObjectId, ref: 'Timeblock'},
    persona: {type: ObjectId, ref: 'Persona'},
    author: {type: ObjectId, ref: 'User'},
    created: Date,
    beginDate: String,
    endDate: String,
    purpose: String,
    priority: Number,
    value: Number,
    visibility: [{ type: ObjectId, index: true, ref: 'Persona'}],
    tags: [{ type: ObjectId, index: true, ref: 'Tag'}],
    assignments: [{ type: ObjectId, index: true, ref: 'User'}],
    customFields: [{ type: ObjectId, index: true, ref: 'CustomField'}],
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