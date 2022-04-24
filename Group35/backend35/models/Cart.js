const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId : {
        type: String,
        // ref: 'User'
    },
    cid: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Category'
    },
    pid: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Product'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Seller'
    },
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
    ram: {
        type: String,
    },
    storage: {
        type: String,
    },
    color: {
        type: String
    },
    connectorType:{
        type: String
    },
    productquantity: {
        type: Number,
        required: true,
        min: 1
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    }


})


module.exports = mongoose.model('Cart',cartSchema)