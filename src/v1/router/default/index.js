const polka = require('polka')
const server = polka()

const TipeService = require("../../model/mongo/tipeService")
const TipePaket = require("../../model/mongo/tipePackage")
const { sender } = require('../../helper/response')

server.post("/service", async (_, res)=>{
  TipeService.deleteMany({})
  TipeService.insertMany([
    {
      tipe:"instant"
    },  
    {
      tipe:"regular"
    },
    {
      tipe:"express"
    },
    {
      tipe:"trucking"
    },
    {
      tipe:"same-day"
    }
  ])
  sender(res, 200, "Berhasil setup service", {})
})

server.post("/paket", async (_, res)=>{
  TipePaket.deleteMany({})
  TipePaket.insertMany([
    {
      id:"1",
      tipe:"Pengiriman Dokumen"
    },
    {
      id:"2",
      tipe:"Paket Kecil"
    },
    {
      id:"3",
      tipe:"Paket Sedang"
    }
  ])
  sender(res, 200, "Berhasil setup paket", {})
})

module.exports = server