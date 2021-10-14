const config = require("../config")
const { _promisic } = require("./util")
const { Base64 } = require('js-base64')
const WxStorage = require("../models/storage")

class Http{
    static async request({url, data = {}, method = 'GET'}){
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
            
        }
    } 
}

function _encode() {
    let secret = Base64.encode(WxStorage.getItem('token') + ':')
    return 'Basic ' + secret
}

module.exports = Http