const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { findByIdAndUpdate } = require("../models/Person");

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internel server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new MenuItem(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internel server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (tasteType == "sour" || tasteType == "sweet" || tasteType == "spicy") {
      const resp = await MenuItem.find({ taste: tasteType });
      console.log("fetched data");
      res.status(200).json(resp);
    } else {
      res.status(404).json({ error: "Invalid Menu Taste" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internel server error" });
  }
});


router.put('/:id',async(req,res)=>{
  try {
    const menuId = req.params.id;
    const updateMenuData = req.body;
    const resp = await MenuItem.findByIdAndUpdate(menuId,updateMenuData,{
      new: true,            // Return the update document
      runValidators: true   // Run mongoose validation
    });

    if(!resp){
      res.status(404).json({error:"Menu not found"})
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
    const menuId = req.params.id;
    const resp = await MenuItem.findByIdAndDelete(menuId);

    if(!resp){
      res.status(404).json({error:"Menu not found"})
    }
    console.log("data deleted");
    res.status(200).json({message:"Menu deleted successfully"})
    

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internel server error" });
  }
})

module.exports = router;
