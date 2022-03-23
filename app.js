const express = require('express')
const bodyParser = require('body-parser')
const login = require('./routes/login')
const register = require('./routes/register')
const users = require('./routes/users')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

app.use("/login", login)
app.use("/register", register)
app.use("/users", users)

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})