const mongoose = require('mongoose')
const MomentSchema = mongoose.Schema({
    momentId: Number,
    content: String,
    picList: Array,
    pubDate: Number,
    uid: String,
})

mongoose.model('Moment', MomentSchema)