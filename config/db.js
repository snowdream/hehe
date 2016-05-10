var mongoose = require('mongoose'),
    path = require('path'),
    nconf = require('nconf');
var express = require('express');

//load the config file
//nconf.use('file', { file: path.join(__dirname, 'config.json') });
nconf.use('file', { file:'config.json' });

nconf.load();

var dbURI = 'mongodb://'+nconf.get('db:host')+':'+nconf.get('db:port')+'/'+nconf.get('db:name');

// Create the database connection
//mongoose.connect('mongodb://localhost/test');
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully opened
mongoose.connection.on('open', function (callback) {
    console.log('Mongoose default connection open to ' + dbURI);
});

// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection connected to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;