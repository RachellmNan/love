import { observable, action } from "mobx-miniprogram";
import TIM from 'tim-wx-sdk';
import { genTestUserSig } from "../utils/GenerateTestUserSig";
const TimModel = require('../models/tim')
const store = observable({
    sdkReady:false,
    messageList:[],
    nextReqMessageID: '',
    conversationList: [],
    isCompleted: true,
    login: action(async function(){
        this._listener()
        TimModel.getInstance().login()
    }),
    getMessageList: action( async function(option, down_refresh= false){
        if(option.conversationID == TimModel.getInstance().conversationID){
            console.log('option: ',option)
            console.log(2222)
            option.conversationID = 'C2C' + option.conversationID
            
            // 每次自己发消息，消息上屏
            let res 
            if(!down_refresh){
                console.log(3)
                res = await TimModel.getInstance().getMessageList(option)
                this.messageList = this.messageList.concat(res.data.messageList[res.data.messageList.length-1])
            }else{
                // 下拉加载历史消息
                console.log(4)
                option.nextReqMessageID = this.nextReqMessageID
                res = await TimModel.getInstance().getMessageList(option)
                for(let i of this.messageList){
                    res.data.messageList.push(i)
                }
                this.messageList = res.data.messageList
                console.log('nextReqMessageId: ', this.nextReqMessageID)
            }
            this.nextReqMessageID = res.data.nextReqMessageID
            this.isCompleted = res.data.isCompleted
            // console.log('messageList: ',res)
            // await this._setMessageRead()
            // await this.getConversationList()
        }else{
            console.log(1111)
            TimModel.getInstance().conversationID = option.conversationID
            // this.messageList = TimModel.getInstance().messageList
            // this.conversationID = option.conversationID
            // this.messageList = []
            this.isCompleted = true
            // TimModel.getInstance().conversationID = option.conversationID
            option.conversationID = 'C2C' + TimModel.getInstance().conversationID
            console.log('option: ',option)
            let res = await TimModel.getInstance().getMessageList(option)
            console.log('首次加载: ',res)
            this.messageList = res.data.messageList
            this.nextReqMessageID = res.data.nextReqMessageID
            this.isCompleted = res.data.isCompleted
            console.log('messageList: ',res)
            await this._setMessageRead()
            // this.conversationList = await this.getConversationList()
        }
    }),

    getConversationList: action(async function (){
        this.conversationList = await TimModel.getInstance().getConversationList()
        console.log('conversatilonList: ',this.conversationList[0])
    }),

    _listener(){
        let tim = TimModel.getInstance().getSdkInstance()
        console.log('tim: ',tim)
        tim.on(TIM.EVENT.SDK_NOT_READY, this._handleSdkNotReady,this)
        tim.on(TIM.EVENT.SDK_READY, this._handleSdkReady, this);
        tim.on(TIM.EVENT.MESSAGE_RECEIVED, this._handleMessageReceived, this)
        // tim.on(TIM.EVENT.ERROR, this._handleError, this)
        // tim.on(TIM.EVENT.NET_STATE_CHANGE, this._handleNetStateChange, this)
        // tim.on(TIM.EVENT.KICKED_OUT, this._handleKickedOut, this)
    },
    async _handleSdkReady(){
        this.sdkReady = true
        await this.getConversationList()
        console.log('conversationList: ', this.conversationList)
    },
    _handleSdkNotReady(){
        console.log(2222)
        this.sdkReady = false
    },
    async _handleMessageReceived(event){
        console.log(2)
        console.log('_handleMessageReceived: ',event)
        console.log('message: ',event.data, this.conversationID)
        if(TimModel.getInstance().conversationID){
            let messageList =  event.data.filter(item=>item.from == TimModel.getInstance().conversationID)
            console.log('messageList: ', messageList)
            // this.messageList.push(event.data[0])
            this.messageList = this.messageList.concat(messageList)
            await this._setMessageRead()
            return
        } 
        await this.getConversationList()
        console.log('event', this.messageList)
    },
    _handleError(){

    },
    _handleKickedOut(){

    },
    _handleNetStateChange(){

    },
    async _setMessageRead(){
        await TimModel.getInstance().getSdkInstance().setMessageRead({conversationID:'C2C'+TimModel.getInstance().conversationID})
    }

})

export default  store