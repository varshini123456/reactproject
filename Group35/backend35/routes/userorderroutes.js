const { Router } = require("express");
const cors = require('cors');
const router = Router()

const UserOrders = require('../models/UserOrders')


//User Orders

router.get('/',cors(),async(req,res)=>{
    const orders = await UserOrders.find({})
  
    res.header('Content-Range','orders 0-20/20')
  
  
    res.header('Content-Range','sellers 0-20/20')
  
    res.json(orders)
  
  })

module.exports = router
