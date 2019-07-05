const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

var postSchema = new Schema({
    forum: ObjectId,
    bucket: ObjectId,
    personas: { type: [ObjectId], index: true, ref: 'Persona'},
    author: ObjectId,
    visibility: { type: [ObjectId], index: true, ref: 'Persona'},
    requirements: { type: [ObjectId], index: true, ref: 'Requirement'},
    assignments: {type: [ObjectId], index: true, ref: 'User'},
    tags: { type: [ObjectId], index: true, ref: 'Tag'},
    roadmap: ObjectId,
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
    progress: String,
    numComments: Number,
    numVotes: Number,
    url: String,
    customFields:{ type: [ObjectId], index: true}
});

postSchema.plugin(mongoosastic, { esClient });

var Post = mongoose.model("Post", postSchema);


module.exports = { Post, esClient }; 