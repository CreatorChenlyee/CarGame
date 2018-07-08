// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html



export class EventCenter {  
    protected static _instance:EventCenter = new EventCenter();
    public static get instance(){
        return EventCenter._instance;
    }

    protected _eventMap = [];
    protected _eventGroup = [];

    on(eventName: string, callbackFunc: (event: cc.Event.EventCustom) => void, groupName?: string):void{
        if(this._eventMap[eventName] === undefined){
            this._eventMap[eventName] = [];
        }
        this._eventMap[eventName].push({callback:callbackFunc}); 

        if(groupName){
            if(this._eventGroup[groupName] === undefined){
                this._eventGroup[groupName] = [];
            }
            this._eventGroup[groupName].push({event:eventName, callback:callbackFunc}); 
        }
    }

    off(eventName:string, callbackFunc: (event: cc.Event.EventCustom) => void):void{
        var array = this._eventMap[eventName];
        if (array === undefined) return;

        for (var i = 0; i < array.length; i++) {
            var element = array[i];
            if (element && element.callback === callbackFunc) {
                array[i] = undefined;
                break;
            }
        }
    }

    reset(groupName:string):void{
        if(this._eventGroup[groupName]){
            for(let obj in this._eventGroup[groupName]){
                this.off(this._eventGroup[groupName].event, this._eventGroup[groupName].callback);
            }
        }
        this._eventGroup[groupName] = undefined;
    }

    emit(eventName:string, detail?: any):void{
        if(this._eventMap[eventName]){
            let event = new cc.Event.EventCustom("eventName", false);
            event.detail = detail;
            for(let eventObj of this._eventMap[eventName]){
                eventObj.callback(event);
            }
        }
    }

    clear(){
        this._eventMap = [];
        this._eventGroup = [];
    }
}

export default EventCenter.instance
