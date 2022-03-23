const express = require('express')
const connectDb = require('../middleware/database')
const Client = require('../models/Client')
const passport = require('passport')

const router = express.Router()

router.get("/", connectDb((req, res) => {
    if (req.isAuthenticated()) { 
        res.redirect("/dashboard")
    } else {
        res.render("login")
    }
}))

router.post("/", (req, res) => {
    passport.authenticate("local")(req, res, function() {
        res.redirect("/dashboard")
    })
})

module.exports = router