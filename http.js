 'use strict';

var express = require('express'); // do not change this line
var server = express();
//var cookieParser = require('cookie-parser')

//server.use(cookieParser())

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways



//MISSING
server.get('/missing', function(req, res) {
    res.status(404);
    res.set({ 'Content-Type': 'text/plain' });
    res.send('your princess is in another castle');
    //res.end();
});
//REDIRECT
server.get('/redirect', function(req, res) {
    res.status(302);
    res.set({
        'Content-Type': 'text/plain',
        'Location': '/redirected'
        });
    res.end();
});
//CACHE
server.get('/cache', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain',
        'Cache-Control': 'max-age=86400'
        });
    res.send('cache this resource');
});
//COOKIE
server.get('/cookie', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain',
        'Set-Cookie':'hello=world'
        });
        console.log('* cookie... ' + req.cookie);
    res.send('i gave you a cookie');
});
//CHECK
server.get('/check', function(req, res) {
    res.status(200);
    res.set({
        'Content-Type': 'text/plain',
        });

    if(req.headers.cookie === undefined) {
      res.send('no');
    } else {
        var cookies = req.headers.cookie.split(',');
        var str = '';
        console.log('1 cookies... ' + cookies);

        for (var i=0; i < cookies.length; i += 1) {
          var cookie = cookies[i].split('=');
          if(cookie[0].trim() === 'hello') {
              str = cookie[1].trim();
          }
        }
      }
    console.log('2 str ... ' + str);

    if(str === 'world') {
        res.send('yes');
    }
    else { res.send('no'); }
    //res.end();
});


server.listen(process.env.PORT || 8080);



// examples which serve as a specification for the required features:
//   http://localhost:8080/missing should return a status code 404 with 'your princess is in another castle' in plain text
//   http://localhost:8080/redirect should redirect the request to '/redirected' by using 302 as the status code
//   http://localhost:8080/cache should return 'cache this resource' in plain text and set the cache max age to a day
//   http://localhost:8080/cookie should return 'i gave you a cookie' in plain text and set 'hello=world' as a cookie

//   http://localhost:8080/check should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
