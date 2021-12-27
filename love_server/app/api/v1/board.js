const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router({
    prefix: "/v1/boardList"
})

router.post('/', async (ctx, next)=>{
    let { start, size } = ctx.request.body
    let UserInfoModel = mongoose.model('UserInfo')
    let res = await UserInfoModel.find().skip(start).limit(size)
    let total = (await UserInfoModel.find()).length
    let totalPage = total % size == 0 ? total/size - 1 : total / size 
    let currentPage = start / size
    ctx.body = {
        data: res,
        totalPage,
        currentPage
    }
})

module.exports = router