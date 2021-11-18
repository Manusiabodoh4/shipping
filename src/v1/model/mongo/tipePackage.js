const mongoose = require('mongoose')

const schema = mongoose.Schema;

const TipePackage = new schema({
  id : {type:String, required:true},  
  tipe : {type: String, required:true}
})

module.exports = mongoose.model("tipe_paket", TipePackage)