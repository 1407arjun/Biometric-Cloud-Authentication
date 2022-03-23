const express = require('express')
const connectDb = require('../middleware/database')
const Client = require('../models/Client')
const passport = require('passport')

const router = express.Router()

router.get("/", connectDb((req, res) => {
    if (req.isAuthenticated()) { 
        res.redirect("/dashboard")
    } else {
        res.render("register")
    }
}))

router.post("/", connectDb((req, res) => {
    client = new Client({name: req.body.name, email: req.body.email})
    Client.register(client, req.body.password, (err, user) => {
        if (err) {
            res.send(err)
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/dashboard")
            });
        }
    })
}))

module.exports = router