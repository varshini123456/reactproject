const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer')
const Category = require('./models/category')
const User = require('./models/User')
const morgan = require("morgan")
const fs = require("fs")
const helmet = require("helmet")
const path = require("path")

const UserProfile = require('./models/UserProfile')
const Seller = require('./models/Seller')
const Brand = require('./models/brand')
const SellerProfile = require('./models/SellerProfile')
const Image = require('./models/Image')
const Product = require('./models/product')
const Cart = require('./models/Cart')
const UserOrders = require('./models/UserOrders')

// const MobileFeature = require('./models/MobileFeature')
// const LaptopFeature = require('./models/LaptopFeature')
// const HeadphonesFeature = require('./models/HeadphonesFeature')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const product = require('./models/product');
const swaggerDocument = YAML.load('./swagger.yaml')

app.use(express.json())
app.use(cors());
cors({credentials:true,origin:true})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Cross-Origin-Resource-Policy: same-site | same-origin | cross-origin ")
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

// app.use(helmet({crossOriginEmbedderPolicy:false}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

mongoose.connect("mongodb+srv://madhesh:dobOct2001@cluster0.exwrl.mongodb.net/dreambasket?retryWrites=true&w=majority",{
    useNewUrlParser: true,
  })
mongoose.set('toJSON',{
  virtuals: true,
  transform: (doc,converted)=> {
    delete converted._id;
  }
})


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});





// morgan custom token

morgan.token('host',function(req,res)
{
    return req.hostname;
})

morgan.token('url',function(req,res)
{
    return req.url;
})

// // Using morgan middleware to log the details to a file

const logStream = fs.createWriteStream(path.join(__dirname,"loggerFile"),{flags:"a"})

app.use(morgan(":host :method :url :status :res[content-length] - :response-time ms",{stream:logStream}))

const userRouter = require('./routes/userroutes')
app.use('/users', userRouter)

const categoryRouter = require('./routes/categoryroutes')
app.use('/categories', categoryRouter)

const brandRouter = require('./routes/brandroutes')
app.use('/brands', brandRouter)

const sellerRouter = require('./routes/sellerroutes')
app.use('/sellers', sellerRouter)

const productRouter = require('./routes/productroutes')
app.use('/sellerproduct', productRouter)

const cartRouter = require('./routes/cartroutes')
app.use('/cart', cartRouter)

const userOrderRouter = require('./routes/userorderroutes')
app.use('/orders', userOrderRouter)



app.post('/users/:id/orders',cors(),async(req,res)=>{
  const newOrder = await new UserOrders(req.body)
  const order = await newOrder.save()
  console.log(order)
  res.json(order)
})

app.get('/users/:id/orders',cors(),async(req,res)=>{
  const orders = await UserOrders.find({userId:req.params.id})
  res.json(orders)

})

app.delete('/users/:id/orders/:orderId',cors(),async(req,res)=>{
  const orders = await UserOrders.deleteOne({_id:req.params.orderId})
  res.json(orders)

})

app.delete('/users/:id/orders',cors(),async(req,res)=>{
  const orders = await UserOrders.deleteMany({userId:req.params.id})
  res.json(orders)

})



// Seller Orders
app.get('/sellers/:id/orders',cors(),async(req,res)=>{
  const orders = await UserOrders.find({sellerId:req.params.id})
  res.json(orders)

})


app.patch("/users/:id",cors(), async (req,res)=>{

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

app.delete("/users/:id", cors(), async (req,res)=>{
  const user = await User.findById({"_id": req.params.id})
  await User.deleteOne(user)
  res.status(200).json({message: "deleted"})
})


app.delete('/categories/:id', cors(), async (req,res)=>{
  const cat = await Category.findById({"_id": req.params.id})
  await Category.deleteOne(cat)
  res.status(200).json({message: "deleted"})
})

app.delete('/brands/:id', cors(), async (req,res)=>{
  const brand_id = await Brand.findById({"_id": req.params.id})
  await Brand.deleteOne(brand_id)
  res.status(200).json({message: "deleted"})
})

app.patch("/userprofile/:id",cors(), async (req,res)=>{

  const userprofile = await UserProfile.findById(req.params.id)

  if(req.body.username != null){
      userprofile.username = req.body.username
  }
  if(req.body.email != null){
      userprofile.email = req.body.email
  }
  if(req.body.password != null){
      userprofile.password = req.body.password
  }
  try{
      const updatedUser = await userprofile.save()
      res.status(200).json(updatedUser)
  }
  catch(error){
      req.status(500).json({message: error.message})
  }
 
})


app.delete('/userprofīle/:id', cors(), async (req,res)=>{
  const userprofile = await UserProfile.findById({"_id": req.params.id})
  await UserProfile.deleteOne(userprofile)
  res.status(200).json({message: "deleted"})
})

app.patch("/userprofile/:id",cors(), async (req,res)=>{

  const userprofile = await UserProfile.findById(req.params.id)

  if(req.body.username != null){
      userprofile.username = req.body.username
  }
  if(req.body.email != null){
      userprofile.email = req.body.email
  }
  if(req.body.password != null){
      userprofile.password = req.body.password
  }
  try{
      const updatedUser = await userprofile.save()
      res.status(200).json(updatedUser)
  }
  catch(error){
      req.status(500).json({message: error.message})
  }
 
})



app.listen(5000,()=>{
  console.log("listening......")
});