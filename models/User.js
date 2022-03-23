const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  client: String
})

User.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.models.User || mongoose.model("User", User);