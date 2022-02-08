const router = require('koa-router')()
const {getRandomText} = require('../controller/fuck')
const {SuccessModel, ErrorModel} = require("../model/resModel")

router.prefix('/api/random')

router.get('/text', async (ctx, next) => {
  const data = await getRandomText()
  ctx.body = new SuccessModel(data[0], "success")
})
module.exports = router
