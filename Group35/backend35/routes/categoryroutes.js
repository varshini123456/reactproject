const { Router } = require("express");
const cors = require('cors');
const router = Router()

const Category = require('../models/category')
const Brand = require('../models/brand')
const Product = require('../models/product')

//Category
router.post("/",cors(),async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})

router.get("/",cors(),async (req,res)=>{
  const cat = await Category.find({})
  
  res.header('Content-Range','category 0-20/20')
  res.json(cat)
})

router.get('/:id',cors(), async (req,res)=>{
    const cat = await Category.findById({"_id": req.params.id})
    res.json(cat)
})

// Brands for Categories


router.get("/:id/brands",cors(), async (req,res)=>{
    const bran = await Brand.find({Category: req.params.id})
    // const b = JSON.stringify(bran)
    res.json(bran)
  })

// Features of a category
router.get('/:id/features',cors(), (req,res)=>{

    var query = { cid: req.params.id };
    db.collection("features").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      //db.close();
    });
  
    
  })


// Products filtering using categories and brands

router.get('/:cid/sellerproduct',cors(), async(req,res)=>{
    const products = await Product.find({"Category": req.params.cid})
    res.json(products)
  })
  
  router.get('/:cid/brands/:brandname/sellerproduct',cors(),async(req,res)=>{
    try{
      const products= await Product.find({Category:req.params.cid, productbrand: req.params.brandname})
      res.json(products)
    }
    catch(err){
      console.log(err)
    }
    
  })
  

module.exports = router

