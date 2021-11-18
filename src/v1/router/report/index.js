const polka = require('polka')
const { getReportTotalUser, getReportTotalApp, getReportAccessApi } = require('../../controller/report')
const { sender } = require('../../helper/response')
const { middleReportApp, middleReportAccess } = require('../../middleware/rule')

const server = polka()

server.get("/user/total", async (_, res)=>{
  const resReport  = await getReportTotalUser()  
  sender(res, 200, "Berhasil menghitung banyak user terdaftar", resReport)
})

server.get("/app/total/:email", middleReportApp, async (req, res)=>{
  const {email} = req?.validated
  const resReport  = await getReportTotalApp(email)  
  sender(res, 200, "Berhasil menghitung banyak aplikasi terdaftar", resReport)
})

server.get("/access/total/:key", middleReportAccess, async (req, res)=>{
  const {key} = req?.validated
  const resReport  = await getReportAccessApi(key)  
  sender(res, 200, `Berhasil menghitung banyak akses aplikasi dengan id ${key}`, resReport)
})

module.exports = server