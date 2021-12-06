const Router = require('koa-router')
const mongoose = require('mongoose')
const UserModel = mongoose.model('User')
const axios = require('axios')
const util = require('util')
const config = require('../../../config/config')
const { issueToken } = require('../../../core/util')
const Auth = require('../../../middlewares/auth')
const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', login, async (ctx, next)=>{
    let openid = ctx.openid
    await UserModel.create({
        openid
    })
    let token = issueToken(openid)
    ctx.body = {
        token
    }
})

async function login(ctx, next){
    let { code } = ctx.request.body
    let url = util.format(config.WX.authUrl, config.WX.appId, config.WX.appSecret, code)
    let res = await axios.get(url)
    let openid = res.data.openid
    ctx.openid = openid
    await next()
}

router.post('/test', (new Auth(Auth.USER)).verify, async (ctx)=>{
    ctx.body = {
        msg: 'this is test'
    }
}) 

router.post('/refresh', login, async (ctx)=>{
    let openid = ctx.openid
    let token = issueToken(openid)
    ctx.body = {
        token
    }
})

router.post('/add', async (ctx, next)=>{
    let {openid} = ctx.request.body
    console.log('openid: ', openid)
    await UserModel.create({
        openid
    })
    ctx.body = {
        msg: 'success'
    }
})

module.exports = router