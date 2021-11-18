const User = require("../model/mongo/user")
const App = require("../model/mongo/app")
const Logger = require("../model/mongo/logger")

const getReportTotalUser = async () => {
  const res = await User.find({}, "email")
  return {tipe:"User", total:res?.length, detail:res}
}

const getReportTotalApp = async email => {
  const res = await App.find({email})
  return {tipe:"Application", total:res?.length, detail:res}
}

const getReportAccessApi = async key => {
  const res = await Logger.find({key})
  return {tipe:"Access API", total:res?.length, detail:res}
}

module.exports = {
  getReportTotalUser,
  getReportTotalApp,
  getReportAccessApi
}