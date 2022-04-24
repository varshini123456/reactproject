const { Router } = require("express");
const cors = require('cors');
const router = Router()

const Brand = require('../models/brand')

//Brand

router.post("/",cors(), async (req,res)=>{
    const bran = new Brand(req.body)
    const b = await bran.save()
    res.json(b)
  })
  router.get("/",cors(), async (req,res)=>{
    const bran = await Brand.find({})
    // const b = JSON.stringify(bran)
    res.header('Content-Range','brands 0-20/20')
    res.json(bran)
  })
  
  router.get('/:id',cors(), async (req,res)=>{
    const brand_id = await Brand.findById({"_id": req.params.id})
    res.json(brand_id)
  })
  

module.exports = router
