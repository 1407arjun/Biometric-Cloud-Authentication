const express = require('express')
const connectDb = require('../middleware/database')

const router = express.Router()

router.get("/", connectDb((req, res) => {
    if (req.isAuthenticated()) {
        req.session.user = {
            uuid: '12234-2345-2323423'
        }
        req.session.save(err => {
            if(err)
                console.log(err)
        })
        res.send("Home")
    } else {
        res.redirect('/login')
    }
    
}))

module.exports = router