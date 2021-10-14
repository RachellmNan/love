const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    opneid: String,
    nickName: String,
    nowCity: String,
    constellation: String,
    birthYear: Number,
    height: Number,
    // 照片墙
    picList: Array,
    // 学校等级
    academic: Number,
    // 学校名字
    college: String,
    nowCityCityId: Number,
    nowCityProvinceId: Number,

})

mongoose.model('User', UserSchema)