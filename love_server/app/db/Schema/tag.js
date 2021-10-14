const mongoose = require('mongoose')
const TagSchema = mongoose.Schema({
    character: Array,
    entertainment: Array,
    travel: Array,
    food: Array
})
mongoose.model('Tag', TagSchema)