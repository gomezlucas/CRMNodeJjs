const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Pedido = require('../models/pedido')


// Get all Users
router.get('/', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

//Create New user
router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("El email ya se encuentra registrado")

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const result = await user.save()
        const jwtToken = user.generateJWT()
        res.status(201).header("Authorization", jwtToken).send("The user has been created succesfully")
    } catch (error) {
        res.send(error.message)
    }
})



// Modified User 
router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
    }, { new: true })
    if (!user) return res.status(401).send("The User doesnt exist")

    res.send("The user info has been modified")
})


// Delete User
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(401).send("the user Doenst exists")
    res.send("the User has been deleted")
})


// Get Best Sales Assistants
router.get('/best', async (req, res) => {
         
    const vendedores = await Pedido.aggregate([
        { $match: { state: "COMPLETADO" } },
        { $group:{
            _id: "$seller",
            total: {$sum: '$total'}
        }},
        {
            $lookup:{
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'vendedor'
            }
        }
    ])
    res.send(vendedores)
})

//Get one User
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(401).send("the User doesnt exist")
    res.send(user)
})


module.exports = router