const mongoose = require('mongoose')

const userOrdersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Product'
    },
    return: {
        type: Boolean,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Seller'
    },
    // username: {
    //     type: String,
    //     required: true
    // },
    sellername: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    productbrand: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true,
        min: 1
    },
    productquantity: {
        type: Number,
        required: true,
        min: 1
    },
    cid: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Category'
    },
    cartQuantity: {
        type: Number,
        required: true,
        min: 1
    }
},  
{ timestamps: true }
)


module.exports = mongoose.model('UserOrders',userOrdersSchema)