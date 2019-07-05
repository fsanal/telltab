const mongoose = require("mongoose")
const mongoosastic = require("mongoosastic")
const elasticsearch = require("elasticsearch")
const Schema = mongoose.Schema;
const { ObjectId} = Schema.Types;

var userSchema = new Schema({
	created: Date,
	externalID: String,
	name: {type: String, es_indexed: true},
	email: String,
	password: String,
	personas: [{type: ObjectId, index: true, ref: 'Persona'}],
	isAuth: Boolean,
	notificationPref: {type: [Boolean]},
	url: String,
	imageUrl: String,
	customFields: [ObjectId]
});

var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

userSchema.plugin(mongoosastic, {
	esClient: esClient
});

var User = mongoose.model("User", userSchema);



module.exports = User;
