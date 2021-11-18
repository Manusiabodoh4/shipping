const User = require("../model/mongo/user")
const App = require("../model/mongo/app")
const { enc, des } = require("../helper/key")

const createAccount = async (email) => {
  email = (email||"")
  const resFind = await User.findOne({email})
  if(resFind?.email === email) return {status:false, data:`Data dengan email ${email} telah terdaftar`}
  const saveuser = new User({
    email
  }) 
  const res = await saveuser.save()  
  if(res?.email !== email) return {status:false, data:"Terjadi kesalahan ketika membuat akun"}
  return {status:true, data:"Berhasil membuat akun"}
}

const createApplication = async (email, aplikasi, platform) => {
  email = (email||"")
  aplikasi = (aplikasi||"")
  platform = (platform||"")

  const resFind = await User.findOne({email})
  if(resFind?.email !== email) return {status:false, data:`Data dengan email ${email} tidaks terdaftar`}

  const resEnc = enc(email)    
  
  const ob = {
    email,
    aplikasi,
    platform,
    key:resEnc?.encryptedData,
    iv:resEnc?.iv
  }

  const saveApplication = new App(ob)
  const res = await saveApplication.save()    
  
  if(res?.email === email) return {status:true, data:resEnc?.encryptedData}
  
  return {status:false, data:""}
}

const checkValidatedKey = async (key) => {

  key = (key || "")

  let resDes = ""

  const resFindAppKey = await App.findOne({key})
  if(resFindAppKey === null || resFindAppKey === undefined) return {status:false, data:"Key tidak ditemukan"}

  try {
    resDes = des({encryptedData:resFindAppKey?.key, iv:resFindAppKey?.iv})    
  } catch (error) {    
    return {status:false, data:"Key tidak valid"}
  }
  

  const resFind = await User.findOne({email:resDes})  

  if(resFind === null || resFind === undefined) return {status:false, data:"Key tidak valid"}

  const resFindApp = await App.findOne({email:resDes, key})
  
  if(resFindApp === null || resFindApp === undefined) return {status:false, data:`Aplikasi dengan key ${key} tidak ditemukan`}

  return {status:true, data:"Key Valid"}
  
}

module.exports = {
  createAccount,
  createApplication,
  checkValidatedKey
}