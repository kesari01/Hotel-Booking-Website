const mongoose = require("mongoose")

var mongoURL = 'mongodb+srv://pratikkumarp007:kiit2024@cluster0.aeqpxnf.mongodb.net/mern-hotels'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewURLParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
  console.log('mongoBD connection failed')
})

connection.on('connected', ()=>{
  console.log('mongoBD connection successful')
})

module.exports = mongoose
