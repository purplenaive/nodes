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

// memo detail data
app.get("/api/memo/:id", function(request, response) {
  db.collection("post").findOne({ _id: parseInt(request.params.id) }, function(error, result) {
    if(error) return console.log("detail memo got error", error);
    
    response.send(result);
  })
})
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
    response.status(200).send("delete complete");
  })
});

// modify todo item
app.patch("/api/modify", function(request, response) {
  const { _id, title, date } = request.body;

  db.collection("post").updateOne({ _id: parseInt(_id) }, { $set: { title, date} }, function(error, result) {
    if(error) return console.log("modify memo got error");

    response.status(200).send("modify complete");
  })
})

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

app.use(session({ secret: "비밀코드", resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// 로그인 시도시
app.post("/api/login", passport.authenticate("local", {
  failureRedirect: "/fail"
}), function(request, response) {
  response.status(200).send("login success");
});

passport.use(new LocalStrategy({
  usernameField: "id",
  passwordField: "password",
  session: true,
  passReqToCallback: false,
}, function(id, password, done) {
  db.collection("login").findOne({ id: id }, function(error, result) {
    if(error) return done(error);
    if(!result) return done(null, false, { message: "아이디가 존재하지 않습니다" })
    if(password == result.password) {
      return done(null, result);
    } else {
      return done(null, false, { message: "비밀번호가 일치하지 않습니다" })
    }
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, {});
})