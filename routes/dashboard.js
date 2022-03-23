const express = require('express')
const connectDb = require('../middleware/database')

const router = express.Router()

router.get("/", connectDb((req, res) => {
    console.log(req.user)
    if (req.isAuthenticated()) {
        res.send("Home")
    } else {
        res.redirect('/login')
    }
    
}))

module.exports = router