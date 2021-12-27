// 加了 async 会报错
function  _promisic(fn) {
    return function (params) {
        return new Promise((resolve, reject)=>{
            Object.assign(params, {
                success: res=>{
                    resolve(res)
                },
                fail: err=>{
                    reject(err)
                }
            })
            fn(params)
        })
    }
}

function getHeight(h){
    let res =  wx.getSystemInfoSync()
    let windowH = res.windowHeight
    let devicePixelRatio = res.devicePixelRatio
    return devicePixelRatio * windowH - h
}

module.exports = {
    _promisic,
    getHeight
}
