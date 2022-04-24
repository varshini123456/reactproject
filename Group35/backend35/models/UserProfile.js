const mongoose = require('mongoose');

const userprofileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userfirstname: {
        type: String,
        required: true
    },
    userlastname: {
        type: String,
        required: true
    }, 
    city:{
        type: String,
        required: true
    },
    address:{ 
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserProfile',userprofileSchema)