const { Router } = require("express");
const cors = require('cors');
const router = Router()

const Seller = require('../models/Seller')
const SellerProfile = require('../models/SellerProfile')
const Product = require('../models/product')
const Image = require('../models/Image')
const UserOrders = require('../models/UserOrders')
const bcrypt = require('bcrypt')


const multer = require('multer')




//Seller
router.post("/",cors(),async (req,res)=>{
  
    const salt = await bcrypt.genSalt(10)
    const hashedpassword= await bcrypt.hash(req.body.password,salt)
    req.body.password=hashedpassword
    const seller_temp= new Seller(req.body)
    const seller_t = await seller_temp.save()
    res.json(seller_t)

  })
  
  router.get("/",cors(),async (req,res)=>{
    
    const seller = await Seller.find({})
    res.header('Content-Range','sellers 0-20/20')
    res.json(seller)
  })
  
  router.get("/:id",cors(), async(req,res)=>{
    const seller = await Seller.findById({ "_id": req.params.id})
  })
  
  router.delete("/:id", cors(), async(req,res)=>{
    const seller = await Seller.findById({"_id": req.params.id})
    await Seller.deleteOne(seller)
    res.status(200).json({message: "deleted sucessfully"})
  })
  
  // Seller profile
  router.post('/:id/sellerprofile',cors(), async(req,res)=>{
    const sellerprofile = new SellerProfile({...req.body,sellerId: req.params.id})
    const profile = await sellerprofile.save()
    res.json(profile)
  })
  
  
  router.get('/:id/sellerprofile',cors(), async(req,res)=>{
  
    const sellerprofile = await SellerProfile.find({sellerId: req.params.id})
    res.json(sellerprofile) 
  })
  
  router.patch("/sellerprofile/:id",cors(), async (req,res)=>{
  
    const sellerprofile = await SellerProfile.findById({"_id":req.params.id})
  
    if(req.body.firstName != null){
      sellerprofile.firstName = req.body.firstName
    }
    if(req.body.lastName != null){
      sellerprofile.lastName = req.body.lastName
    }
    if(req.body.PhNo != null){
      sellerprofile.PhNo = req.body.PhNo
    }
    if(req.body.city != null){
      sellerprofile.city = req.body.city
    }
    if(req.body.address != null){
      sellerprofile.address = req.body.address
    }
    try{
        const updatedSeller = await sellerprofile.save()
        res.status(200).json(updatedSeller)
    }
    catch(error){
        req.status(500).json({message: error.message})
    }
   
  })
  
  router.delete('/sellerprofile/:id', cors(), async(req,res)=>{
    const sellerprofile = await SellerProfile.findById({"_id": req.params.id})
    await SellerProfile.deleteOne(sellerprofile)
    res.status(200).json({message: "deleted!"})
  })


  //Products
  router.get("/:id/sellerproduct",cors(),async(req,res)=>{
    const products = await Product.find({sellerId:req.params.id})
    res.json(products)
  
  })


  

  //SellerOrders
  router.get('/:id/orders',cors(),async(req,res)=>{
    const orders = await UserOrders.find({sellerId:req.params.id})
    res.json(orders)
  
  })
  
  

module.exports = router
