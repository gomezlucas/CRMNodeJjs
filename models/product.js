const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true, 
        trim: true,
    },
    quantity:{
        type: Number,
        required: true, 
        trim: true
    },
    price:{
        type:Number,
        required: true, 
        trim: true
    },
    created_at:{
        type: Date,
        default: Date.now,
    }
})


const Product = mongoose.model('product', productSchema)

module.exports = Product