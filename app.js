const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize=require('./util/database');
const userRoutes = require('./routes/users')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

app.use(userRoutes);

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/public/signup.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  });

// Define a route handler for the home page
app.get("/", (req, res) => {
  res.send("Welcome to the home page!");
});

sequelize
  .sync()
  .then(() => {
    console.log("Connection to database is succesfull");
  })
  .catch((err) => {
    console.log("Error creating database and tables: ", err);
  });

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
