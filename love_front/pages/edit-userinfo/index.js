// pages/edit-userinfo/index.js
Page({
    data: {
        pickerArray : ['男','女'],
        pickerValue : '男'
    },
    pickchange(event){
        let pickerIndex = parseInt(event.detail.value)
        this.setData({
            pickerValue: this.data.pickerArray[pickerIndex]
        })
        console.log('event: ',this.data.pickerValue)
    },
    goSelectTag(){
        wx.navigateTo({
            url: "/pages/select-tag/index"
        })
    }
})