const requireDirectory = require('require-directory')
const Router = require('koa-router')
const fs = require('fs')

class InitManager{
    static init(app){
        this._initRouter(app)
    }
    static _initRouter(app){
        function visitor(router){
            if(router instanceof Router) {
                app.use(router.routes())
            }
        }
        requireDirectory(module, process.cwd()+'/app/api/v1', {visit:visitor})
    }
}

module.exports = InitManager