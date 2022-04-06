const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
var cors = require('koa2-cors')

const {REDIS_CONF} = require('./conf/db')

const users = require('./routes/users')
const blogs = require('./routes/blogs')
const fucks = require('./routes/fuck')

// error handler
onerror(app)

// CORS
app.use(cors())

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// session
app.keys = ['Yuankissing715#']
app.use(session({
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 30 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(users.routes(), users.allowedMethods())
app.use(blogs.routes(), blogs.allowedMethods())
app.use(fucks.routes(), fucks.allowedMethods())

// error-handlings
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
