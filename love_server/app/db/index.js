const mongoose = require('mongoose')
const fs = require('fs')

let files = fs.readdirSync(process.cwd() + '/app/db/Schemas')
for(let file of files){
    require('./Schemas/'+file)
}

function connectMongoose(){
    return new Promise((resolve,reject)=>{
        mongoose.connect('mongodb://localhost/love')
        mongoose.connection.once('open',()=>{
            console.log('连接数据库成功')
            resolve()
        })
    })
}

module.exports = {
    connectMongoose
}