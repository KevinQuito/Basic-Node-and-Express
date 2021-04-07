var express = require('express');
var app = express();
var bGround = require('fcc-express-bground');
require('dotenv').config();
var bodyParser = require('body-parser');

// meet the node console part 1
bGround.log('Hello World');
console.log('Hello World');

// start a working express server part 2  NOTE: middleware must run before all the other routes because
//                                              we want it to run on all routes
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


// implement a root-level request logger middleware part 7
/*
------- example function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
As you have seen in challenge 4, to mount a middleware function at root level, you can use the app.use(<mware-function>) method
if you want a function to be executed only for POST requests, you could use app.post(<mware-function>)
Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).
Note: Express evaluates functions in the order they appear in the code. This is true for middleware too. If you want it to work for all the routes, it should be mounted before them.

NOTE: if you use app.use((req, res, next)=>, then it will pass in all the directories, but if you use
      app.use("/", (req, res, next)=>, then it will only run on the root directory.
When refreshing the page, you should see a logger in the console that tells you your ip address
*/


app.use((req, res, next)=>{
  console.log(req.method + " " +  req.path + " - " + req. ip);
  next();
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

// use-body parser to Parse POST Request part 11
/*
  Besides GET, there is another common HTTP verb, it is POST. POST is the default
  method used to send client data with HTML forms. In REST convention, POST is
  used to send data to create new items in the database (a new user, or a new blog
  post). You don’t have a database in this project, but you are going to learn how
  to handle POST requests anyway.
  In these kind of requests, the data doesn’t appear in the URL, it is hidden in the request body.
  The body is a part of the HTTP request, also called the payload. Even though the data is not
  visible in the URL, this does not mean that it is private. To see why, look at the raw content
  of an HTTP POST request:

  POST /path/subpath HTTP/1.0
  From: john@example.com
  User-Agent: someBrowser/1.0
  Content-Type: application/x-www-form-urlencoded
  Content-Length: 20
  name=John+Doe&age=25

  The middleware to handle urlencoded data is returned by bodyParser.urlencoded({extended: false}).
  Pass to app.use() the function returned by the previous method call. As usual, the middleware must
  be mounted before all the routes which need it
*/
// This mounts the 'body-parser' middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());




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

// chain middleware to create a time server part 8
/*
---------- example
app.get('/user', function(req, res, next) {
  req.user = getTheUserSync();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.user);
});
*/

// Optional-----------------------------------------------------------------
// function getTheCurrentTimeString(){
//   return new Date().toString();
// }
//--------------------------------------------------------------------------
app.get('/now', (req, res, next)=>{
  req.time = new Date().toString(); // can do req.time = getTheCurrentTimeString();
  next();
},(req, res)=>{
  res.json({ time: req.time });
});

// get route parameter input from the client part 9
/*
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
The captured values can be found in the req.params object.
Build an echo server, mounted at the route GET /:word/echo
You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.

example------
app.get("route_path", (req,res)=>{
  res.json({ echo: req.params.word })
})

NOTE: local server is localhost/3000/randomwordgfowief/echo
      public server is https://salty-refuge-39989.herokuapp.com/randomwordsofjwegw/echo
*/

app.get("/:word/echo", (req, res)=>{
  res.json({ echo: req.params.word});
});

// get query parameter from client part 10
/*
The query string is delimited by a question mark (?), and includes field=value couples. Each couple is separated by an ampersand (&). Express can parse the data from the query string, and populate the object req.query
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}

Build an API endpoint, mounted at GET /name. Respond with a JSON document, taking the structure { name: 'firstname lastname'}
The first and last name parameters should be encoded in a query string e.g. ?first=firstname&last=lastname.
*/

app.get("/name", (req, res)=>{
    res.json({ name: req.query.first + " " + req.query.last});
});

// get data from POST request part 12
/*
  Mount a POST handler at the path /name
  It will submit the same data of exercise 10 (Query string).
  If the body-parser is configured correctly, you should find the parameters in the object req.body
  example
  route: POST '/library'
  urlencoded_body: userId=546&bookId=6754
  req.body: {userId: '546', bookId: '6754'}
  Respond with the same JSON object as before: {name: 'firstname lastname'}

  NOTE: We will be responding with a json object called name and  getting the data from the
        form rather than the query request from part 10 or the params from part 9. This way
        the URL doesnt have to be localhost/3000/name?first=john&last=doe. It can just be
        localhost/3000/name since it's taking the information from the form that was filled
        out from the user.  
*/

  app.post("/name", (req, res)=>{
    res.json( {name: req.body.first + " " + req.body.last});
  });








 module.exports = app;
