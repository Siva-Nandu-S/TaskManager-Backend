const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const To_Do = require("./models/To_do");
const Doing = require("./models/Doing");
const Done = require("./models/Done");
const User = require("./models/User");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://127.0.0.1:27017/taskManager")
  .then(() => {
    console.log("Mongoose Connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.post("/register", async (req, res) => {
  console.log("Register");
  const pass = await bcrypt.hash(req.body.password, 12);
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: pass,
  };
  console.log(data);
  const result = new User(data);
  await result
    .save()
    .then((item) => {
      res.send({ result: "success" });
    })
    .catch((err) => {
      console.log("Error : " + err.message);
      res.send({ result: "error" });
    });
});

app.post("/login", async (req, res) => {
  console.log("from /login");
  console.log(req.body);
  const user = await User.find({ email: req.body.email });
  if (user.length === 0) {
    res.send({
      result: "error",
    });
  }
  console.log(user);
  const isMatch = await bcrypt.compare(req.body.password, user[0].password);
  console.log(isMatch);
  if (isMatch) {
    console.log({ result: "success"});
    res.send({ result: "success"});
  } else {
    res.send({
      result: "error",
    });
  }
});

app.get("/data/:id", async (req, res) => {
  console.log("From server '/'");
  const user = req.params.id;
  const to_do = await To_Do.find({ email: user });
  const doing = await Doing.find({ email: user });
  const done = await Done.find({ email: user });
  res.json({ to_do, doing, done });
});

app.post("/data", async (req, res) => {
  console.log("POST /data", req.body);
  var task = new To_Do(req.body);
  await task
    .save()
    .then((item) => {
      res.json({ result: "success" });
    })
    .catch((err) => {
      console.log("Error : " + err.message);
      res.status(400).send("unable to save");
    });
});

app.put("/data", async (req, res) => {
  console.log("From server '/'");
  const data = req.body;
  var update = await Done.deleteMany({ _id: data.id });
  res.json({ result: "success" });
});

app.put("/doing", async (req, res) => {
  console.log("From server '/data/:id')");
  const id = req.body;
  console.log(id);
  let changedData = await To_Do.find({ _id: id.id });
  console.log(changedData);
  if (changedData === []) {
    res.json();
  }
  let neededData = {
    title: changedData[0].title,
    description: changedData[0].description,
    email: id.email,
  };
  var change = await Doing.insertMany(neededData);
  change = await To_Do.deleteMany({ _id: id.id });
  const to_do = await To_Do.find({});
  const doing = await Doing.find({});
  console.log(doing);
  const done = await Done.find({});
  res.json({ to_do, doing, done });
});

app.put("/done", async (req, res) => {
  console.log("From server '/data/:id')");
  const id = req.body;
  console.log(id);
  let changedData = await Doing.find({ _id: id.id });
  console.log(changedData);
  if (changedData === []) {
    res.json();
  }
  let neededData = {
    title: changedData[0].title,
    description: changedData[0].description,
    email: id.email,
  };
  var change = await Done.insertMany(neededData);
  change = await Doing.deleteMany({ _id: id.id });
  const to_do = await To_Do.find({});
  const doing = await Doing.find({});
  console.log(doing);
  const done = await Done.find({});
  res.json({ to_do, doing, done });
});

app.listen(3001, () => {
  console.log("Server Connected");
});
