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



const upload = multer({storage: storage, fileFilter: filefilter})

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

const loginRouter = require('./routes/loginroutes')
app.use('/login',loginRouter)

const sellerloginRouter = require('./routes/sellerloginroutes')
app.use('/sellerlogin',sellerloginRouter)

// app.post('/users/:id/orders',cors(),async(req,res)=>{
//   const newOrder = await new UserOrders(req.body)
//   const order = await newOrder.save()
//   console.log(order)
//   res.json(order)
// })

// app.get('/users/:id/orders',cors(),async(req,res)=>{
//   const orders = await UserOrders.find({userId:req.params.id})
//   res.json(orders)

// })

// app.delete('/users/:id/orders/:orderId',cors(),async(req,res)=>{
//   const orders = await UserOrders.deleteOne({_id:req.params.orderId})
//   res.json(orders)

// })

// app.delete('/users/:id/orders',cors(),async(req,res)=>{
//   const orders = await UserOrders.deleteMany({userId:req.params.id})
//   res.json(orders)

// })



// Seller Orders
// app.get('/sellers/:id/orders',cors(),async(req,res)=>{
//   const orders = await UserOrders.find({sellerId:req.params.id})
//   res.json(orders)

// })


// app.patch("/users/:id",cors(), async (req,res)=>{

//   const user = await User.findById(req.params.id)

//   if(req.body.username != null){
//       user.username = req.body.username
//   }
//   if(req.body.email != null){
//       user.email = req.body.email
//   }
//   if(req.body.password != null){
//       user.password = req.body.password
//   }
//   try{
//       const updatedUser = await user.save()
//       res.status(200).json(updatedUser)
//   }
//   catch(error){
//       req.status(500).json({message: error.message})
//   }
 
// })

// app.delete("/users/:id", cors(), async (req,res)=>{
//   const user = await User.findById({"_id": req.params.id})
//   await User.deleteOne(user)
//   res.status(200).json({message: "deleted"})
// })


// app.delete('/categories/:id', cors(), async (req,res)=>{
//   const cat = await Category.findById({"_id": req.params.id})
//   await Category.deleteOne(cat)
//   res.status(200).json({message: "deleted"})
// })

// app.delete('/brands/:id', cors(), async (req,res)=>{
//   const brand_id = await Brand.findById({"_id": req.params.id})
//   await Brand.deleteOne(brand_id)
//   res.status(200).json({message: "deleted"})
// })

// Features of a category
app.get('/categories/:id/features',cors(), (req,res)=>{

  var query = { cid: req.params.id };
  db.collection("features").find(query).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
    //db.close();
  });

  
})

// Posting a product
const type=upload.single('file')
app.post('/sellers/:id/sellerproduct',cors(),async (req, res, next) => {
  try{
    // const tmp = req.file.path.slice(8)

    // const file = new Image({
    //       fileName: req.file.originalname,
    //       filePath: tmp,
    //       fileType: req.file.mimetype,
    //       fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
    //   });
    //   const f = await file.save();
      
      const newProduct= new Product({sellerId:req.params.id,...req.body})
      // newProduct.Images.push(f.id)
      const product = await newProduct.save()

      res.status(201).json(product);
  }catch(error) {
      res.status(400).send(error.message);
  }
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

module.exports = app