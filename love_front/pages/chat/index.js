import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/timstore";
const TimModel = require('../../models/tim')
Page({
    async onLoad(){
        let d = new Date().valueOf()
        console.log('开始',d)
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['messageList'],
            actions: ["login", "getMessageList"],
        })
        // new TimModel()
        this.login()
        setTimeout(()=>{
            this.getMessageList()
            this.storeBindings.updateStoreBindings()
            console.log('messageList: ', this.data.messageList)
        },1000)
        // console.log('ccc: ', c instanceof Promise)
        

    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
    },

})