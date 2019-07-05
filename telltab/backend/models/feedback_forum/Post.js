const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Mixed, ObjectId} = Schema.Types
const mongoosastic = require('mongoosastic');
const elasticsearch = require('elasticsearch');
var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

var postSchema = new Schema({
    forum: ObjectId,
    bucket: ObjectId,
    persona: ObjectId,
    author: ObjectId,
    roadmap: ObjectId,
    visibility: { type: [ObjectId], index: true},
    requirements: { type: [ObjectId], index: true},
    assignments: {type: [ObjectId], index: true},
    tags: { type: [ObjectId], index: true},
    created: Date,
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
    value: Number,
    progress: String,
    numComments: Number,
    numVotes: Number,
    url: String,
    customFields: {type: Map, of: Mixed}
});

postSchema.plugin(mongoosastic, { esClient });

var Post = mongoose.model("Post", postSchema);


module.exports = { Post, esClient }; 