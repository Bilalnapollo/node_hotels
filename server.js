// const fs = require("fs");
// const os = require("os");
const express = require("express");
const db = require("./db");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());



// const user = os.userInfo()

// console.log(user);
// console.log(user.username);

// fs.appendFile("greeting.txt","Hi "+user.username +"!\n",()=>{
//     console.log("File is created");

// })

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

const personRoutes = require("./routes/personRoutes");
app.use('/person',personRoutes)

const menuRoutes = require("./routes/menuRoutes");
app.use('/menu-item',menuRoutes)

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
