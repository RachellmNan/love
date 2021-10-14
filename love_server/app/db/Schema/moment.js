const mongoose = require('mongoose')
const MomentModel = mongoose.Schema({
    commentNum: Number,
    startNum: Number,
    content: String,
    picList: Array,
    pubDate: Number,
    uid: String
})

mongoose.model('Moment', MomentModel)