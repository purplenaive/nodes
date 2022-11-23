const express = require("express");
const app = express();

app.listen(3000, function() {
  console.log("listening on 3000");
});

// 누군가가 /pet으로 방문을 하면 pet 관련된 안내문을 띄워주자
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/pet", function(request, response) {
  response.send("펫 용품을 쇼핑할 수 있는 사이트 입니다.");
});
app.get("/beauty", function(request, response) {
  response.send("뷰티 용품을 쇼핑할 수 있는 사이트입니다.");
});
