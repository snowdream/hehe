var nconf = require('nconf'),
    path = require('path'),
    randomstring = require("randomstring");

//nconf.use('file', { file: path.join(__dirname, 'config.json') });
//nconf.use('file', { file:'config.json' });
nconf.argv()
    .env()
    .file({ file: 'config.json' });

nconf.set('cookieSecret', randomstring.generate());
nconf.set('db:host', 'localhost');
nconf.set('db:port', '27017');
nconf.set('db:name', 'venus');
nconf.set('db:username', 'snowdream');
nconf.set('db:password', '123456');

console.log(nconf.get('db'));

nconf.save(function (err) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Configuration saved successfully.');
});

module.exports = nconf;