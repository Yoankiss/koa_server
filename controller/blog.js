const {exec} = require("../db/mysql")
const xss = require('xss')

// 列表
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author="${author}" `
  }
  if (keyword) {
    sql += `and title like "%${keyword}%" `
  }
  sql += `order by time_stamp desc;`
  return await exec(sql)
}
// 详情
const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows
}
// 新建
const newBlog = async (blogData = {}) => {
  // 预防xss攻击
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createTime = Date.now()

  const sql = `insert into blogs (title, content, time_stamp, author, edit_time_stamp) values ('${title}', '${content}', ${createTime}, '${author}', '${createTime}');`
  const insertData = await exec(sql)
  return {id: insertData.insertId}
}
// 更新
const updateBlog = async (id, blogData = {}) => {
  const {title, content} = blogData
  const edit_time_stamp = new Date().getTime()
  const sql = `update blogs set title='${title}', content='${content}', edit_time_stamp='${edit_time_stamp}' where id=${id} and author='${blogData.author}'`
  const updateData = await exec(sql)
  return updateData.affectedRows > 0;
}
// 删除
const deleteBlog = async (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`
  const deleteData = await exec(sql)
  return deleteData.affectedRows > 0;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
