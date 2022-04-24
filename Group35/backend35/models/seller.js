const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    sellername: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    gst: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Seller', sellerSchema)