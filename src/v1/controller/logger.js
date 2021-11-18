const Logger = require("../model/mongo/logger")

const notesLoggerWebDevelopment = async (url, deskripsi, key) => {
  url = (url||"")
  deskripsi = (deskripsi||"")
  const createLogger = new Logger({
    url : `/v1/web/dev${url}`,
    deskripsi,
    platform : "Website",
    isProd : false,
    key
  })
  createLogger.save()
}

const notesLoggerMobileDevelopment = async (url, deskripsi, key) => {
  url = (url||"")
  deskripsi = (deskripsi||"")
  const createLogger = new Logger({
    url : `/v1/mobile/dev${url}`,
    deskripsi,
    platform : "Website",
    isProd : false,
    key
  })
  createLogger.save()
}

const notesLoggerWebProduction = async (url, deskripsi, key) => {
  url = (url||"")
  deskripsi = (deskripsi||"")
  const createLogger = new Logger({
    url : `/v1/web${url}`,
    deskripsi,
    platform : "Mobile",
    isProd : true,
    key
  })
  createLogger.save()
}

const notesLoggerMobileProduction = async (url, deskripsi, key) => {
  url = (url||"")
  deskripsi = (deskripsi||"")
  const createLogger = new Logger({
    url : `/v1/mobile${url}`,
    deskripsi,
    platform : "Mobile",
    isProd : true,
    key
  })
  createLogger.save()
}

module.exports = {
  notesLoggerWebDevelopment, 
  notesLoggerWebProduction, 
  notesLoggerMobileDevelopment, 
  notesLoggerMobileProduction
}