import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import config from '../config/index';
import { genTestUserSig } from '../utils/GenerateTestUserSig';
class TimModel{
    static instance = null
    _SDKInstance
    conversationID
    messageList = []
    constructor(){
        this.init()
    }
    init(){
        let options = {
            SDKAppID: config.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
          };
          let tim = TIM.create(options); // SDK 实例通常用 tim 表示
          tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
          tim.registerPlugin({'tim-upload-plugin': TIMUploadPlugin});
          this._SDKInstance = tim
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new TimModel()
        }
        return this.instance
    }
    getSdkInstance(){
        return this._SDKInstance
    }
    login(){
        this._SDKInstance.login({
            userID: 'summer', 
            userSig: genTestUserSig('summer').userSig
        })
    }

    async getMessageList({conversationID,nextReqMessageID,count=15}){
        return this._SDKInstance.getMessageList({conversationID, nextReqMessageID, count})
    }
    async sendMessage(content,messageType = 'text'){
        messageType = messageType == 'text' ? 'text': 'file'
        let messageInstance = await this._SDKInstance.createTextMessage({
            to: 'user1',
            conversationType: 'C2C',
            payload:{
                [messageType]: content
            }
        })
        return this._SDKInstance.sendMessage(messageInstance)
    }
    logout(){
        this._SDKInstance.logout()
    }
    // reset(conversationID=''){
    //     this.conversationID = conversationID
    //     this.messageList = []
    //     return this
    // }
    async getConversationList(){
        let res = await this._SDKInstance.getConversationList()
        return res.data.conversationList;
    }
}

module.exports = TimModel