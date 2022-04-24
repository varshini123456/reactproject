const { Router } = require("express");
const cors = require('cors');
const router = Router()

const Seller = require('../models/Seller')
const SellerProfile = require('../models/SellerProfile')
const Product = require('../models/product')
const Image = require('../models/Image')

const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../uploads')
    },
    filename : (req, file, cb) => {
      cb(null,  "product"+ new Date().toISOString().replace(/:/g,'-') + file.originalname )
    }
  })
  
  const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
  }
  
  const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
  
  }
  
  
  
  const upload = multer({storage: storage,fileFilter: filefilter})

//Seller
router.post("/",cors(),async (req,res)=>{
  
    console.log(req.body);
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


  // Posting a product

  router.post('/:id/sellerproduct',cors(),upload.single('file'),async (req, res, next) => {
    try{
      const tmp = req.file.path.slice(8)
  
      const file = new Image({
            fileName: req.file.originalname,
            filePath: tmp,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        const f = await file.save();
        
        const newProduct= new Product({sellerId:req.params.id,...req.body})
        newProduct.Images.push(f.id)
        const product = await newProduct.save()
  
        res.status(201).json(product);
    }catch(error) {
        res.status(400).send(error.message);
    }
  })


module.exports = router
