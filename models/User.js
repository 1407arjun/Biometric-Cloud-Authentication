const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
  username: String,
  password: String,
  client: String
})

User.plugin(passportLocalMongoose);

module.exports = mongoose.models.User || mongoose.model("User", User);