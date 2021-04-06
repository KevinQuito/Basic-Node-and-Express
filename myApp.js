var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');

// part 1
bGround.log('Hello World');
console.log('Hello World');

// part 2
/*
function(req, res) {
  res.send('Response String');
}
*/
app.get("/", function(request, response){
  response.send("Hello Express");
});

// part 3


























 module.exports = app;
