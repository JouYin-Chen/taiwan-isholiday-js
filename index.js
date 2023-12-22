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

const transformedObject = (inputArray) => {
  return inputArray.reduce((result, item) => {
    const { date, ...rest } = item
    dateFormat = moment(date, "YYYY/M/D").format("YYYY/MM/DD")
    rest.isHoliday = rest.isHoliday == "是" ? true : false
    result[dateFormat] = rest
    return result
  }, {})
}

async function isHoliday(date) {
  let holidy = transformedObject(await importResource())
  // console.log(holidy, date)
  if (holidy[date] && holidy[date].isHoliday) {
    return true
  }
  return false
}

;(async () => {
  try {
    const args = process.argv.slice(2)[0]
    let specifyDate = args
      ? moment(args).format("YYYY/MM/DD")
      : moment(new Date()).tz("Asia/Taipei").format("YYYY/MM/DD")

    console.log(`${specifyDate} is Holidy?: `, await isHoliday(specifyDate))
  } catch (e) {
    console.log(e)
    // Deal with the fact the chain failed
  }
})()

//  data source: https://data.zhupiter.com/oddt/10581680/%E6%94%BF%E5%BA%9C%E8%A1%8C%E6%94%BF%E6%A9%9F%E9%97%9C%E8%BE%A6%E5%85%AC%E6%97%A5%E6%9B%86%E8%A1%A8/
