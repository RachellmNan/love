const mongose = require('mongoose')
const UserSchema = mongose.Schema({
    openid: String
})

mongose.model('User', UserSchema)