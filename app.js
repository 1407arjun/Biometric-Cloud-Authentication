const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const login = require('./routes/login')
const register = require('./routes/register')
const dashboard = require('./routes/dashboard')
const Client = require('./models/Client')

const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("public"))
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const clientPromise = mongoose.connect(
    process.env.MONGODB_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(m => m.connection.getClient())

app.use(cookieParser())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        clientPromise,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(Client.createStrategy())
passport.serializeUser(Client.serializeUser())
passport.deserializeUser(Client.deserializeUser())

app.use("/login", login)
app.use("/register", register)
app.use("/dashboard", dashboard)

app.get('/logout', function(req, res) {
    if (req.session.userId) {
        req.logout()
        req.session.destroy(err => {
            if(err){
                res.send(err);
            } else {
                res.redirect('/login')
            }
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})