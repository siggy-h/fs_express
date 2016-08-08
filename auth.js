'use strict';

var express = require('express'); // do not change this line
var passport = require('passport'); // do not change this line
var strategy = require('passport-http'); // do not change this line

// create an express server just like in the first exercise
// as shown in the examples, you are asked to implement authentication check
// the authentication check will only grant the
//      user "test" with the password "logmein" acces
// use the passport middleware with the basic strategy from passport-http to solve this exercise
// note that since we are using the basic strategy, there is no need for a session
// should the server restart, a user that already authenticated will thus not need to login

var express = require('express');
var server = express();

    server.get('/hello', function(req, res) {
        res.status(200);
        res.set({ 'Content-Type': 'text/pain' });
        res.send('accessible to everyone');
    });

    server.get( '/*', function(req, res) {

        passport.use( new strategy.BasicStrategy (
              function(username, password, done) {
                  User.findOne({ username: 'test', password: 'logmein' },
                      function (err, user) {
                          if (err) { return done(err); }
                          if (!user) { return done(null, false); }
                          if (!user.validPassword(password)) {return done(null, false);}
                          return done(null, user);
                });
              })
          );
        });

    server.get('/login', function(req, res) {
        res.status(200);
        res.set({ 'Content-Type': 'text/html' });
        res.write('<!DOCTYPE html><html><body><form action="/new" method="post">');
        res.write('<input type="text" name="username"><input type="text" name="password"><input type="submit" value="submit">');
        res.write('</form></body></html>');
        res.end();
    });

    server.post('/login',
        passport.authenticate('basic', {
            //session: false,
            successRedirect: '/auth',
            failureRedirect: '/login'
            })
        );
    )); //end passport.use

    server.get('/auth', function(req, res) {
        res.status(200);
        res.set({ 'Content-Type': 'text/plain' });
        res.send('only accessible when logged in');
    });

server.listen(process.env.PORT || 8080);





// examples which serve as a specification for the required features:
//   http://localhost:8080/hello should return 'accessible to everyone' in plain text
//   http://localhost:8080/world should return 'only accessible when logged in' in plain text if the user is authenticated, otherwise will prompt for the username and password
//   http://localhost:8080/test should return 'only accessible when logged in' in plain text if user the user is authenticate, otherwise will prompt for the username and password

// My Notes... need to use ...
// passport.use( new strategy.BasicStrategy(
//    ) )
