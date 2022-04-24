const { Router } = require("express");
const cors = require('cors');
const router = Router()

const Product = require('../models/product')
const Image = require('../models/Image')

// Product

router.get('/',cors(),async(req,res)=>{
    const products = await Product.find({}).populate('Images')
    res.json(products)
  })
  
  router.post("/",cors(),async (req,res)=>{

    const newProduct= new Product(req.body)
    const product= await newProduct.save()
    res.json(product)
  })
  
  
  router.patch("/:id",cors(), async (req,res)=>{
  
  
    const sellerproduct = await Product.findById({"_id":req.params.id})
  
    if(req.body.sellername != null){
      sellerproduct.sellername = req.body.sellername
    }
    if(req.body.productname != null){
      sellerproduct.productname = req.body.productname
    }
    if(req.body.productbrand != null){
      sellerproduct.productbrand = req.body.productbrand
    }
    if(req.body.productprice != null){
      sellerproduct.productprice = req.body.productprice
    }
    if(req.body.color != null){
      sellerproduct.color = req.body.color
    }
    if(req.body.connectorType != null){
      sellerproduct.connectorType = req.body.connectorType
    }
    if(req.body.productquantity != null){
      sellerproduct.productquantity = req.body.productquantity
    }
    try{
        const updatedProduct = await sellerproduct.save()
        res.status(200).json(updatedProduct)
    }
    catch(error){
        req.status(500).json({message: error.message})
    }
   
  })
  
  router.delete("/:id", cors(), async(req,res)=>{
    const product = await Product.findById({"_id" : req.params.id})
    await Product.deleteOne(product)
    res.status(200).json({message: "deleted!"})
  })

  // Getting an image of a product

  router.get('/:id/image',cors(),async(req,res)=>{
    const img = await Image.find({})
    res.json(img)
  })
  
  
module.exports = router
