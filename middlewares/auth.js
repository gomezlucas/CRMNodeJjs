const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

function auth(req, res, next) {
    const jwtToken = req.header('authorization')
    if (!jwtToken) return res.status(401).send("Access Denied. The token was invalid")

    try {
        const payload = jwt.verify(jwtToken, process.env.SECRETA)
        req.user = payload
        next()

    } catch (e) {
        res.status(400).send("Access Denied. The token was invalid")
    }
}

module.exports = auth