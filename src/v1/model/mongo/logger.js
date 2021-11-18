const mongoose = require('mongoose')

const schema = mongoose.Schema;

const Logger = new schema({
  url : {type:String, required:true},
  isProd : {type:Boolean, required:true, default:false},
  platform : {type:String, required:true},
  deskripsi : {type:String, required:true, minlength:10},
  key : {type:String, required:true}
}, {timestamps: true})

module.exports = mongoose.model("logger", Logger)