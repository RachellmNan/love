// app.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
const config = require("./config/index");
import store from "./store/timstore";

App({
    async onLaunch() {
        let res = await wx.getSystemInfo()
        if(res.platform == 'ios' || res.platform == 'android'){
            console.log('这是移动端测试')
            config.BaseUrl = config.testBaseUrl
        }
        this.storeBindings = createStoreBindings(this, {
            store,
            actions: [ "login"],
        })
        this.login()
        console.log('登录成功')
        
    },
    globalData: {
        userInfo: null,
        tabBarId: 0
    }
})
