// const env = process.env.NODE_ENV
let MYSQL_CONF = {
  host: '',
  user: '',
  password: '',
  port: '3306',
  database: ''
}
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
