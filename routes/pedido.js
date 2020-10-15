const express = require('express')
const Pedido = require('../models/pedido')
const Product = require('../models/product')
const router = express.Router()
const auth = require('../middlewares/auth')
const Client = require('../models/product')


router.get('/', auth, async (req, res) => {


    const pedidos = await Pedido.find({}).populate('client', 'name lastName')
    res.send(pedidos)

})


router.post('/', auth, async (req, res) => {
    const pedido = new Pedido({
        pedido: req.body.pedido,
        seller: req.user._id,
        client: req.body._id,
        total: req.body.total
    })
    try {
        //  Revisar que el stock este disponible
        for await (article of pedido.pedido) {
            const { _id } = article
            const producto = await Product.findById(_id)
            if (article.cantidad > producto.quantity) {
                res.status(400).send(`The product ${producto.name} exceeds the quantity in Stock`)
                return
            } else {
                producto.quantity = producto.quantity - article.cantidad
                await producto.save()
            }
        }
        
        await pedido.save()
        res.send(pedido)

         
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await Pedido.findByIdAndDelete(req.params.id)
        res.send('The Order has been deleted')
    } catch (e) {
        console.log(e.message)
    }
})


router.put('/:id', auth, async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ _id: req.params.id })
        
        if (!pedido) {
            res.status(400).send('The order does not exist or have been already deleted')
        }
        let state = req.body.state
        
        const result = await Pedido.findOneAndUpdate({_id: req.params.id}, {state} , { new: true })
        res.send(result)

    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router