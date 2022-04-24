const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    // productId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref : 'Product'
    // },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Image',imageSchema)