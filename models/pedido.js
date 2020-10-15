const mongoose = require("mongoose")


const pedidoSchema = new mongoose.Schema({
    pedido: {
        type: Array,
        required:true, 
    },
    total: {
        type: Number,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    state: {
        type: String,
        default: "PENDIENTE"
    }
})


const Pedido = mongoose.model('pedido', pedidoSchema)

module.exports = Pedido