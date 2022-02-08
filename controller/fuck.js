const {exec} = require("../db/mysql")

const getRandomText = async () => {
  let sql = 'SELECT * FROM random_text ORDER BY rand() LIMIT 1;'
  return await exec(sql)
}

module.exports = {
  getRandomText
}
