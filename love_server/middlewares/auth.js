const basicauth = require('basic-auth')
const { AuthFaild, ForbiddenAccess } = require('../core/exception')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

class Auth{
    static USER = 5
    static ADMIN = 8
    static SUPERADMIN = 16
    constructor(scope = Auth.user){
        this.scope = scope
    }   

    get verify(){
        return async (ctx, next)=>{
            let Authorization = ctx.header.authorization
            let AuthObj =  basicauth.parse(Authorization)
            let decode 
            let token = AuthObj.name
            if(!AuthObj || !AuthObj.name){
                throw new AuthFaild('header缺少字段')
            }
            try {
                decode = jwt.verify(token, config.privateKey)
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    throw new AuthFaild('token过期')
                }
                if(error.name == 'JsonWebTokenError'){
                    throw new AuthFaild('token不正确')
                }
            }
            if(decode.scope < this.scope){
                throw new ForbiddenAccess('权限不足')
            }
            ctx.user = {
                openid: decode.openid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = Auth