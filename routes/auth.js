const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')


// User Login and get Token
router.post('/', async (req, res) => {
    if (req.body.email === '' || req.body.user === "") {
        res.status(401).send("The password or user cant be empty")
    }
     const user = await User.findOne({ email: req.body.email })

    if (!user) return res.status(400).send("The Password or user doesnt exist")


    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) return res.status(400).send("The User or password is incorrect")

    const jwtToken = user.generateJWT();

    res.status(201).header("Authorization", jwtToken).send("Usuario Loggeado")

})


module.exports = router