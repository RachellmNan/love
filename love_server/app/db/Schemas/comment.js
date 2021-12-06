const mongoose = require('mongoose')
const CommentSchema = mongoose.Schema({
    momentId: Number,
    send_uid: String,
    receive_uid: String,
    content: String
})

mongoose.model('Comment', CommentSchema)