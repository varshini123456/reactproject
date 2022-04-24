const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
      Name :{
          type:String
      },
      Category : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category'
      },
     

      
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);