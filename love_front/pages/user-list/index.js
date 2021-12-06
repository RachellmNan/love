import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/timstore";

Page({

    data: {
        ConversationList:[]
    },

    async onLoad(options) {
        this._init()
    },
    async _init(){
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['conversationList'],
            actions: [ "getConversationList"],
        })
        // let ConversationList = await this.getConversationList()
        // this.setData({
        //     ConversationList
        // })
        // console.log('ConversationList: ', ConversationList)
    },
    goConversation(event){
        let conversationid = event.currentTarget.dataset.conversationid
        
        console.log('conversationid: ',conversationid)
        wx.navigateTo({
            url: `/pages/conversation/index?conversationid=${conversationid}`
        })
    },
    async onShow(){
        await this.getConversationList()
    }
})