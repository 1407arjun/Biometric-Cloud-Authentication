const express = require('express')
const connectDb = require('../middleware/database')
const User = require('../models/User')

const router = express.Router()

router.get("/", connectDb(async (req, res) => {
    if (req.isAuthenticated()) {
        req.session.user = {
            uuid: '12234-2345-2323423'
        }
        req.session.save(err => {
            if(err)
                console.log(err)
        })
        const users = await User.find({client: req.user.email})
        res.render("dashboard", {user: req.user, users})
    } else {
        res.redirect('/login')
    }
    
}))

module.exports = router