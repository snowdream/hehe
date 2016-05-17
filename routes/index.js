var express = require('express');
var router = express.Router();
var accepts = require('accepts')

/* GET home page. */
router.get('/', function (req, res, next) {
    var session = req.session;
    session.count = session.count || 0;
    var n = ++session.count;

    var accept = accepts(req);

    // the order of this list is significant; should be server preferred order
    switch (accept.type([ 'html','json'])) {
        case 'json':
            res.json({"title": "Express", "content": "Welcome to Express","times":n});
            break;
        case 'html':
            res.render('index', {title: 'Express,Times:'+n});
            break;
        default:
            // the fallback is text/plain, so no need to specify it above
            res.setHeader('Content-Type', 'text/plain');
            res.write('hello, world!,Times:'+n);
            res.end();
            break;
    }
});

module.exports = router;
