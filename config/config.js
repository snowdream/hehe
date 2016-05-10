var nconf = require('nconf'),
    path = require('path'),
    randomstring = require("randomstring");

//nconf.use('file', { file: path.join(__dirname, 'config.json') });
//nconf.use('file', { file:'config.json' });
nconf.argv()
    .env()
    .file({ file: '../config.json' });

module.exports = nconf;