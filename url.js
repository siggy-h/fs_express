'use strict';

var express = require('express'); // do not change this line

// create an express server just like in the first exercise
// as shown in the examples, you are asked to respond to various requests in different ways

var server = express();
//var querystring = require('querystring'); // do not change this line

server.get('/', function(req, res) {
  res.status(200);
  res.set({
      'Content-Type': 'text/plain'
  });
  res.send('you have accessed the root');
});

server.get('/test/*', function(req, res) {
    res.status(200);
    res.set({ 'Content-Type': 'text/plain'});

res.send('you have accessed \"' + decodeURIComponent(req.url.substr(6)) + '\" within test');
});

server.get('/attributes?', function(req, res) {
    res.status(200);
    res.set({ 'Content-Type': 'text/html'});

    //key + value
    res.write('<!DOCTYPE html><html><body><table border="1">');
    for( var k in req.query ) {
        res.write('<tr><td>'+ k + '</td><td>' + req.query[k] + '</td></tr>');
    }
    res.write('</table></body></html>');
    res.end();
});

// server.get('/attributes?', function(req, res) {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     res.write('<!DOCTYPE html><html><body><table border="1"></table></body></html>');
//     res.end(); //close
//
// });

server.listen(process.env.PORT || 8080);



// examples which serve as a specification for the required features:
//   http://localhost:8080/ should return 'you have accessed the root' in plain text
//   http://localhost:8080/test/hello should return 'you have accessed "hello"
//      within test' in plain text
//   http://localhost:8080/test/world should return 'you have accessed "world"
//      within test' in plain text

//   http://localhost:8080/attributes?hello=world&lorem=ipsum should return the
//      following as html (row order might differ)
//
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <table border="1">
//           <tr><td>hello</td><td>world</td></tr>
//           <tr><td>lorem</td><td>ipsum</td></tr>
//         </table>
//       </body>
//     </html>

//   http://localhost:8080/attributes?first=1&second=2&third=3 should return the following as html (row order might differ)
//     <!DOCTYPE html>
//     <html>
//       <body>
//         <table border="1">
//           <tr><td>first</td><td>1</td></tr>
//           <tr><td>second</td><td>2</td></tr>
//           <tr><td>third</td><td>3</td></tr>
//         </table>
//       </body>
//     </html>
