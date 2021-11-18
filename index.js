const polka = require("polka");
const dotenv = require("dotenv")
const mongoose = require('mongoose')

dotenv.config()

//def
const def = require("./src/v1/router/default")

//auth
const auth1 = require("./src/v1/router/auth")

//report
const report1 = require("./src/v1/router/report")

//v1 - dev
const webdev1 = require("./src/v1/router/web/dev");
const mobdev1 = require("./src/v1/router/mobile/dev")

const server = polka()

server.use("v1/setup", def)
server.use("v1/auth", auth1)
server.use("v1/report", report1)
server.use("v1/web/dev",webdev1)
server.use("v1/mobile/dev",mobdev1)

//console.log(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}:${process.env.MONGO_PORT}`)

mongoose.connect(`mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,  
  user:process.env.MONGO_USERNAME,
  pass:process.env.MONGO_PASSWORD,
  dbName:"Shipping"
}).then(()=>{      
  server.listen(3000, ()=>{
    console.log("Server Running in port : 3000")
  })
}).catch((err)=>{
  console.log(err)
})