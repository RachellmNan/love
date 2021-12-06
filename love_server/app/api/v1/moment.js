const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/moment'
})

router.post('/add', async (ctx)=>{
    const MomentModel = mongoose.model('Moment')
    await MomentModel.create({
        momentId: 16,
        content: "现在的你们找男女朋友会考虑什么？",
        picList: ["http://localhost:3000/61a5953c24baa61ed3a98a2c/moment6/0.jpeg"],
        pubDate: 1570197118915,
        uid: "61a5953c24baa61ed3a98a2c",
    })
    ctx.body = {
        msg: 'success'
    }
})

module.exports = router