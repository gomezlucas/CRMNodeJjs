const mongoose = require('mongoose')


const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: String,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Usuario',
        trim: true    }
})


const Client = mongoose.model('client', clientSchema)

module.exports = Client