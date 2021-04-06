var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');

// meet the node console part 1
bGround.log('Hello World');
console.log('Hello World');

// start a working express server part 2
/*
example ------- app.METHOD(PATH, HANDLER)
function(req, res) {
  res.send('Response String');
}
*/
// app.get("/", function(request, response){
//   response.send("Hello Express");
// });

// serve an html file part 3
/*
example -------absolutePath = __dirname + relativePath/file.ext
function(req, res) {
  res.sendFile(path);
}
*/

app.get("/", function(request, response){
  response.sendFile(__dirname + "/views/index.html");
});
























 module.exports = app;
