const mongoose = require('mongoose')

const userProfileAddressSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    city:{
        type: String,
        required: true
    },
    houseNo:{
        type: String,
        required: true
    },
    pinCode:{
        type: Number,
        required: true
    },
    deliveryAddress:{ 
        type: String,
        required: true
    }
})

module.exports = mongoose.model('userProfileAddressSchema' , UserProfileAddress)