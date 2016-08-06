'use strict';

var express = require('express'); // do not change this line
var session = require('express-session'); // do not change this line

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways
// you will need to use the session middleware to store the data

var server = express();
var visited = {};

server.use(session({
  'store': new session.MemoryStore(),
  'secret': 'slug',
  'resave': false,
  'saveUninitialized': false,
  'cookie': { 'maxAge': 86400 }
  })
);

server.get('/*', function(req, res) {
  res.status(200);
  res.set({ 'Content-Type': 'text/plain' });

  //console.log('the cookies... ' + JSON.stringify(req.session.cookie));

  if(req.session.example === undefined) {
    req.session.example = [];
    req.session.example.push(req.path);
    res.send('you must be new');
  }
  else {
    //console.log('url... ' + req.url);
    var history = 'your history:';
        for(var i = 0; i < req.session.example.length; i += 1 ) {
            history += '\n  ';
            history += req.session.example[i];
        }
    res.write(history);
    req.session.example.push(req.path);
    res.end();
  }
});

server.listen(process.env.PORT || 8080);


// examples which serve as a specification for the required features, note that they have an order:
//   http://localhost:8080/hello should return 'you must be new' in plain text and set an ident cookie
//   http://localhost:8080/test should return 'your history:\n  /hello' in plain text
//   http://localhost:8080/world should return 'your history:\n  /hello\n  /test' in plain text
//   [now sending requests from a different browser]
//   http://localhost:8080/lorem should return 'you must be new' in plain text and set an ident cookie
//   http://localhost:8080/moshimoshi should return 'your history:\n  /lorem' in plain text
//   http://localhost:8080/ipsum should return 'your history:\n  /lorem\n  /moshimoshi' in plain text
//   [sending requests from the original browser again]
//   http://localhost:8080/again should return 'your history:\n  /hello\n  /test\n /world' in plain text
//   [the server restarts and looses all cookies]
//   http://localhost:8080/servus should return 'you must be new' in plain text and set an ident cookie
