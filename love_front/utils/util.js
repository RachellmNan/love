async function  _promisic(fn) {
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

module.exports = {
    _promisic
}
