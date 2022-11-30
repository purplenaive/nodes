const express = require("express");
const app = express();
const mongo_client = require("mongodb").MongoClient;
var db;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongo_client.connect("mongodb+srv://purplenaive:woojisoo7321@cluster0.mproxno.mongodb.net/?retryWrites=true&w=majority", function(error, client) {
  if(error) return console.log(error);

  db = client.db("todo");

  app.listen(3000, function() {
    console.log("listening on 3000");
  });
})


// 누군가가 /pet으로 방문을 하면 pet 관련된 안내문을 띄워주자
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

// get todo list
app.get("/api/todos", function(request, response) {
  db.collection("post").find().toArray(function(error, result) {
    response.send(result);
  })
});

// add todo item
app.post("/api/add", function(request, response) {
  const { title, date } = request.body;

  db.collection("post").insertOne({ title, date }, function(error, result) {
    if(error) console.log("data save in post got error");
  })

  response.send("complete");
});