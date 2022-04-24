const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User' 
    },
    userProfile:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'UserProfile'
    },
    userProfileAddress:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'UserProfileAddress'
    }
})

module.exports = mongoose.model('Users', usersSchema)