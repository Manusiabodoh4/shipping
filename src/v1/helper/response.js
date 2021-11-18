const send = require('@polka/send-type')

const sender = (res,status,message,data) => {
  status = (status||200)
  message = (message||"")
  data = (data||{})
  const ob = {
    code : status,
    message : message,
    data : data
  }  
  if(Array.isArray(data)){
    send(res, status, ob, {'Content-Type':"'application/json; charset=utf-8'"})  
  }else{
    send(res, status, ob)
  }  
}

const validator = (req, res, next, error, value) => {  
  if(error != null){
    const ob = {
      message : "",
      data : {}
    }    
    ob.message = "Something wrong with you request"
    ob.data = error?.details[0]?.message
    if(Array.isArray(value)){
      send(res, 400, ob, {'Content-Type':"'application/json; charset=utf-8'"})  
    }else{
      send(res, 400, ob)
    }      
    return
  }
  else{        
    req.validated = value
    next()
  }
}

module.exports = {sender, validator}