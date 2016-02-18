'use strict';

var MongoClient = require('mongodb'),
    co = require('co'),
    debug = require('debug')('mongo-storage')
    ;

let Storage = {};

/**
 * botkit-storage-mongo - MongoDB driver for Botkit
 *
 * @param  {Object} config Mongo config
 * @return {Object} query result
 */
Storage.connect = function(config) {
    // let db = MongoStorage.init(config);
    let db = MongoClient.connect('mongodb://localhost:27017/mongo-drivers');
    return db;
};

Storage.setup = function(db) {
    debug('setup with', db);

    var Teams = db.collection('teams'),
        Users = db.collection('users'),
        Channels = db.collection('channels'),
        Stories = db.collection('stories');

    var unwrapFromList = function(cb) {
        return function(err, data) {
            if (err) { return cb(err); }
            cb(null, data);
        };
    };

    var storage = {

        teams: {
            get: function(id, cb) {
                Teams.findOne({id: id}, unwrapFromList(cb));
            },
            save: function(data, cb) {
                Teams.findAndModify({
                    id: data.id
                }, data, {
                    upsert: true,
                    new: true
                }, cb);
            },
            all: function(cb) {
                Teams.find({}, cb);
            }
        },
        users: {
            get: function(id, cb) {
                Users.findOne({id: id}, unwrapFromList(cb));
            },
            save: function(data, cb) {
                Users.findAndModify({
                    id: data.id
                }, data, {
                    upsert: true,
                    new: true
                }, cb);
            },
            all: function(cb) {
                Users.find({}, cb);
            }
        },
        channels: {
            get: function(id, cb) {
                Channels.findOne({id: id}, unwrapFromList(cb));
            },
            save: function(data, cb) {
                Channels.findAndModify({
                    id: data.id
                }, data, {
                    upsert: true,
                    new: true
                }, cb);
            },
            all: function(cb) {
                Channels.find({}, cb);
            }
        }
    };

    return storage;
}

module.exports = Storage;
