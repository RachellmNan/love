const { access, mkdirSync } = require('fs/promises')
let fs = require('fs')
const jwt = require('jsonwebtoken')
const Auth = require('../middlewares/auth')
const config = require('../config/config')

const onFile = function (name, file){
    if(!fs.existsSync(process.cwd() + '/static/images/tt')){
        fs.mkdirSync(process.cwd() + '/static/images/tt')
    }
    file.path = process.cwd() + '/static/images/tt/1.jpg'
}

const issueToken = (openid, scope = Auth.USER) => {
    const token = jwt.sign({
        openid,
        scope
    }, config.privateKey, {
        // 2 * 60 * 60
        expiresIn: 2 * 60 * 60
    })
    return token
}  

module.exports = {
    onFile,
    issueToken
}