const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const Client = new mongoose.Schema({
  name: String,
  username: String,
  password: String
})

Client.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.models.Client || mongoose.model("Client", Client);