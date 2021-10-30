import { observable, action } from "mobx-miniprogram";
import TIM from 'tim-wx-sdk';
import { genTestUserSig } from "../utils/GenerateTestUserSig";
const TimModel = require('../models/tim')

const store = observable({
    sdkReady:false,
    messageList:[],

    login: action(async function(){
        this._listener()
        TimModel.getInstance().login()
    }),
    getMessageList: action( async function(){
        let res = await TimModel.getInstance().getMessageList()
        console.log(111,res)
        this.messageList = res.data.messageList
        console.log('getMessageList: ', res.data.messageList)
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
    _handleSdkReady(){
        this.sdkReady = true
        let d = new Date().valueOf()
        console.log('结束',d)
        console.log(33333)
    },
    _handleSdkNotReady(){
        console.log(2222)
        this.sdkReady = false
    },
    _handleMessageReceived(event){
        let message = event
        console.log('message: ',message)
        console.log('messageList: ',this.messageList)
        // this.messageList.push(event.data[0])
        this.messageList = this.messageList.concat(event.data[0])
        console.log('event', this.messageList)
    },
    _handleError(){

    },
    _handleKickedOut(){

    },
    _handleNetStateChange(){

    }

})

export default  store