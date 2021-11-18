const json = require("body/json")

module.exports = (req, res, next) => {
  json(req, res, (err, body)=>{    
    if(!err){
      req.body = body
      next()
    }else{
      next()
    }
  })
}