const express = require('express')
const connectDb = require('../middleware/database')
const User = require('../models/User')
const Client = require('../models/Client')

const router = express.Router()

router.post("/register", connectDb(async (req, res) => {
    const id = req.body.key
    if (req.body.key) {
        const client = await Client.findById(id)
        if (client) {
            const user = new User({name: req.body.name, email: req.body.email, client: client.email})
            User.register(user, req.body.password, (err, user) => {
                if (err) {
                    res.send({err: true, msg: err})
                } else {
                    res.send({err: false, msg: user})
                }
            })
        } else {
            res.status(401).send({err: true, msg: "Unauthorized"})
        }
    } else {
        res.send({err: true, msg: "KEY required"})
    }
}))

module.exports = router