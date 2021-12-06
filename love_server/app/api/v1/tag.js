const Router = require('koa-router')
const router = new Router({
    prefix:'/v1/tag'
})
const mongoose = require('mongoose')
const TagModel = mongoose.model('Tag')

router.post('/add', async (ctx)=>{
    await TagModel.create({
        character: [
			"文艺青年",
			"心地善良",
			"坚强执着",
			"幽默风趣"],
        entertainment: [
			"音乐",
			"旅行",
			"跑步",
			"爱做饭"],
        travel: [
			"桂林",
			"三亚",
			"南京",
			"⻄安"],
        food: [
			"麻辣小龙虾"],
        uid: '61adf9c06814c3ba1a0c8e27'
    })
    ctx.body = {
        msg: 'success'
    }
})

module.exports = router