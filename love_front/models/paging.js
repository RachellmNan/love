class Paging{
    url
    start
    size
    accumulator = []
    hasMore = true
    isLock = false
    constructor({url, start, size}){
        this.url = url
        this.start = start
        this.size = size
    }
    async getData(){
        // 是否还有数据
        if(!this.hasMore){
            return
        }
        // 是否上锁，没上锁就上锁
        if(this.getLocker()){
            return 
        }
        // 获得数据
        // accumulator
        // hasMore
        // start
        // size
        //

        // 释放锁
        this.release()
    }

    release(){
        this.isLock = false
    }

    getLocker(){
        if(this.isLock){
            return true
        }
        this.isLock = true
        return false
    }
    
    
}

module.exports = Paging