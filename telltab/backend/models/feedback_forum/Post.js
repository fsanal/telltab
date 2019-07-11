const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

var postSchema = new Schema({
    forum: {type: ObjectId, es_indexed: true, ref: 'Forum'},
    bucket: {type: ObjectId, es_indexed:true, ref: 'Bucket'},
    personas: [{ type: ObjectId, index: true, es_indexed: true, ref: 'Persona'}],
    author: {type: ObjectId, es_indexed: true, ref: 'User'},
    visibility: [{ type: ObjectId, es_indexed: true, index: true, ref: 'Persona'}],
    requirements: [{ type: ObjectId, index: true, ref: 'Requirement'}],
    assignments: [{type: ObjectId, index: true, ref: 'User'}],
    tags: [{ type: ObjectId, es_indexed: true, index: true, ref: 'Tag'}],
    roadmap: {type: ObjectId, ref: 'RoadMap'},
    created: Date,
    title:
        {
            type: String,
            es_indexed: true,
        },
    body: 
        {
            type: String,
            es_indexed: true
        },
    value: Number,
    parent: ObjectId,
    progress: {type: String, es_indexed: true},
    numComments: Number,
    numVotes: Number,
    url: String,
    customFields:{ type: [ObjectId], index: true, ref: 'CustomField'}
});

postSchema.plugin(mongoosastic, { esClient });

var Post = mongoose.model("Post", postSchema);


module.exports = { Post, esClient }; 