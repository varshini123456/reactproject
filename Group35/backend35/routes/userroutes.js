const { Router } = require("express");
const User = require('../models/User')
const UserProfile = require('../models/UserProfile')
const Product = require('../models/product')
const Cart = require('../models/Cart')

const cors = require('cors');


const router = Router()

    //User
    router.get("/",cors(),async (req,res)=>{
        const user = await User.find({})
        user_json= JSON.stringify(user)
        res.header('Content-Range','user 0-20/20')
        res.json(user)
    })
    
    router.post("/",cors(),async (req,res)=>{
    
        const newUser = new User(req.body)
        const user = await newUser.save()
        res.json(user)
    })

    router.get('/:id',cors(),async(req,res)=>{
        const user = User.find({_id:req.params.id})
        res.json(user)
      })
      

    //Profile
    router.get("/:id/userprofile",cors(),async (req,res)=>
    {
    const userProfile = await UserProfile.find({userId: req.params.id})
    // const userProf= JSON.stringify(userProfile)
    res.json(userProfile)
    })


    router.post("/:id/userprofile",cors(),async (req,res)=>{

    const userprofile= new UserProfile({...req.body,userId: req.params.id})
    const profile= await userprofile.save()
    res.json(profile)
    })


    // Deleting a product or updating a product

    router.delete('/:id/sellerproduct/:productId',cors(),async(req,res)=>{
        try{
          const productItem = await Product.deleteOne({_id: req.params.productId})
          res.json(productItem)
        }
        catch(error){
          console.log(error)
        }
      })
      
      
      router.patch('/:id/sellerproduct/:productId',cors(),async(req,res)=>{
        const productItem = await Product.findByIdAndUpdate({_id: req.params.productId})
        productItem.productquantity = req.body.productquantity
        const item = await productItem.save()
        res.json(item)
      })
    

      // Specific user cart 
      router.get('/:id/cart',cors(),async(req,res)=>{
        const cartItems = await Cart.find({userId: req.params.id})
        res.json(cartItems)
      })
      
      router.post('/:id/cart',cors(),async(req,res)=>{
        const newCartItem = await new Cart({...req.body,userId: req.params.id,})
        const item = newCartItem.save()
        res.json(newCartItem)
      })
      
      router.get('/:id/cart/:cartId',cors(),async(req,res)=>{
        const cartItem = await Cart.find({_id: req.params.cartId})
        res.json(cartItem)
      })
      
      router.patch('/:id/cart/:cartId',cors(),async(req,res)=>{
        const cartItem = await Cart.findByIdAndUpdate({_id: req.params.cartId})
          cartItem.qty = req.body.qty
        const item = await cartItem.save()
        res.json(item)
      })
      
      router.delete('/:id/cart/:cartId',cors(),async(req,res)=>{
        
        try{
          const cartItem = await Cart.deleteOne({_id: req.params.cartId})
          res.json(cartItem)
        }
        catch(error){
          console.log(error)
        }
      })
  module.exports = router
