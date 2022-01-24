// const env = process.env.NODE_ENV
let MYSQL_CONF = {
  host: 'rm-bp1505rz1nrdyf2v21o.mysql.rds.aliyuncs.com',
  user: 'blog_database',
  password: 'KY-9ndJnL4&HVcu',
  port: '3306',
  database: 'myblog'
}
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}
module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}
