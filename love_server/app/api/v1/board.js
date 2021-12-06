const mongoose = require('mongoose')
const Router = require('koa-router')
const router = new Router({
    prefix: "/v1/boardList"
})

router.post('/', async (ctx, next)=>{

})

module.exports = router