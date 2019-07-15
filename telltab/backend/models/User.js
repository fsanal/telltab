const mongoose = require("mongoose")
const mongoosastic = require("mongoosastic")
const elasticsearch = require("elasticsearch")
const Schema = mongoose.Schema;
const bcrypt   = require('bcrypt-nodejs');
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
	customFields: { type: [ObjectId], index: true, ref: 'CustomField'},
	facebook: {
		id: String,
		token: String,
		name: String,
		email: String
	}
});

var esClient = new elasticsearch.Client({host: 'https://tr0wmngsvx:sv307a66pr@tt-5489597012.us-east-1.bonsaisearch.net:443'});

userSchema.plugin(mongoosastic, {
	esClient: esClient
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model("User", userSchema);



module.exports = User;
