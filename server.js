// const fs = require("fs");
// const os = require("os");
const express = require("express");
const db = require("./db");
require("dotenv").config();

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// const user = os.userInfo()

// console.log(user);
// console.log(user.username);

// fs.appendFile("greeting.txt","Hi "+user.username +"!\n",()=>{
//     console.log("File is created");

// })

// comment added for testing purposes

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./routes/personRoutes");
app.use('/person',personRoutes)

const menuRoutes = require("./routes/menuRoutes");
app.use('/menu-item',menuRoutes)

app.listen(PORT, () => {
  console.log("Listening on port 3000...");
});
