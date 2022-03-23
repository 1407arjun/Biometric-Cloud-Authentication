const express = require('express')
const bodyParser = require('body-parser')
const login = require('./routes/login')
const register = require('./routes/register')
const dashboard = require('./routes/dashboard')
const Client = require('./models/Client')

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("public"))
app.set("view engine", "ejs")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 * 24 }
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
    req.logout();
    res.redirect('/login');
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})