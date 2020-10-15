const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
const corsOptions = {
    exposedHeaders: 'Authorization',
};
app.use(cors(corsOptions))
const cliente = require('./routes/cliente')
const user = require('./routes/user')
const auth = require('./routes/auth')
const product = require('./routes/product')
const pedido = require('./routes/pedido')

app.use('/cliente', cliente)
app.use('/user', user)
app.use('/auth', auth)
app.use('/product', product)
app.use('/pedido', pedido)
const port = process.env.PORT || 3003
require('dotenv').config({path: 'variables.env'})



app.listen(port, () => console.log('Listening port:' + port))

mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(() => console.log('There is a problem with the DB conection'))