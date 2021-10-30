import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import config from '../config/index';
import { genTestUserSig } from '../utils/GenerateTestUserSig';

class TimModel{
    static instance = null
    _SDKInstance
    constructor(){
        this.init()
    }
    init(){
        let options = {
            SDKAppID: config.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
          };
          // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
          let tim = TIM.create(options); // SDK 实例通常用 tim 表示
          
          // 设置 SDK 日志输出级别，详细分级请参见 <a href="https://web.sdk.qcloud.com/im/doc/zh-cn//SDK.html#setLogLevel">setLogLevel 接口的说明</a>
          tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
          // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
          
          // 注册腾讯云即时通信 IM 上传插件
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
    sendMessage(){
        // this._SDKInstance.createTextMessage({})
    }

    async getMessageList(){
        return this._SDKInstance.getMessageList({conversationID: 'C2Cuser1', count: 15})
    }
    logout(){
        this._SDKInstance.logout()
    }
}

module.exports = TimModel