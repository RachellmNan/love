const Koa =require('koa')
const { connectMongoose } = require('./app/db/index')
const koaBody = require('koa-body')
const static = require('koa-static')
const config = require('./config/config')
const InitManager = require('./core/init')
const { onFile } = require('./core/util')
const { handleException } = require('./middlewares/handleExcepption')

connectMongoose().then(()=>{
    const app = new Koa()
    app.use(handleException)
    app.use(koaBody({
        multipart: true,
        formidable:{
            keepExtensions: true,
            onFileBegin: onFile
        },
    }))
    app.use(static(config.staticPath))
    InitManager.init(app)
    app.listen(config.port)
})
