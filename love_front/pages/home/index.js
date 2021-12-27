// pages/home/index.js
const Http = require('../../utils/http')

Page({
    data:{
        UserList:[]
    },
    async onLoad(){
        let res = await Http.request({
            url: '/v1/boardList',
            method: 'POST',
            data:{
                start: 0,
                size: 3
            }
        })
        this.setData({
            UserList: res.data
        })
        console.log('homeRes: ', res)
    },
    onPullDownRefresh(){
        console.log('下拉刷新～～～～')
        setTimeout(()=>{
            wx.stopPullDownRefresh()
        },1000)
    },
    onReachBottom(){
        console.log('触底刷新~~~')
    },
    async onScrolltoupper(){
        console.log('到顶了')
        await wx.startPullDownRefresh()
        wx.showLoading({
            title: '加载中'
        })
        setTimeout(()=>{
            wx.stopPullDownRefresh()
            wx.hideLoading()
        },1500)
    },
    onScrolltolower(){
        console.log('到底了')
    }
})