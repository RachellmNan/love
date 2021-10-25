// pages/square/index.js
Page({
    async onShow(){

    },
    scaleImg(event){
        let url = event.currentTarget.dataset.img
        wx.previewImage({
            current : url,
            urls: [url]
        })
    },
    goDiaryDetail(){
        wx.navigateTo({
            url:'/pages/detail/index'
        })
    }
})