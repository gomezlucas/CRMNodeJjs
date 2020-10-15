const express = require('express')
const Product = require('../models/product')
const router = express.Router()
const auth = require('../middlewares/auth')


router.get('/', auth, async (req, res) => {
    const products = await Product.find({})

    res.send(products)
})


router.get('/:id', auth, async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id })
    if (!product) return res.status(401).send('The Product doesnt exist or your dont have access to his information')

    res.send(product)
})



router.post('/', auth, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
    })
     try {
        await product.save()
        res.send("The Product has been saved")
    } catch (error) {
        res.send(error.message)
    }
})


router.delete('/:id', auth, async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(401).send("the Product Doenst exists")
    res.send("the Product has been deleted")
})


router.put('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    }, { new: true })

    if (!product) return res.status(401).send("The product doesnt exist")

    res.send("The product info has been modified")
})

module.exports = router 