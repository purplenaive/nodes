const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log("listening on 3000");
});

// 누군가가 /pet으로 방문을 하면 pet 관련된 안내문을 띄워주자
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.post("/api/add", function(request, response) {
  console.log(request.body);
  response.send("complete");
});