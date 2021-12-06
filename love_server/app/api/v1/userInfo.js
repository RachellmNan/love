const mongoose = require('mongoose')
const UserInfo = mongoose.model('UserInfo')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/userinfo'
})

router.post('/add', async (ctx, next)=>{
    await UserInfo.create({
        canPublish: true,
        uid: '61adf9c06814c3ba1a0c8e27',
        backpictureList: ['http://localhost:3000/61adf9c06814c3ba1a0c8e27/bpList/0.jpeg',
            'http://localhost:3000/61adf9c06814c3ba1a0c8e27/bpList/1.jpeg',
            'http://localhost:3000/61adf9c06814c3ba1a0c8e27/bpList/2.jpeg'],
        avater: 'http://localhost:3000/61adf9c06814c3ba1a0c8e27/bpList/0.jpeg',
        nickName: "紫硕",
        birthYear: 1992,
        constellation: '魔羯座',
        height: 172,
        nowCity: '石家庄市',
        // 学校等级
        academic: 1,
        // 学校名字
        college: '桂林理工大学',
        description: "我来自河北石家庄，硕士毕业从事芯片行业的工作。业余时间喜欢跑步，爬山。因为工作圈子小，平时较忙，希望在这里能遇见一个善良可爱的妹纸，一起面朝大海，春暖花开！茫茫人海，遇见就是缘分，希望性格合适，价值观一致！\n"    })
    ctx.body = {
        msg: 'success'
    }
})

router.get('/')

module.exports = router