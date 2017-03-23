/**
 * Created by mike on 3/22/17.
 */
'use strict';

/*
Using restify because it is a solid lightweight Node RESTful framework to handle all the routing bits.
 */
var restify = require('restify');
var jwt = require('jwt-simple');
var server = restify.createServer();

const KEY = 'THISISMYSUPERSECRETKEY';
/*
loading hardcoded username/password data. Wouldn't load a json file like this is a real word scenario, because this data
will only be read once and cached, and this is also synchronous, but for this simple example it will suffice
 */
var users = require('./lib/data/users.json');

//Enable CORS plugin
restify.CORS.ALLOW_HEADERS.push('authorization');
server.use(restify.CORS({
    origins: [ 'http://localhost:3000' ],
    credentials: true
}));
server.use(restify.bodyParser());

function auth(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    //returns a JSON web token if the user is authorized, otherwise returns null
    var token = authenticate(username, password);

    if(token) {
        res.send(token);
        next();
    } else {
        return next(new restify.UnauthorizedError("Invalid username or password."));
    }

}

function hey(req, res, next) {
    res.send('Hey ' + req.user.name + ', You made it!');
    next();
}

function authenticate (username, password) {
    //This is a very simple jwt token and doesn't handle anything like expiration
    for (var i = 0; users.length > i; i += 1) {
        if (users[i].username === username && users[i].password === password) {
            var user = {
                "name": users[i].name,
                "username": users[i].username
            };

            user.token = jwt.encode({ sub: user }, KEY, 'HS256');

            return user;
        }
    }

    return "";
}

function ensureAuthenticated (req, res, next) {
    if(req.header('Authorization')) {
        var token = req.header('Authorization').split(' ')[1];
        var payload = null;

        //decode the supplied bearer token and ensure it has not been tampered with
        try {
            payload = jwt.decode(token, KEY, false, 'HS256');
        }
        catch (err) {
            return next(new restify.UnauthorizedError(err.message));
        }

        req.user = payload.sub;

        next();
    } else {
        return next(new restify.UnauthorizedError());
    }
}

server.post('/auth/', auth);
//This endpoint is secured via the jwt token
server.get('/hey/', ensureAuthenticated, hey);

server.listen(3002, function() {
    console.log('%s listening', server.name);
});