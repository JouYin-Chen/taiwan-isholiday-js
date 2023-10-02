const fileHelper = require("./helper/file.js")
const dataResource = "./data/resource.csv"
const path = require("path")
const moment = require("moment-timezone")

async function importResource() {
  let rawData = await fileHelper.jsonArray(
    path.resolve(__dirname, dataResource)
  )
  // console.log(rawData)
  return rawData
}
const convertToObj = (inputArray) => {
  const resultObject = {}

  inputArray.forEach((item) => {
    const { date, ...rest } = item
    resultObject[date] = rest
    if (resultObject[date].isHoliday == "是") {
      resultObject[date].isHoliday = true
    } else {
      resultObject[date].isHoliday = false
    }
  })

  return resultObject
}

async function isHoliday(specifyDate = null) {
  let holidy = convertToObj(await importResource())
  const date =
    specifyDate.length > 0
      ? moment(specifyDate[0]).format("YYYY/MM/DD")
      : moment(new Date()).tz("Asia/Taipei").format("YYYY/MM/DD")

  // console.log(specifyDate, date)
  if (holidy[date] && holidy[date].isHoliday) {
    return true
  }
  return false
}

;(async () => {
  try {
    const args = process.argv.slice(2)
    console.log("isHolidy: ", await isHoliday(args))
  } catch (e) {
    console.log(e)
    // Deal with the fact the chain failed
  }
})()

//  data source: https://data.zhupiter.com/oddt/10581680/%E6%94%BF%E5%BA%9C%E8%A1%8C%E6%94%BF%E6%A9%9F%E9%97%9C%E8%BE%A6%E5%85%AC%E6%97%A5%E6%9B%86%E8%A1%A8/
