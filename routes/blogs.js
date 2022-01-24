const router = require('koa-router')()
const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require("../controller/blog")
const {SuccessModel, ErrorModel} = require("../model/resModel")
const {format} = require('../utils/format')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

// 列表
router.post('/list', loginCheck, async (ctx, next) => {
  const {author, keyword} = ctx.request.body

  const listData = await getList(author, keyword)

  listData.forEach(item => {
    item.createdTime = format(2, '-', item.time_stamp)
    item.editeTime = format(2, '-', item.edit_time_stamp)
    delete item.time_stamp
    delete item.edit_time_stamp
  })

  ctx.body = new SuccessModel(listData)
})
// 详情
router.get('/detail', async (ctx, next) => {
  console.log(`${ctx.headers['user-agent']}`)
  const id = ctx.query.id
  if (!id) {
    ctx.body = new ErrorModel('Id is required！')
    return
  }
  const data = await getDetail(id)
  if (data.length) {
    let row = data[0]
    row.createdTime = format(2, '-', row.time_stamp)
    row.editeTime = format(2, '-', row.edit_time_stamp)
    delete row.time_stamp
    delete row.edit_time_stamp
    return ctx.body = new SuccessModel(row, 'success')
  }
  ctx.body = new SuccessModel(data, 'success')
})
// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  const id = ctx.request.id
  if (!id) {
    ctx.body = new ErrorModel('Id is required！')
    return
  }
  const author = ctx.session.username

  const data = await deleteBlog(id, author)

  if (!data) {
    ctx.body = new ErrorModel('操作失败')
    return
  }
  ctx.body = new SuccessModel('操作成功')
})
// 更新
router.post('/update', loginCheck, async (ctx, next) => {
  let {id, title, content} = ctx.request.body
  if (!id) {
    ctx.body = new ErrorModel('Id is required！')
    return
  }
  if (!content) {
    content = null
  }
  if (!title) {
    ctx.body = new ErrorModel('Title is required！')
    return
  }
  const blogData = {
    content,
    title,
    author: ctx.session.username
  }
  const data = await updateBlog(id, blogData)
  if (!data) {
    ctx.body = new ErrorModel('操作失败')
    return
  }
  ctx.body = new SuccessModel('操作成功')
})
// 新建
router.post('/new', loginCheck, async (ctx, next) => {
  const {title, content} = ctx.request.body
  if (!title) {
    res.json(new ErrorModel('Title is required!'))
  }
  const blogData = {
    title,
    content,
    author: ctx.session.username
  }
  const data = await newBlog(blogData)
  ctx.body = new SuccessModel(data, '操作成功')
})

module.exports = router
