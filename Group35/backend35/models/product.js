const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {

    sellerId: {
        type: String
    }, 
    sellername:{
        type:String
    },  
    productname :{
          type:String
    },
    productbrand : {
        type: String
        
      },
      productprice: {
        type: Number,
        required: true,
        min: 1
    },
    
    ram:{
        type:Number
    },
    storage:{
        type:String
    },
    color:{
        type:String
    },
    connectorType:{
        type:String
    },
    productquantity: {
        type: Number,
        required: true,
        min: 1
    },
      
      Category : {
         type: String
      },
      Images : [{type: mongoose.Schema.Types.ObjectId, ref:'Image'}], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);