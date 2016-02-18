'use strict';

var assert = require('assert');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/botkit_express_demo';
const config = {mongoUri: mongoUri};

// let clog = debug;
let clog = console.log;

clog('testing');


function testFields(configuration) {
	clog('testFields');
	if (
		configuration.storage.teams &&
		configuration.storage.teams.get &&
		configuration.storage.teams.save &&

		configuration.storage.users &&
		configuration.storage.users.get &&
		configuration.storage.users.save &&

		configuration.storage.channels &&
		configuration.storage.channels.get &&
		configuration.storage.channels.save
	) {
		clog('** Using custom storage system.');
	} else {
		clog('storage required fields dont exist');
	}

}

let Storage = require('./mongo');
let db = Storage.connect(config);

db.then(function() {
	clog('connected');
	let botkit_mongo_storage = Storage.setup(db);
	testFields(botkit_mongo_storage);
});
