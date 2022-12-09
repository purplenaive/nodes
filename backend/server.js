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

  db.collection("counter").findOne({ name: "게시물 개수" }, function(error, result) {
    const counter = result.totalPost;

    db.collection("post").insertOne({ _id: counter + 1, title, date }, function(error, result) {
      if(error) return console.log("data save in post got error", error); 
  
      db.collection("counter").updateOne({ name: "게시물 개수" }, { $inc : { totalPost: 1 } });
    })
  });

  response.send("complete");
});

// delete todo item
app.delete("/api/delete", function(request, response) {
  db.collection("post").deleteOne(request.body, function(error, result) {
    if(error) return console("delete memo got error", error);
  })

  response.status(200).send("delete complete");
});