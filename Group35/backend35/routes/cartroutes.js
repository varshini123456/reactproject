const { Router } = require("express");
const cors = require('cors');
const router = Router()

const Cart = require('../models/Cart')


//Cart

router.get('/',cors(),async(req,res)=>{
    let cartItems = await Cart.find({})
    res.json(cartItems)
  })
  
  router.delete('/',cors(),async(req,res)=>{
    const cartItems = await Cart.deleteMany()
  })

module.exports = router
