const mongoose = require('mongoose')

const schema = mongoose.Schema;

const User = new schema({
  email : {type:String, required:true},  
}, {timestamps: true})

module.exports = mongoose.model("user", User)