// app.js
import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "./store/timstore";

App({
    onLaunch() {
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
