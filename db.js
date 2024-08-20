const mongoose = require("mongoose");
require("dotenv").config();

const dbURL = process.env.DB_LOCAL_URL;
const mongoURL = process.env.DB_URL

mongoose.connect(mongoURL)

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