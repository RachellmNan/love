const WxStorage = require("../../models/storage")
const Http = require("../../utils/http")

// pages/my/index.js
Page({
    data:{
        isLogin: true 
    },
    async onLogin(){
        let res = await wx.login() 
        let code = res.code
        let loginRes =  await Http.request({
            url: '/v1/user/register',
            method: 'POST',
            data:{
                code
            }
        })
        let token = loginRes.token
        console.log('登录token: ', token)
        WxStorage.setItem('token', token)
    },
    async onTest(){
        let testRes = await Http.request({
            url: "/v1/user/test",
            method: "POST",
            data:{
                code: 1
            }
        })
        console.log('testRes: ', testRes)
    },
    async onRefresh(){
        console.log(333)
        let res = await wx.login() 
        let code = res.code
        let refreshRes = await Http.request({
            url: "/v1/user/refresh",
            method: "POST",
            data: {
                code
            }
        })
        let token = refreshRes.token
        console.log('刷新token: ', token)
        WxStorage.setItem('token', token)
    }
})