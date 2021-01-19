const express = require("express");
const connectDB = require("./config/connect");
const User = require("./models/User");
const app = express();
//env-variables
require("dotenv").config({ path: "./config/.env" });
//connect the database
connectDB();

//Data To JSON
app.use(express.json());

//Start The Crud
//get all users
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send({ msg: "Get Users", users }))
    .catch((err) => res.send(err));
});
//get user by id
app.get("/api/users/userID", (req, res) => {
  const userID = req.params.userID;
  User.findById(userID)
    .then((users) => res.send({ msg: "Get Users By ID", users }))
    .catch((err) => res.send({ msg: "error", err }));
});

//add user
app.post("/api/add_user", (req, res) => {
  const { name, lastName, email, phone } = req.body;
  const newUser = new User({ name, lastName, email, phone });
  newUser
    .save()
    .then((user) => res.send({ msg: "user added", user }))
    .catch((err) => res.send({ msg: "error", err }));
});

//edit user by id
app.put("/api/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then((user) => res.send({ msg: "User Updated", user }))
    .catch((err) => res.send({ msg: "error", err }));
});

//delete user
app.delete("/api/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findByIdAndDelete(id)
    .then((u) => res.send({ msg: "user deleted", u }))
    .catch((err) => res.send({ msg: "error", err }));
});

//End The Crud

//  create a server
const port = 5000;
app.listen(port, () => {
  console.log("the server is running on port:", port);
});
