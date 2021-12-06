import { createStoreBindings } from "mobx-miniprogram-bindings";
import store from "../../store/timstore";
const TimModel = require('../../models/tim')
const { getHeight } = require("../../utils/util")
import TIM from 'tim-wx-sdk';

// const TimModel = require('../../models/tim')
Page({
    data:{
        inputValue:'',
        messageList: []
    },
    onInput(event){
        this.data.inputValue = event.detail.value
    },
    async send(event){
        let content = this.data.inputValue
        console.log('input: ', content,typeof content)  
        await TimModel.getInstance().sendMessage(content)
        await this.getMessageList({
            conversationID: 'user1',
        })
        this.setData({
            inputValue:''
        })
        console.log('messageList: ',this.data)
    },
    async choseImg(){
        let res = await wx.chooseImage({
            count:1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
        })
        let message = TimModel.getInstance().getSdkInstance().createImageMessage({
            to: 'user1',
            conversationType: TIM.TYPES.CONV_C2C,
            payload: { file: res },
            onProgress: function(event) { console.log('图片发送', event) }
          });
        await TimModel.getInstance().getSdkInstance().sendMessage(message);
        await this.getMessageList({
            conversationID: 'user1',
        })
        console.log('照片选择: ',res)
    },
    async onLoad(options){
        let scrollHeight = getHeight(100)
        let conversationID = options.conversationid
        console.log('conversationID: ',conversationID)
        await this._initMessageList(conversationID)
        let animation = wx.createAnimation({
            duration: 5000,
            timingFunction: 'ease'
        })
        animation.backgroundColor('#ff6700').step()
        this.setData({
            scrollHeight,
            animation: animation.export()
        })
        console.log('load: ',this.data.messageList)
    },
    async _initMessageList(conversationID){
        this.storeBindings = createStoreBindings(this, {
            store,
            fields: ['messageList','isCompleted'],
            actions: ["getMessageList","sendMessage"],
        })
        await this.getMessageList({
            conversationID,
        })
        this.storeBindings.updateStoreBindings()
        this.setData({
            conversationID
        })
    },
    onUnload() {
        this.storeBindings.destroyStoreBindings();
        TimModel.getInstance().conversationID = ''
    },
    async previewImg(event){
        let url = event.currentTarget.dataset.url
        console.log('event: ',url)
        await wx.previewImage({
            current: url,
            urls:[url]
        })
    },
    async scrolltoupper(){
        if(!this.data.isCompleted){
            await wx.showLoading({
                title: '数据拉取中',
            })
            console.log('此次刷新id： ',TimModel.getInstance().conversationID)
            await this.getMessageList({
                conversationID: TimModel.getInstance().conversationID
            },true)
            wx.hideLoading()
        }else{
            return
        }        
    }
})