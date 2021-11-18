const axios = require('axios')

const net = async (tipe, url, data ,key, isMultipart, isStream) => { 
  tipe = (tipe||"GET")
  url = (url||"")
  key = (key||"pHrZDvwwHMaKJSc6yxsX3aa7T2r0r2Xe2tiYUr0JOEIxMRicOXIoGVtkM55aZO7M")
  data = (data||{})
  isMultipart = (isMultipart||false)
  isStream = (isStream||false)    

  let objectResponse = {
    status : false,
    data : {}
  }

  try {
    const res = await axios({
      method:tipe,
      url,
      data,
      responseType : (isStream)?"stream":"json",
      headers : {
        'Content-Type' : (isMultipart)?"multipart/form-data":"application/json",
        'X-API-Key' : key,        
      }     
    })
    objectResponse.status = true
    objectResponse.data = res?.data
    return objectResponse
  } catch (error) {    
    objectResponse.status = false
    objectResponse.data = error
    return objectResponse
  }
}

module.exports={net}

