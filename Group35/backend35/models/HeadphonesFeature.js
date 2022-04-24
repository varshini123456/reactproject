const mongoose = require('mongoose')

const HeadphonesFeatureSchema = new mongoose.Schema({
    categoryID:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Category'
    },
    Color: {
        type: String,
        required: true
    },
    ConnectorType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('HeadphonesFeature',HeadphonesFeatureSchema)