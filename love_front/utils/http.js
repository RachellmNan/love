const config = require("../config/index")
const { _promisic } = require("./util")
const { Base64 } = require('js-base64')
const WxStorage = require("../models/storage")

class Http{
    static async request({url, data = {}, method = 'GET', refetch = true}){
        let res
        try {
            res = await _promisic(wx.request)({
                url: config.BaseUrl + url,
                header: {
                    Authorization: _encode()
                },
                data,
                method
            })
        } catch (error) {
            // 网络异常错误
            _showError('10000')
            console.log('error: ', error)
            throw error
        }
        if(res.statusCode.toString().startsWith('2')){
            return res.data
        }
        // 二次无感知刷新 token
        if(res.data.msg == "token过期"){
            if(refetch){
                return _refetch({
                    url,
                    data,
                    method,
                    refetch: false
                })
            }else{
                _showError(res.data.errorCode)
            }
        }else{
            // 前端错误提示
            for(let code in errorTip){
                if(res.data.errorCode == code){
                    _showError(code)
                } 
            }
        }
    } 
}

async function _refetch(param){
    let wxCode = await wx.login()
    let refreshRes = await Http.request({
        url: '/v1/user/refresh',
        method: 'POST',
        data:{
            code: wxCode.code
        }
    }) 
    WxStorage.setItem('token', refreshRes.token)
    return await Http.request(param)
}


const errorTip = {
    '00000': "网络异常",
    10000: "不符合规范",
    10001: "未找到相关内容",
    10002: "认证失败",
    10003: "禁止访问",
    99999: "出现未知错误"
}

function _showError(errCode){
    let tip = errorTip[errCode]
    wx.showToast({
        icon: "error",
        duration: 2000,
        title: tip ? tip : errorTip[errCode]
    })
    throw new Error(errorTip[errCode])
}

function _encode() {
    let token = WxStorage.getItem('token')
    let secret = Base64.encode(token + ':')
    return 'Basic ' + secret
}

module.exports = Http