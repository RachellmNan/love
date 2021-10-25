// custom-tab-bar/index.js
Page({

    data: {
        selected: '',
        color: "#cdcdcd",
        selectedColor: "#515151",
        list: [
            {
                pagePath: "/pages/home/index",
                text: "桃花牌",
                iconPath: "/assets/imgs/love@dis.png",
                selectedIconPath: "/assets/imgs/love.png"
            },
            {
                pagePath: "/pages/square/index",
                text: "广场",
                iconPath: "/assets/imgs/square@dis.png",
                selectedIconPath: "/assets/imgs/square.png"
            },
            {
                pagePath: "/pages/chat/index",
                text: "聊天",
                iconPath: "/assets/imgs/chat@dis.png",
                selectedIconPath: "/assets/imgs/chat.png"
            },
            {
                pagePath: "/pages/my/index",
                text: "我的",
                iconPath: "/assets/imgs/my@dis.png",
                selectedIconPath: "/assets/imgs/my.png"
            }
        ]
    },

    // methods: {
        switchTab(event){
            let url = event.currentTarget.dataset.path
            wx.switchTab({url})
        }
    // }
})
