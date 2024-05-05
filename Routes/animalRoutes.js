const express=require("express")
const Animal=require('../models/animal')
const router =express.Router()

router.get('/animals', async(req,res)=>{
    try{
         const data =await Animal.find()
         res.status(200).json(data)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
    
})

router.get('/animals/:id',async (req,res)=>{
  try{
 const data=await Animal.findById(req.params.id)
 if(data)
 {
    res.status(200).json(data)
 }
 else{
    res.status(404).json({'message':'data not found'})
 }
  }
  catch(err)
  {
    res.status(500).json({message:err.message})
  }
})


router.post("/animals",async (req,res)=>{
    try{
 const {name,species}=req.body
 const nameexist=await Animal.findOne({name})
 const speciesExist=await Animal.findOne({species})
 if(nameexist && speciesExist)
         {
            res.status(403).json({message:"data already existed"})
         }
        else{
            const newAnimal=await Animal.create({name:name,species:species})
             res.status(200).json(newAnimal)

        }
    
    }
    catch(err)
    {
         res.status(500).json({message:err.message})
    }
   

})


router.put("/animals/:id", async (req, res) => {
    try {
        const data = await Animal.findByIdAndUpdate(req.params.id, req.body);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "animal not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete("/animals/:id", async (req, res) => {
    try {
        const data = await Animal.findByIdAndDelete(req.params.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "animal not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports=router