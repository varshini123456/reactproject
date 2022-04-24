const mongoose = require('mongoose');

const sellerProfileSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Seller'
    },
    sellername: {
        type: String,
        required: true
    },
    sellerfirstname:{
        type: String,
        required: true
    },
    sellerlastname: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    }

})


module.exports = mongoose.model('SellerProfile',sellerProfileSchema)