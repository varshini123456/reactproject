const { Router } = require("express");
const cors = require('cors');
const router = Router()
const client = require("../redis/redis");
const Brand = require('../models/brand')

//Brand

router.post("/",cors(), async (req,res)=>{
    
    const bran = new Brand(req.body)
    const b = await bran.save()
    res.json(b)
  })
  router.get("/",cors(), async (req,res)=>{
    const b =await client.get('brands');
    if(b==null){
      
    const bran = await Brand.find({})
    await client.set('brands',JSON.stringify(bran))
    res.header('Content-Range','brands 0-20/20')
    res.json(bran)
    }else{
      res.json(JSON.parse(b))
    }
  })
  
  router.get('/:id',cors(), async (req,res)=>{
    const brand_id = await Brand.findById({"_id": req.params.id})
    res.json(brand_id)
  })
  
  
  router.delete('/:id', cors(), async (req,res)=>{
    const brand_id = await Brand.findById({"_id": req.params.id})
    await Brand.deleteOne(brand_id)
    res.status(200).json({message: "deleted"})
  })


module.exports = router
