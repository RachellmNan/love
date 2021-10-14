class WxStorage{
    static setItem(key , value){
        wx.setStorageSync(key, value)
    }

    static getItem(key){
        return wx.getStorageSync(key)
    }
}

module.exports = WxStorage