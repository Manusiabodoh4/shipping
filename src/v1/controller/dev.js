const { net } = require("../helper/net")

const TipeService = require("../model/mongo/tipeService")
const TipePackage = require("../model/mongo/tipePackage")

const {formatRFC3339, addHours} = require('date-fns')

function convertTZ(date, tzString) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

const getLocationCountryKeyword = async (keyword) => {
  keyword = (keyword||"") 
  const res = await net("GET", `https://merchant-api-sandbox.shipper.id/v3/location?adm_level=5&keyword=${keyword}`)
  return res
}

const getLocationCountries = async (id, limit, page) => {
  id = (id||228)
  limit = (limit||100)
  page = (page||1)  
  const res = await net("GET", `https://merchant-api-sandbox.shipper.id/v3/location/countries?country_id=${id}&limit=${limit}&page=${page}`)
  return res
}

const getLocationProvinces = async (idNegara, idProvinsi, limit, page) => {
  idNegara = (idNegara||228)
  idProvinsi = (idProvinsi||6)
  limit = (limit||100)
  page = (page||1)  
  const res = await net("GET", `https://merchant-api-sandbox.shipper.id/v3/location/country/${idNegara}/provinces?limit=${limit}&page=${page}&province_id=${idProvinsi}`)
  return res
}

const getLocationCities = async (idProvinsi, idKota, limit, page) => {  
  idProvinsi = (idProvinsi||6)
  idKota = (idKota||"")
  limit = (limit||100)
  page = (page||1)  
  const res = await net("GET", `https://merchant-api-sandbox.shipper.id/v3/location/province/${idProvinsi}/cities?limit=${limit}&page=${page}&city_ids=${idKota}`)
  return res
}

const getLocationSub = async (idKota, idSub, limit, page) => {
  idKota = (idKota||41)
  idSub = (idSub||"")
  limit = (limit||100)
  page = (page||1)  
  const res = await net("GET", `https://merchant-api-sandbox.shipper.id/v3/location/city/${idKota}/suburbs?limit=${limit}&page=${page}&suburb_ids=${idSub}`)
  return res
}

const getDataKurirDomestik = async (data) => {
  
  if(data === null || data === undefined) return []
  
  const ob = data  
  ob.item_value = data?.amount
  ob.for_order = true  

  const res = await net("POST", `https://merchant-api-sandbox.shipper.id/v3/pricing/domestic`, ob)
  return res

}

const getDataKurirDomestikTipe = async (data, tipe) => {
  
  if(data === null || data === undefined) return []
  
  const ob = data  
  ob.item_value = data?.amount
  ob.for_order = true  

  const res = await net("POST", `https://merchant-api-sandbox.shipper.id/v3/pricing/domestic/${tipe}`, ob)
  return res

}

const getDataKurirInternasional = async (data) => {

  if(data === null || data === undefined) return []

  const ob = data  
  ob.item_price = data?.amount  
  ob.for_order = true  

  const res = await net("POST", "https://merchant-api-sandbox.shipper.id/v3/pricing/international", data)
  return res

}

const getTipeService = async () => {
  return await TipeService.find({})       
}

const getTipePackage = async () => {
  return await TipePackage.find({})
}

const createOrder = async (data) => {

  if(data === null || data === undefined) return []
  const ob = {}

  ob.consignee = {}
  ob.consigner = {}
  ob.origin = {}
  ob.destination = {}
  ob.package = {}

  ob.consignee.name = data?.pengirim?.name  
  ob.consignee.phone_number = data?.pengirim?.phone_number  
  
  ob.consigner.name = data?.penerima?.name
  ob.consigner.phone_number = data?.penerima?.phone_number

  ob.courier = data?.kurir

  ob.coverage = data?.tipe_kurir
  ob.payment_type = data?.tipe_pembayaran

  ob.external_id = data?.external_id

  ob.origin = data?.pengirim?.pengiriman
  ob.origin.address = ob?.origin?.alamat

  ob.destination = data?.penerima?.pengiriman
  ob.destination.address = ob?.destination?.alamat

  ob.package.items = data?.paket?.items

  ob.package.height = data?.paket?.height
  ob.package.length = data?.paket?.length
  ob.package.package_type = data?.paket?.tipe
  ob.package.price = data?.paket?.amount
  ob.package.weight = data?.paket?.weight
  ob.package.width = data?.paket?.width

  const res = await net("POST", "https://merchant-api-sandbox.shipper.id/v3/order/",  ob)
  return res

}

const getDetailOrder = async (id) => {
  id = (id||"")
  return await net("GET", `https://merchant-api-sandbox.shipper.id/v3/order/${id}`) 
}

const cancelOrder = async (id, reason) => {
  id = (id||"")
  reason = (reason||"")
  return await net("DELETE", `https://merchant-api-sandbox.shipper.id/v3/order/${id}`, {reason})
}

const createPickup = async data => {      
  let date = ""  
  const tmpDate = addHours(new Date(), 5)
  const convertDate = convertTZ(tmpDate, "Asia/Jakarta")
  if(String(data?.pickup_time)?.length === 0 || data?.pickup_time === null || data?.pickup_time === undefined){       
    date = formatRFC3339(convertDate)
  }else{
    date = data?.pickup_time
  }  
  console.log(data?.order_id)
  let obj = {}
  obj.order_activation = {
    order_id : data?.order_id,
    pickup_time : date  
  }
  const ob = {data:{
    order_activation:obj?.order_activation
  }} 
  console.log(ob)
  return await net("POST", `https://merchant-api-sandbox.shipper.id/v3/pickup`, ob)  
}

const cancelPickup = async data => {
  if(data === null) return []
  const ob = {
    pickup_Code : data?.pickup_code
  }
  return await net("PATCH", `https://merchant-api-sandbox.shipper.id/v3/pickup/cancel`, ob)
} 




module.exports = {
  getLocationCountryKeyword, 
  getLocationCountries, 
  getLocationProvinces,
  getLocationCities,
  getLocationSub,
  getDataKurirDomestik,
  getTipeService,
  getDataKurirDomestikTipe,
  getDataKurirInternasional,
  createOrder,
  getDetailOrder,
  cancelOrder,
  getTipePackage,
  createPickup,
  cancelPickup
}