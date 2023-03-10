const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routers/api/users");
const students = require("./routers/api/student");
const room = require("./routers/api/room");
const staff = require("./routers/api/staff");
const path = require("path");

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config

// connect to mongoDB
mongoose
  .connect("mongodb+srv://vasavim3122:vasavi@cluster0.6nnlabz.mongodb.net/HostelManagement?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/student", students);
app.use("/api/room", room);
app.use("/api/staff", staff);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { app };
