const mongoose = require("mongoose");

const dbURL = "mongodb://localhost:27017/db";

mongoose.connect(dbURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log("connected to mongodb server");
    
})
db.on('error', (err)=>{
    console.log("Mongodb connected error",err);
    
})
db.on('disconnected', ()=>{
    console.log("Mongodb disconnected");
    
})

module.exports= db;