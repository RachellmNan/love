const errCodes = {
    paramExceptionCode: 10000,
    NotFoundExceptionCode: 10001,
    AuthFaildException: 10002,
    ForbiddenException: 10003,
    HttpException: 99999
}

class HttpException extends Error{
    constructor(msg = '请求异常', errorCode = errCodes.HttpException){
        super()
        this.msg = msg
        this.errCode = errorCode
        this.status = 400
    }
}

class ParameterException extends HttpException{
    constructor(msg = '请求参数错误', errorCode = errCodes.paramExceptionCode){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = 400
    }
}

class NotFound extends HttpException{
    constructor(msg = '没有找到该资源', errorCode = errCodes.NotFoundExceptionCode){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = 404
    }
}

class AuthFaild extends HttpException{
    constructor(msg = '授权失败', errorCode = errCodes.AuthFaildException){
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.status = 401
    }
}

class ForbiddenAccess extends HttpException{
    constructor(msg = '禁止访问', errCode = errCodes.ForbiddenException){
        super()
        this.msg = msg
        this.errorCode = errCode
        this.status = 403
    }
}

module.exports = {
    HttpException,
    ParameterException,
    NotFound,
    AuthFaild,
    ForbiddenAccess,
    errCodes
}

