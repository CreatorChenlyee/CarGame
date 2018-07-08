// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//import Core from "./framework/Core";
import EventCenter from "./framework/EventCenter"
import trackConfig, {trackconfigRow} from "./gameConfig/trackConfig"
import StorageCenter from './framework/StorageCenter'

const {ccclass, property} = cc._decorator;

@ccclass
export default class HomeUI extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Prefab)
    trackItem:cc.Prefab = null;
    @property(cc.ScrollView)
    trackView:cc.ScrollView = null;

    onLoad () {
        this.regiestEvent();
    }

    onDestroy(){
        this.unregiestEvent();
    }

    start () {
        this.updateTrackItemView();
    }

    regiestEvent(){

    }

    unregiestEvent(){

    }

    updateTrackItemView(){
        this.trackView.content.removeAllChildren();
        for(let item of trackConfig){
            let config:trackconfigRow = item;
            let trackItem = cc.instantiate(this.trackItem);
            trackItem.getComponent(cc.Button).node.on("click", event => {
                setTimeout(()=>{
                    EventCenter.emit("Game:onChangeTrack", config.trackid);
                }, 100);
            });
            cc.loader.loadRes(`textures/season/season_${config.trackid}_icon`, cc.SpriteFrame, (err, spriteFrame)=>{
                if(err){
                    return;
                }
                cc.find("Background", trackItem).getComponent(cc.Sprite).spriteFrame = spriteFrame;
            })
            
            cc.find("lock", trackItem).active = false;
            cc.find("full", trackItem).active = false;
            this.trackView.content.addChild(trackItem, config.trackid);
            this.updateTrackItemState(trackItem, config);
        }
    }

    updateTrackItemState(node:cc.Node, config:trackconfigRow){

    }

    onStoreClicked(){
        EventCenter.emit("RaceTrack:addCar");
    }

    onShareClicked(){
        StorageCenter.instance.clearLocalStorage("Storage_key");
    }

    onUserInfoClicked(){
        StorageCenter.instance.saveToLocalStorage("Storage_key");
    }
}
