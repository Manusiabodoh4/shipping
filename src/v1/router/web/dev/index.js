const polka = require("polka")
const json = require('../../../middleware/json')

const { sender } = require("../../../helper/response")
const { getLocationCountryKeyword, getLocationCountries, getLocationProvinces, getTipeService, getDataKurirDomestik, getDataKurirDomestikTipe, getDataKurirInternasional, getTipePackage, createOrder, getDetailOrder, cancelOrder, createPickup, cancelPickup, getLocationCities, getLocationSub} = require("../../../controller/dev")
const { middleLocationKeyword, middleLocationCountries, middleLocationProvinces, middleLocationCities, middleLocationSub, middleKurirDomestik, middleKurirDomestikTipe, middleKurirInternasional, middleOrderNew, middleOrderDetail, middleCancelOrder, middleCreatePickup, middleCancelPickup, middleKey } = require("../../../middleware/rule")
const { notesLoggerWebDevelopment } = require("../../../controller/logger")
  
const key = require("../../../middleware/key")

const server = polka()

//GET

server.get("/lokasi",middleKey,key,middleLocationKeyword, async (req, res)=>{ 
  const {keyword} = req?.validated  
  const key = req?.key
  const resNet = await getLocationCountryKeyword(keyword)  
  notesLoggerWebDevelopment(`/lokasi`, `Pencarian lokasi menggunakan keyword ${keyword}`, key )
  if(resNet?.data?.data?.length === 0){
    sender(res, 404, `Data dengan keyword ${keyword} tidak ditemukan`, [])
  }else{
    sender(res, 200, "Data berhasil di temukan", resNet?.data)  
  } 
})

server.get("/lokasi/negara",middleKey,key,middleLocationCountries, async (req, res)=>{    
  let bod = req?.validated   
  const key = req?.key
  if(bod === null || bod === undefined){
    bod = {}
  }
  const resNet = await getLocationCountries(bod?.id, bod?.limit, bod?.page)
  notesLoggerWebDevelopment(`/lokasi/negara`, `Pencarian detail bedasarkan lokasi negara dengan id ${bod?.id}`, key)
  if(resNet?.data?.data?.length === 0){
    sender(res, 404, `Data negara tidak ditemukan`, [])
  }else{
    sender(res, 200, "", resNet?.data)  
  }
})

server.get("/lokasi/provinsi",middleKey,key,middleLocationProvinces, async (req, res)=>{    
  let bod = req?.validated   
  const key = req?.key
  if(bod === null || bod === undefined){
    bod = {}
  }
  const resNet = await getLocationProvinces(bod?.idNegara, bod?.id, bod?.limit, bod?.page)
  notesLoggerWebDevelopment(`/lokasi/provinsi`, `Pencarian detail bedasarkan lokasi provinsi dengan id ${bod?.id}`, key)
  if(resNet?.data?.data?.length === 0){
    sender(res, 404, `Data provinsi  tidak ditemukan`, [])
  }else{
    sender(res, 200, "", resNet?.data)  
  }
})

server.get("/lokasi/kota",middleKey,key,middleLocationCities, async (req, res)=>{    
  let bod = req?.validated   
  const key = req?.key
  if(bod === null || bod === undefined){
    bod = {}
  }
  const resNet = await getLocationCities(bod?.idProvinsi, bod?.id, bod?.limit, bod?.page)
  notesLoggerWebDevelopment(`/lokasi/kota`, `Pencarian detail bedasarkan lokasi kota dengan id ${bod?.id}`, key)
  if(resNet?.data?.data?.length === 0){
    sender(res, 404, `Data kota  tidak ditemukan`, [])
  }else{
    sender(res, 200, "", resNet?.data)  
  }
})

server.get("/lokasi/kecamatan",middleKey,key,middleLocationSub, async (req, res)=>{    
  let bod = req?.validated   
  const key = req?.key
  if(bod === null || bod === undefined){
    bod = {}
  }
  const resNet = await getLocationSub(bod?.idKota, bod?.id, bod?.limit, bod?.page)
  notesLoggerWebDevelopment(`/lokasi/kecamatan`, `Pencarian detail bedasarkan lokasi kecamatan dengan id ${bod?.id}`, key)
  if(resNet?.data?.data?.length === 0){
    sender(res, 404, `Data kecamatan  tidak ditemukan`, [])
  }else{
    sender(res, 200, "", resNet?.data)  
  }
})

server.get("/kurir/tipe",middleKey,key, async (req, res)=>{
  const key = req?.key
  const data = await getTipeService()
  notesLoggerWebDevelopment(`/kurir/tipe`, `Request untuk mendapatkan list tipe service`, key)
  if(data?.length === 0){
    sender(res, 404, `Data tipe  tidak ditemukan`, [])
  }else{
    sender(res, 200, "Data tipe kurir berhasil ditemukan", data)
  }  
})

server.get("/kurir/tipe/select",middleKey,key, async (req, res)=>{
  const key = req?.key
  const data = await getTipeService()
  notesLoggerWebDevelopment(`/kurir/tipe/select`, `Request untuk mendapatkan list tipe service dengan mode select`, key)  
  const arr=[]
  const len = data?.length
  for(let i=0;i<len;i++){
    arr.push({label:data[i]?.tipe?.toUpperCase(), value:data[i]?.tipe})
  }
  if(arr?.length === 0){
    sender(res, 404, `Data tipe  tidak ditemukan`, [])
  }else{
    sender(res, 200, "Data tipe berhasil ditemukan", arr)
  }  
})

server.get("/paket/tipe",middleKey,key, async (req, res)=>{
  const key = req?.key
  const data = await getTipePackage()
  notesLoggerWebDevelopment(`/paket/tipe`, `Request untuk mendapatkan list tipe paket`, key)
  if(data?.length === 0){
    sender(res, 404, `Data tipe  tidak ditemukan`, [])
  }else{
    sender(res, 200, "Data tipe paket berhasil ditemukan", data)
  }
})

server.get("/paket/tipe/select",middleKey,key, async (req, res)=>{
  const key = req?.key
  const data = await getTipePackage()
  notesLoggerWebDevelopment(`/paket/tipe/select`, `Request untuk mendapatkan list tipe paket dengan mode select`, key)
  const arr=[]
  const len = data?.length
  for(let i=0;i<len;i++){
    arr.push({label:data[i]?.tipe?.toUpperCase(), value:data[i]?.id})
  }
  if(arr?.length === 0){
    sender(res, 404, `Data tipe  tidak ditemukan`, [])
  }else{
    sender(res, 200, "Data tipe berhasil ditemukan", arr)
  }  
})

server.get("/order/:order_id",middleKey,key, middleOrderDetail, async (req, res)=>{
  const key = req?.key
  const id = req?.validated?.order_id
  const resNet = await getDetailOrder(id) 
  notesLoggerWebDevelopment(`/order/:order_id`, `Request untuk mendapatkan detail order dengan id ${id}`, key)
  if(resNet?.data?.data === null){
    sender(res, 404, `Order dengan ${id} tidak ditemukan`, [])
  }else{
    sender(res, 200, `Order dengan ${id} berhasil ditemukan`, resNet?.data)
  }  
})


//DELETE

server.delete("/order/cancel",middleKey,key, json, middleCancelOrder, async (req, res)=>{
  const key = req?.key
  const bod = req?.validated
  const resNet = await cancelOrder(bod?.order_id, bod?.alasan)
  notesLoggerWebDevelopment(`/order/cancel`, `Cancel order dengan id ${bod?.order_id}`, key)
  if(resNet?.data?.data === null){
    sender(res, 404, `Order dengan ${bod?.order_id} tidak ditemukan`, [])
  }else if(resNet?.data?.metadata?.http_status_code === 200){
    sender(res, 200, `Order dengan ${bod?.order_id} berhasil di cancel`, resNet?.data)
  }else{
    sender(res, 400, `Terjadi Kesalahan`, [])
  }
})

server.delete("/pickup/cancel",middleKey,key, json, middleCancelPickup, async (req, res)=>{
  const key = req?.key
  const bod = req?.validated
  const resNet = await cancelPickup(bod)
  notesLoggerWebDevelopment(`/pickup/cancel`, `Cancel pickup dengan id ${bod?.pickup_code}`, key)
  if(resNet?.data?.data === null){
    sender(res, 404, `Order dengan ${bod?.pickup_code} tidak ditemukan`, [])
  }else if(resNet?.data?.metadata?.http_status_code === 200){
    sender(res, 200, `Order dengan ${bod?.pickup_code} berhasil di cancel`, resNet?.data)
  }else{
    sender(res, 400, `Terjadi Kesalahan`, [])
  }
})


//POST

server.post("/pickup",middleKey,key, json, middleCreatePickup, async (req, res)=>{
  const key = req?.key
  const bod = req?.validated
  const resNet = await createPickup(bod)
  notesLoggerWebDevelopment(`/pickup`, `Pembuatan pickup bedasarkan order`, key)
  if(resNet?.data?.data === null){
    sender(res, 404, `Pickup dengan ${bod?.order_id} tidak ditemukan`, [])
  }else if(resNet?.data?.metadata?.http_status_code === 200){
    sender(res, 200, `Pickup dengan ${bod?.order_id} berhasil di buat`, resNet?.data)
  }else{
    sender(res, 400, `Terjadi Kesalahan`, resNet)
  }
})

server.post("/order",middleKey,key, json, middleOrderNew, async (req, res)=>{  
  const key = req?.key
  const bod = req?.validated
  const resNet = await createOrder(bod)
  notesLoggerWebDevelopment(`/order`, `Pembuatan order bedasarkan barang item pembelian`, key)
  if(resNet?.data === null){
    sender(res, 404, `Data order tidak berhasil di buat`)
  }else{
    sender(res, 201, "Data order berhasil dibuat", resNet?.data)
  } 
})

server.post("/kurir/domestik",middleKey,key, json, middleKurirDomestik, async (req, res)=>{
  const key = req?.key
  const bod = req?.validated
  const resNet = await getDataKurirDomestik(bod)
  notesLoggerWebDevelopment(`/kurir/domestik`, `Mendapatkan list kurir bedasarkan rekomendasi jarak yang ditentukan`, key)
  if(resNet?.data?.data?.pricings?.length === 0){
    sender(res, 404, "Data kurir domestik kosong", [])  
  }else if(resNet?.data?.data === null || resNet?.data?.data === undefined){
    sender(res, 400, "Terjadi kesalahan", resNet?.data)  
  }else{
    sender(res, 200, "Data kurir domestik berhasil ditemukan", resNet?.data)
  }  
})

server.post("/kurir/domestik/:tipe",middleKey,key, middleKurirDomestikTipe, json, middleKurirDomestik, async (req, res)=>{
  const key = req?.key
  const bod = req?.validated  
  const {tipe} = req?.params
  const resNet = await getDataKurirDomestikTipe(bod, tipe)
  notesLoggerWebDevelopment(`/kurir/domestik/:tipe`, `Mendapatkan list kurir bedasarkan tipe ${tipe}`, key)
  if(resNet?.data?.data?.pricings?.length === 0){
    sender(res, 404, "Data kurir domestik kosong", [])  
  }else if(resNet?.data?.data === null || resNet?.data?.data === undefined){
    sender(res, 400, "Terjadi kesalahan", resNet?.data)  
  }else{
    sender(res, 200, "Data kurir domestik berhasil ditemukan", resNet?.data)
  }  
})

server.post("/kurir/internasional",middleKey,key, json, middleKurirInternasional, async (req, res)=>{
  const key = req?.key
  const bod = req?.validated
  const resNet = await getDataKurirInternasional(bod)
  notesLoggerWebDevelopment(`/kurir/internasional`, `Mendapatkan list kurir bedasarkan rekomendasi jarak (internasional)`, key)
  if(resNet?.data?.data?.pricings?.length === 0){
    sender(res, 404, "Data kurir internasioal kosong", [])  
  }else if(resNet?.data?.data === null || resNet?.data?.data === undefined){
    sender(res, 400, "Terjadi kesalahan", resNet?.data)  
  }
  else{
    sender(res, 200, "Data kurir internasional berhasil ditemukan", resNet?.data)
  } 
})

module.exports = server