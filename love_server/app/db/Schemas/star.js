const mongoose = require('mongoose')
const StarSchema = mongoose.Schema({
    momentId: Number,
    uid: String
})

mongoose.model('Star', StarSchema)