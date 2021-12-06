const { HttpException } = require('../core/exception')
const config =  require('../config/config')

async function handleException(ctx, next){
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = config.enviroment === 'dev'
        // 开发环境，不是自定义异常
        if(isDev && ! isHttpException){
            throw error
        }
        // 线上环境
        if(isHttpException){
            ctx.body = {
                msg: error.msg,
                request: `${ctx.method} ${ctx.path}`,
                errorCode: error.errorCode 
            }
            ctx.status = error.status
        }else{
            ctx.body = {
                msg: '糟糕，出现了异常~~~',
                request: `${ctx.method} ${ctx.path}`,
                errorCode: 999
            }
            ctx.status = 500
        }
    }
}

module.exports = {
    handleException
}