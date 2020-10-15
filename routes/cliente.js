const express = require('express')
const Client = require('../models/cliente')
const router = express.Router()
const auth = require('../middlewares/auth')
const Pedido = require('../models/pedido')


router.get('/', auth, async (req, res) => {
    const clients = await Client.find({ seller: req.user._id })

    res.send(clients)
})




router.get('/best', async (req, res) => {
         
    const clientes = await Pedido.aggregate([
        { $match: { state: "COMPLETADO" } },
        { $group:{
            _id: "$client",
            total: {$sum: '$total'}
        }},
        {
            $lookup:{
                from: 'clients',
                localField: '_id',
                foreignField: '_id',
                as: 'cliente'
            }
        }
    ])

 

    res.send(clientes)
})


router.get('/:id', auth, async (req, res) => {
       const client = await Client.findOne({ seller: req.user._id, _id: req.params.id })
     if (!client) return res.status(401).send('The user doesnt exist or your dont have access to his information')

    res.send(client)
})





router.post('/', auth, async (req, res) => {
    const client = new Client({
        name: req.body.name,
        lastName: req.body.lastName,
        company: req.body.company,
        email: req.body.email,
        seller: req.user._id
    })
    try {
        await client.save()
        res.send("The client has been saved")
    } catch (error) {
        res.send(error.message)
    }
})


router.delete('/:id', async (req, res) => {
    const client = await Client.findByIdAndDelete(req.params.id)
    if (!client) return res.status(401).send("the Client Doenst exists")
    res.send("the Client has been deleted")
})


router.put('/:id', async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        lastName: req.body.lastName,
        company: req.body.company, 
        email: req.body.email,
        telephone: req.body.telephone
    }, { new: true })

    if (!client) return res.status(401).send("The Client doesnt exist")

    res.send("The user info has been modified")
})

module.exports = router 