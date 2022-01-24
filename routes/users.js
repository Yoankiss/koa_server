const router = require('koa-router')()
const {userLogin} = require("../controller/user")
const {SuccessModel, ErrorModel} = require("../model/resModel")
const {format} = require('../utils/format')

router.prefix('/api/users')
// 登录
router.post('/login', async (ctx, next) => {
  const {username, password} = ctx.request.body
  if (!username) return ctx.body = new ErrorModel("Login name cannot be empty!")
  if (!password) return ctx.body = new ErrorModel("Login password cannot be empty!")

  const data = await userLogin(username, password)

  if (data.username) {
    // set session
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    ctx.session.userId = data.id

    let userCreateDate = format(2, '-', Number(data.time_stamp))
    data.userCreateDate = userCreateDate
    delete data.time_stamp

    console.log(`${username}登录成功！--- ${Date.now()}`)

    return ctx.body = new SuccessModel(data, 'Login succeeded!')
  }

  ctx.body = new ErrorModel("Login failed!")
})
// 登录检测
router.get('/login_test', async (ctx, next) => {
  ctx.body = ctx.session.username ? new SuccessModel("Logged in") : new ErrorModel("Not logged in!")
})

module.exports = router
