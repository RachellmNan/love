const mongoose = require('mongoose')
const UserInfoSchema = mongoose.Schema({
    canPublish: Boolean,
    uid: String,
    backpictureList: Array,
    avater: String,
    nickName: String,
    birthYear: Number,
    constellation: String,
    height: Number,
    nowCity: String,
    // 学校等级
    // 无 专科 本科 硕士 博士
    academic: Number,
    // 学校名字
    college: String,
    description: String
})

mongoose.model('UserInfo', UserInfoSchema)