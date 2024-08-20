const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internel server error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await Person.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internel server error" });
    }
  });

  router.get('/:workType', async(req,res) =>{
    try {
        const workType = req.params.workType;
    if(workType == "chef" || workType == "manager" || workType == "waiter"){
        const resp = await Person.find({work:workType});
        console.log("fetched data");
        res.status(200).json(resp);
        
    }
    else{
        res.status(404).json({error:"Invalid work type"})
    }
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Internel server error" });
    }
  })

  router.put('/:id',async(req,res)=>{
    try {
      const personId = req.params.id;
      const updatePersonData = req.body;
      const resp = await Person.findByIdAndUpdate(personId,updatePersonData,{
        new: true,            // Return the update document
        runValidators: true   // Run mongoose validation
      });
  
      if(!resp){
        res.status(404).json({error:"Person not found"})
      }
      console.log("data updated");
      res.status(200).json(resp)
      
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internel server error" });
    }
  })

  router.delete('/:id',async(req,res)=>{
    try {
      const personId = req.params.id;
      const resp = await Person.findByIdAndDelete(personId);
  
      if(!resp){
        res.status(404).json({error:"Person not found"})
      }
      console.log("data deleted");
      res.status(200).json({message:"Person deleted successfully"})
      
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internel server error" });
    }
  })

  module.exports = router