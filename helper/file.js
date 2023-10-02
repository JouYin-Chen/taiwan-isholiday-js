const fsPromises = require("fs").promises
const csv = require("csvtojson")

async function jsonArray(filePath) {
  return await csv().fromFile(filePath)
}

module.exports = {
  jsonArray,
}
