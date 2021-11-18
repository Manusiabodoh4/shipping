const { checkValidatedKey } = require("../controller/auth")
const { sender } = require("../helper/response")

module.exports = async (req, res, next) => {
  
  const key = req?.validated  

  const resCheck = await checkValidatedKey(key)  

  if(resCheck?.status){
    req.key = key
    next()
  }else{
    sender(res, 400, resCheck?.data, {})
  }  
    
}