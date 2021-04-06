var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();

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

// app.get("/", function(request, response){
//   response.sendFile(__dirname + "/views/index.html");
// });
// ADDED ARROW FUNCTIONS WHEN USING NODE SINCE IT'S CLEANER
app.get("/", (request, response)=>{
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

NOTE: adding /json to the root address will allow you to see the json Response
      for example https://salty-refuge-39989.herokuapp.com/json
*/

// app.get("/json", function(request, response){
//   response.json({"message": "Hello json"});
// });
// ADDED ARROW FUNCTIONS WHEN USING NODE SINCE IT'S CLEANER
// app.get("/json", (request, response) =>{
//   response.json({"message": "Hello json"});
// });

// use the .env file part 6
/*
Create a .env file in the root of your project directory, and store the variable
.env files are secret files that no one else can see, but you. These files should not show up
in the github files. It's a shell file so when you write shell variables for example, it would be
API_KEY=hwgGSEG.
*/

app.get("/json", (req, res) =>{
  const message = (process.env.MESSAGE_STYLE === "uppercase") ? "HELLO JSON" : "Hello json";
    res.json(
  { message }
  );
});

















 module.exports = app;
