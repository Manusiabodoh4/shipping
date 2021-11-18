const Joi = require('joi')
const { validator } = require('../helper/response')

const middleLocationKeyword = (req, res, next) => {
  const schemaLocationKeyword = Joi.object().keys({
    keyword : Joi.string().min(3).required()
  })
  const {error, value} = schemaLocationKeyword.validate(req?.query)
  validator(req, res, next, error, value)
}
const middleLocationCountries = (req, res, next) => {
  const schemaLocationCountries = Joi.object().keys({
    id : Joi.number().required(),
    limit : Joi.number().optional(),
    page : Joi.number().optional()
  })
  const {error, value} = schemaLocationCountries.validate(req?.query)
  validator(req, res, next, error, value)
}

const middleLocationProvinces = (req, res, next) => {
  const schemaLocationProvinces = Joi.object().keys({
    idNegara : Joi.number().optional(),
    id : Joi.string().required(),
    limit : Joi.number().optional(),
    page : Joi.number().optional()
  })
  const {error, value} = schemaLocationProvinces.validate(req?.query)
  validator(req, res, next, error, value)
}

const middleLocationCities = (req, res, next) => {
  const schema = Joi.object().keys({
    idProvinsi : Joi.number().optional(),
    id : Joi.string().required(),
    limit : Joi.number().optional(),
    page : Joi.number().optional()
  })
  const {error, value} = schema.validate(req?.query)
  validator(req, res, next, error, value)
}

const middleLocationSub = (req, res, next) => {
  const schema = Joi.object().keys({
    idKota : Joi.number().optional(),
    id : Joi.string().required(),
    limit : Joi.number().optional(),
    page : Joi.number().optional()
  })
  const {error, value} = schema.validate(req?.query)
  validator(req, res, next, error, value)
}

const middleKurirDomestik = (req, res, next) => {
  const schema = Joi.object().keys({
    destination : Joi.object().keys({
      area_id : Joi.number().required(),
      lat : Joi.string().required(),
      lng : Joi.string().required(),
      suburb_id : Joi.number().required()
    }),
    origin : Joi.object().keys({
      area_id : Joi.number().required(),
      lat : Joi.string().required(),
      lng : Joi.string().required(),
      suburb_id : Joi.number().required()
    }),
    height : Joi.number().min(1).required(),
    weight : Joi.number().min(1).required(),
    width : Joi.number().min(1).required(),
    length : Joi.number().min(1).required(),
    amount : Joi.number().min(1).required(),  
    cod : Joi.boolean().required(),
    sort : Joi.array().optional(),
    page : Joi.number().optional(),
    limit : Joi.number().optional()    
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleKurirDomestikTipe = (req, res, next) => {
  const schema = Joi.object().keys({
    tipe : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.params)
  validator(req, res, next, error, value)
}

const middleKurirInternasional = (req, res, next) => {
  const schema = Joi.object().keys({
    destination : Joi.object().keys({
      country_id : Joi.number().required(),      
    }),
    origin : Joi.object().keys({
      country_id : Joi.number().required(),
      area_id : Joi.number().required(),      
    }),
    height : Joi.number().min(1).required(),
    weight : Joi.number().min(1).required(),
    width : Joi.number().min(1).required(),
    length : Joi.number().min(1).required(),
    amount : Joi.number().min(1).required(),  
    cod : Joi.boolean().required(),
    sort : Joi.array().optional(),
    page : Joi.number().optional(),
    limit : Joi.number().optional()    
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleOrderNew = (req, res, next) => {
  const schema = Joi.object().keys({
    pengirim : Joi.object().keys({
      name : Joi.string().required(),
      phone_number : Joi.string().min(8).custom((val, help)=>{
        const tmp = val[0]
        if(tmp === "0" || parseInt(tmp) === 0){
          return help.message("Format notelp tidak sesuai")
        }
        return val
      }).required(),
      pengiriman : Joi.object().keys({
        alamat : Joi.string().min(20).required(),
        area_id : Joi.number().required(),
        lat : Joi.string().required(),
        lng : Joi.string().required()
      })
    }),
    penerima : Joi.object().keys({
      name : Joi.string().required(),
      phone_number : Joi.string().min(8).custom((val, help)=>{
        const tmp = val[0]
        if(tmp === "0" || parseInt(tmp) === 0){
          return help.message("Format notelp tidak sesuai")
        }
        return val
      }).required(),
      pengiriman : Joi.object().keys({
        alamat : Joi.string().min(20).required(),
        area_id : Joi.number().required(),
        lat : Joi.string().required(),
        lng : Joi.string().required()
      })
    }),
    kurir : Joi.object().keys({
      cod : Joi.boolean().default(false),
      rate_id : Joi.number().required(),
      use_insurance : Joi.boolean().default(false)    
    }),
    tipe_kurir : Joi.string().default("domestic").optional(),
    tipe_pembayaran : Joi.string().default("postpay").optional(),
    external_id : Joi.string().optional(),
    paket : Joi.object().keys({
      height : Joi.number().min(1).required(),
      weight : Joi.number().min(1).required(),
      width : Joi.number().min(1).required(),
      length : Joi.number().min(1).required(),
      amount : Joi.number().min(1).required(), 
      tipe : Joi.number().required(),
      items : Joi.array().items(Joi.object().keys({
        name : Joi.string().required(),
        price :  Joi.number().positive().required(),
        qty : Joi.number().positive().required()
      }))
    })
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleOrderDetail = (req, res, next) => {
  const schema = Joi.object().keys({
    order_id : Joi.string().required()
  })
  console.log(req)
  const {error, value} = schema.validate(req?.params)
  validator(req, res, next, error, value)
}

const middleCancelOrder = (req, res, next) => {
  const schema = Joi.object().keys({
    order_id : Joi.string().required(),
    alasan : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleCreatePickup = (req, res, next) => {
  const schema = Joi.object().keys({
    order_id : Joi.array().required(),
    pickup_time :  Joi.date().optional()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleCancelPickup = (req, res, next) => {
  const schema = Joi.object().keys({
    pickup_code : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleKey = (req, res, next) => {
  const schema = Joi.string().required()
  const {error, value} = schema.validate(req?.headers?.key)
  validator(req, res, next, error, value)
}

const middleCreateAccount = (req, res, next) => {
  const schema = Joi.object().keys({
    email : Joi.string().email().required()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleCreateApplication = (req, res, next) => {
  const schema = Joi.object().keys({
    email : Joi.string().email().required(),
    aplikasi : Joi.string().required(),
    platform : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.body)
  validator(req, res, next, error, value)
}

const middleReportApp = (req, res, next) => {
  const schema = Joi.object().keys({
    email : Joi.string().email().required()
  })
  const {error, value} = schema.validate(req?.params)
  validator(req, res, next, error, value)
}

const middleReportAccess = (req, res, next) => {
  const schema = Joi.object().keys({
    key : Joi.string().required()
  })
  const {error, value} = schema.validate(req?.params)
  validator(req, res, next, error, value)
}

module.exports = {
  middleKey,
  middleCreateAccount,
  middleCreateApplication,
  middleLocationKeyword,
  middleLocationCountries,
  middleLocationProvinces,
  middleLocationCities,
  middleLocationSub,
  middleKurirDomestik,
  middleKurirDomestikTipe,
  middleKurirInternasional,
  middleOrderNew,
  middleOrderDetail,
  middleCancelOrder,
  middleCreatePickup,
  middleCancelPickup,
  middleReportApp,
  middleReportAccess
}