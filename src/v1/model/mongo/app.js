const mongoose = require('mongoose')

const schema = mongoose.Schema;

const App = new schema({
  email : {type:String, required:true},  
  aplikasi : {type:String, required:true},
  platform : {type:String, required:true},  
  key : {type:String, required:true},
  iv : {type:String, required:true}
}, {timestamps: true})

module.exports = mongoose.model("app", App)