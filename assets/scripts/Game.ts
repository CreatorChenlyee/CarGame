// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

import EventCenter from './framework/EventCenter'
import StorageCenter from './framework/StorageCenter'
import PlayerData from './gameData/PlayerData';

@ccclass
export default class Game extends cc.Component {
    @property(cc.Prefab)
    homeUI:cc.Prefab = null;
    @property(cc.Prefab)
    raceTrack:cc.Prefab = null;

    @property(cc.Node)
    raceTrackNode:cc.Node = null;
    @property(cc.Sprite)
    rtNode:cc.Sprite = null;

    @property(cc.Node)
    _homeUI:cc.Node = null;
    @property(cc.Node)
    _raceTrack:cc.Node = null;
 

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.registerEvent();

        this._homeUI = cc.instantiate(this.homeUI);
        this._raceTrack = cc.instantiate(this.raceTrack);
        this.node.addChild(this._homeUI);
        this.raceTrackNode.addChild(this._raceTrack);
    }

    onDestroy(){
        this.unregisterEvent();
    }

    registerEvent(){
        EventCenter.on('Game:onChangeTrack', e =>{
            this.onChangeTrack(e.detail);
        }, "Game");
    }

    unregisterEvent(){
        EventCenter.reset('Game');
    }

    start () {
        StorageCenter.instance.loadFromLocalStorage("Storage_key");
        if(!StorageCenter.instance.playerData){
            StorageCenter.instance.playerData = new PlayerData();
        }
    }

    onChangeTrack(index){
        this.shot(); //截屏
        this.changeRacewayBackground(); //改变背景
        this.reloadRacewayWithTrack();  //重新加载汽车
        this.playChangeRacewayAnim(()=>{  //播放切换动画
            this.rtNode.node.active= false;
            console.log("Anims finished!");
        });
    }

    changeRacewayBackground(){
        // cc.loader.loadRes("textures/season/season_1_bg",cc.SpriteFrame,function(err,spriteFrame){
        //     cc.find("Canvas/bg").getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // })
    }

    reloadRacewayWithTrack(){

    }

    base64ToSpriteFrame(base64, callback) {
        var img = new Image();
        img.src = base64;
        img.onload = function () {
            var texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            texture.width = cc.winSize.width;
            texture.height = cc.winSize.height;
            var newframe = new cc.SpriteFrame(texture);
            if (callback) callback(newframe);
        }
    }

    shot(){
        if (CC_JSB) {
            this._homeUI.active = false;
            var renderTexture = cc.RenderTexture.create(cc.winSize.width, cc.winSize.height);
            renderTexture.begin();
            //this._raceTrack._sgNode.visit();
            cc.find('Canvas')._sgNode.visit();
            renderTexture.end();
            this.rtNode.spriteFrame = renderTexture.getSprite().getSpriteFrame();
            this._homeUI.active = true;
        }
        else if(cc.sys.isBrowser){
            cc.director.on(cc.Director.EVENT_AFTER_DRAW, () => {
                var canvas = document.getElementById("GameCanvas");
                var base64 = canvas.toDataURL("imagea/png");
                cc.director.off(cc.Director.EVENT_AFTER_DRAW);
                this.base64ToSpriteFrame(base64, (frame) => {
                    frame.setOriginalSize(cc.size(750,1334));
                    this.rtNode.spriteFrame = frame;
                });
            });
        }
    }

    playChangeRacewayAnim(callback:()=>void){
        this.rtNode.node.active = true;
        let animation = this.rtNode.node.getComponent(cc.Animation);
        animation.stop();
        animation.once("finished", e=>{
            callback();
        }, animation);
        animation.play("track_change", 0);
    }
}