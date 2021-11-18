const mongoose = require('mongoose')

const schema = mongoose.Schema;

const TipeService = new schema({
  tipe : {type: String, required:true}
})

module.exports = mongoose.model("tipe_servis", TipeService)