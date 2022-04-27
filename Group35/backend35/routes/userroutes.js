const { Router } = require("express");
const User = require('../models/User')
const UserProfile = require('../models/UserProfile')
const Product = require('../models/product')
const Cart = require('../models/Cart')
const UserOrders = require('../models/UserOrders')
const bcrypt = require('bcrypt')
const cors = require('cors');
const client = require("../redis/redis");

const router = Router()

    //User
    router.get("/",cors(),async (req,res)=>{
        const redisusers = await client.get('user');
        if(redisusers==null){
            const users= await User.find({})
            await client.set('user',JSON.stringify(users))
            res.json(users)
        }else{
            res.json(JSON.parse(redisusers))
        }
        // const user = await User.find({})
        // user_json= JSON.stringify(user)
        // res.header('Content-Range','user 0-20/20')
        // res.json(user)
    })
    
    router.post("/",cors(),async (req,res)=>{
        const salt = await bcrypt.genSalt(10)
        const hashedpassword= await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedpassword
        const newUser = new User(req.body)
        const user = await newUser.save()
        res.json(user)
    })

    router.get('/:id',cors(),async(req,res)=>{
        
        const user = await User.find({_id:req.params.id})
        res.json(user)
      })
    
    router.patch("/:id",cors(), async (req,res)=>{

        const user = await User.findById(req.params.id)
      
        if(req.body.username != null){
            user.username = req.body.username
        }
        if(req.body.email != null){
            user.email = req.body.email
        }
        if(req.body.password != null){
            user.password = req.body.password
        }
        try{
            const updatedUser = await user.save()
            res.status(200).json(updatedUser)
        }
        catch(error){
            req.status(500).json({message: error.message})
        }
       
      })
      
    router.delete("/:id", cors(), async (req,res)=>{
        const user = await User.findById({"_id": req.params.id})
        await User.deleteOne(user)
        res.status(200).json({message: "deleted"})
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

  //UserOrders
      
    router.post('/:id/orders',cors(),async(req,res)=>{
      const newOrder = await new UserOrders(req.body)
      const order = await newOrder.save()
      console.log(order)
      res.json(order)
    })

    router.get('/:id/orders',cors(),async(req,res)=>{
      const orders = await UserOrders.find({userId:req.params.id})
      res.json(orders)

    })

    router.delete('/:id/orders/:orderId',cors(),async(req,res)=>{
      const orders = await UserOrders.deleteOne({_id:req.params.orderId})
      res.json(orders)

    })

    router.delete('/:id/orders',cors(),async(req,res)=>{
      const orders = await UserOrders.deleteMany({userId:req.params.id})
      res.json(orders)

    })



  module.exports = router
