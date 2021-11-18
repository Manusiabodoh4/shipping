const polka = require("polka")
const { createAccount, createApplication } = require("../../controller/auth")
const { sender } = require("../../helper/response")
const json = require("../../middleware/json")
const { middleCreateAccount, middleCreateApplication } = require("../../middleware/rule")

const server = polka()

server.post("/account", json , middleCreateAccount, async (req, res)  => {
  const {email} = req?.validated 
  const resDb = await createAccount(email)
  if(!resDb?.status){
    sender(res, 400, resDb?.data , {})
  }else{
    sender(res, 200, resDb?.data, {email})
  }
})

server.post("/application", json, middleCreateApplication, async (req, res)=>{
  const {email, aplikasi, platform} = req?.validated  
  const resDb  = await createApplication(email, aplikasi, platform)
  if(!resDb?.status){
    sender(res, 400, resDb?.data, {})
  }else{
    sender(res, 200, "Berhasil membuat kunci aplikasi", {email, key:resDb?.data})
  }
})

module.exports = server