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
NOTE: This will allow you to connect to the /views/index.html and execute all the html code in there
*/

app.get("/", function(request, response){
  response.sendFile(__dirname + "/views/index.html");
});


// serve static assets part 4
/*
example --------- express.static(absolutePath)
app.use(path, middlewareFunction)

NOTE: Our HTML should look better since the index.html is referencing the /public/style.css
      and we're using app.use to serve the static assets. Basically, this allows index.HTML
      to access the /public/style.css files.

EXTRA NOTE: adding /public/style.css to the root address will allow you to see the css code
            for example, https://salty-refuge-39989.herokuapp.com/public/style.css
*/
app.use("/public", express.static(__dirname + "/public"));


// serve json on a specific route part 5
/*
create a simple API by creating a route that responds with JSON at the path /json.
use the method res.json(), passing in an object as an argument
A valid object has the usual structure {key: data}
data can be a number, a string, a nested object or an array
data can also be a variable or the result of a function call, in which case it will be evaluated before being converted into a string.
*/

app.get("/json", function(request, response){
  response.json({"message": "Hello json"});
});




















 module.exports = app;
