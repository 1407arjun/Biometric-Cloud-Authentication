const mongoose = require('mongoose')

require('dotenv').config()

const connectDb = (handler) => async (req, res) => {
    try {
      if (mongoose.connections[0].readyState) {
        return handler(req, res);
      }

      await mongoose.connect(process.env.MONGODB_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }).then(() => {
          console.log("Connected to DB!");
          return handler(req, res);
      })
    } catch (e) {
        console.log("Error in connecting to DB!", e.message);
        return handler(req, res);
    }
}

module.exports = connectDb