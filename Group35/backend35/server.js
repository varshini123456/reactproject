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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
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


//User
app.get("/users",cors(),async (req,res)=>{
  const user = await User.find({})
  user_json= JSON.stringify(user)
  res.header('Content-Range','user 0-20/20')
  res.json(user)
})

app.post("/users",cors(),async (req,res)=>{

  const newUser = new User(req.body)
  const user = await newUser.save()
  res.json(user)
})

//Category
app.post("/categories",cors(),async (req,res)=>{
    const category = new Category(req.body)
    const cate = await category.save()
    res.json(cate)
})

app.get("/categories",cors(),async (req,res)=>{
  const cat = await Category.find({})
  
  res.header('Content-Range','category 0-20/20')
  res.json(cat)
})

app.get('/categories/:id',cors(), async (req,res)=>{
    const cat = await Category.findById({"_id": req.params.id})
    res.json(cat)
})

//Brand

app.post("/brands",cors(), async (req,res)=>{
  const bran = new Brand(req.body)
  const b = await bran.save()
  res.json(b)
})
app.get("/brands",cors(), async (req,res)=>{
  const bran = await Brand.find({})
  // const b = JSON.stringify(bran)
  res.header('Content-Range','brands 0-20/20')
  res.json(bran)
})

app.get('/brands/:id',cors(), async (req,res)=>{
  const brand_id = await Brand.findById({"_id": req.params.id})
  res.json(brand_id)
})
// Brands for Categories


app.get("/categories/:id/brands",cors(), async (req,res)=>{
  const bran = await Brand.find({Category: req.params.id})
  // const b = JSON.stringify(bran)
  res.json(bran)
})

//Profile
app.get("/user/:id/userprofile",cors(),async (req,res)=>
{
  const userProfile = await UserProfile.find({userId: req.params.id})
  // const userProf= JSON.stringify(userProfile)
  res.json(userProfile)
})





app.post("/users/:id/userprofile",cors(),async (req,res)=>{

  const userprofile= new UserProfile({...req.body,userId: req.params.id})
  const profile= await userprofile.save()
  res.json(profile)
})


//Seller
app.post("/sellers",cors(),async (req,res)=>{
  
  console.log(req.body);
  const seller_temp= new Seller(req.body)
  const seller_t = await seller_temp.save()
  res.json(seller_t)
})

app.get("/sellers",cors(),async (req,res)=>{
  
  const seller = await Seller.find({})
  res.header('Content-Range','sellers 0-20/20')
  res.json(seller)
})

app.get("/sellers/:id",cors(), async(req,res)=>{
  const seller = await Seller.findById({ "_id": req.params.id})
})

app.delete("/sellers/:id", cors(), async(req,res)=>{
  const seller = await Seller.findById({"_id": req.params.id})
  await Seller.deleteOne(seller)
  res.status(200).json({message: "deleted sucessfully"})
})

// Seller profile
app.post('/sellers/:id/sellerprofile',cors(), async(req,res)=>{
  const sellerprofile = new SellerProfile({...req.body,sellerId: req.params.id})
  const profile = await sellerprofile.save()
  res.json(profile)
})


app.get('/sellers/:id/sellerprofile',cors(), async(req,res)=>{

  const sellerprofile = await SellerProfile.find({sellerId: req.params.id})
  res.json(sellerprofile) 
})

app.patch("/sellerprofile/:id",cors(), async (req,res)=>{

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

app.delete('/sellerprofile/:id', cors(), async(req,res)=>{
  const sellerprofile = await SellerProfile.findById({"_id": req.params.id})
  await SellerProfile.deleteOne(sellerprofile)
  res.status(200).json({message: "deleted!"})
})


// Features of a category
app.get('/categories/:id/features',cors(), (req,res)=>{

  var query = { cid: req.params.id };
  db.collection("features").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
    //db.close();
  });

  
})


// Product

app.get('/sellerproduct',cors(),async(req,res)=>{
  const products = await Product.find({}).populate('Images')
  res.json(products)
})

app.get("/seller/:id/sellerproduct",cors(),async(req,res)=>{
  const products = await Product.find({sellerId:req.params.id})
  res.json(products)

})

// app.delete('/sellerproduct',cors(),async(req,res)=>{
//   const p = await Product.deleteMany({})
//   res.json("meeaage")
// })


app.post("/sellerproduct",cors(),async (req,res)=>{

  const newProduct= new Product(req.body)
  const product= await newProduct.save()
  res.json(product)
})


app.patch("/sellerproduct/:id",cors(), async (req,res)=>{


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

app.delete("/sellerproduct/:id", cors(), async(req,res)=>{
  const product = await Product.findById({"_id" : req.params.id})
  await Product.deleteOne(product)
  res.status(200).json({message: "deleted!"})
})



app.get('/categories/:cid/sellerproduct',cors(), async(req,res)=>{
  const products = await Product.find({"Category": req.params.cid})
  res.json(products)
})

app.get('/categories/:cid/brands/:brandname/sellerproduct',cors(),async(req,res)=>{
  try{
    const products= await Product.find({Category:req.params.cid, productbrand: req.params.brandname})
    res.json(products)
  }
  catch(err){
    console.log(err)
  }
  
})

app.delete('/users/:id/sellerproduct/:productId',cors(),async(req,res)=>{
  try{
    const productItem = await Product.deleteOne({_id: req.params.productId})
    res.json(productItem)
  }
  catch(error){
    console.log(error)
  }
})


app.patch('/users/:id/sellerproduct/:productId',cors(),async(req,res)=>{
  const productItem = await Product.findByIdAndUpdate({_id: req.params.productId})
  productItem.productquantity = req.body.productquantity
  const item = await productItem.save()
  res.json(item)
})



//Image Upload

// const imageUpload = async(image) => {
//   const file = new Image({
//     fileName: image.file.originalname,
//     filePath: image.file.path,
//     fileType: image.file.mimetype,
//     fileSize: fileSizeFormatter(image.file.size, 2) // 0.00
// });
//   const f = await file.save();
//   return f;
// }

app.post('/sellers/:id/sellerproduct',cors(),upload.single('file'),async (req, res, next) => {
  try{
    const tmp = req.file.path.slice(8)
    // const pth = req.file.path[]
      const file = new Image({
          fileName: req.file.originalname,
          filePath: tmp,
          fileType: req.file.mimetype,
          fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
      });
      const f = await file.save();
      // const f = await imageUpload(req)
      const newProduct= new Product({sellerId:req.params.id,...req.body})
      // const product= await newProduct.save()
      newProduct.Images.push(f.id)
      const product = await newProduct.save()
    //  const updateProduct=  Product.findOneAndUpdate(
    //     {_id: product.id },
    //     {$push : {Images: f.id}}
    //   )
      // res.json(product)
      console.log(product)
      res.status(201).json(product);
  }catch(error) {
      res.status(400).send(error.message);
  }
      // res.json(img)
})

app.get('/sellerproduct/:id/image',cors(),async(req,res)=>{
  // const product = Product.find({"_id":req.params.id}).populate(Image)
  const img = await Image.find({})
  res.json(img)
})


//Cart

app.get('/cart',cors(),async(req,res)=>{
  let cartItems = await Cart.find({})
  res.json(cartItems)
})

app.delete('/cart',cors(),async(req,res)=>{
  const cartItems = await Cart.deleteMany()
})

app.get('/users/:id/cart',cors(),async(req,res)=>{
  const cartItems = await Cart.find({userId: req.params.id})
  console.log(cartItems)
  res.json(cartItems)
})

app.post('/users/:id/cart',cors(),async(req,res)=>{
  const newCartItem = await new Cart({...req.body,userId: req.params.id,})
  const item = newCartItem.save()
  console.log(item)
  res.json(newCartItem)
})

app.get('/users/:id/cart/:cartId',cors(),async(req,res)=>{
  const cartItem = await Cart.find({_id: req.params.cartId})
  res.json(cartItem)
})

app.patch('/users/:id/cart/:cartId',cors(),async(req,res)=>{
  const cartItem = await Cart.findByIdAndUpdate({_id: req.params.cartId})
    cartItem.qty = req.body.qty
  const item = await cartItem.save()
  res.json(item)
})

app.delete('/users/:id/cart/:cartId',cors(),async(req,res)=>{
  // const cartItem = await Cart.findByIdAndRemove({_id: req.params.cartId})
  // res.json(cartItem)
  try{
    const cartItem = await Cart.deleteOne({_id: req.params.cartId})
    res.json(cartItem)
  }
  catch(error){
    console.log(error)
  }
})


//User Orders

app.get('/orders',cors(),async(req,res)=>{
  const orders = await UserOrders.find({})

  res.header('Content-Range','orders 0-20/20')


  res.header('Content-Range','sellers 0-20/20')

  res.json(orders)

})


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

app.get('/users/:id',cors(),async(req,res)=>{
  const user = User.find({_id:req.params.id})
  res.json(user)
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






app.delete("/image/:id", cors(), async(req,res)=>{
  const img = await Image.findById({"_id": req.params.id})
  await Image.deleteOne(img)
})


app.listen(5000,()=>{
  console.log("listening......")
});