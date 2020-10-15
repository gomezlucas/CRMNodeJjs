const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.generateJWT = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
    }, process.env.SECRETA)
}


const User = mongoose.model('user', userSchema)

module.exports = User