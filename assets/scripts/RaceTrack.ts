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
import NodePoolManager from './framework/NodePoolManager'
import CarController from './CarController'
import EvenetCenter from './framework/EventCenter'
import CarData from './gameData/CarData'
import TrackManager from './TrackManager';
import StorageCenter from './framework/StorageCenter'
import PlayerData from './gameData/PlayerData';
import ConfigHelper from './gameConfig/ConfigHelper';
import GameHelper from './GameHelper'

const circle_r:number = 287;  //赛道半圆
const circle_l:number = 407;  //赛道直线长度
const circle_w:number = 50;   //赛道宽度
const offsetY:number  = 0;   //误差偏移

@ccclass
export default class RaceTrack extends cc.Component {

    @property(cc.Prefab)
    car: cc.Prefab = null;
    @property(cc.Prefab)
    carPark: cc.Prefab = null;
    @property(cc.Node)
    background:cc.Node = null;
    @property(cc.Prefab)
    score:cc.Prefab = null;
    @property(cc.Node)
    dragLayer:cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        EvenetCenter.on("RaceTrack:addCar", e => {
            let parkIndex = this.findEmptyParkSpace();
            if(parkIndex > 0){
                this.addCarPark(parkIndex, 1);
            }
        }, "RaceTrack");

        EvenetCenter.on("RaceTrack:removeCar", e => {
            
        }, "RaceTrack");

        EvenetCenter.on("RaceTrack:clearCar", e => {
            
        }, "RaceTrack");

        EvenetCenter.on("RaceTrack:addCarPark", e => {
            
        }, "RaceTrack");

        EvenetCenter.on("RaceTrack:removeCarPark", e => {
            
        }, "RaceTrack");

        EvenetCenter.on("RaceTrack:clearCarPark", e => {
            
        }, "RaceTrack");

        EvenetCenter.on("RaceTrack:showScore", e => {
            this.showScore(e.detail.gold, e.detail.unit);
        }, "RaceTrack");

        //drag action
        EvenetCenter.on("TouchLayer:touch_start", e=>{
            this.onDragStart(e.detail);
        }, "RaceTrack");

        EvenetCenter.on("TouchLayer:drag_move", e=>{
            this.onDragMove(e.detail);
        }, "RaceTrack");

        EvenetCenter.on("TouchLayer:drag_end", e=>{
            this.onDragEnd(e.detail);
        }, "RaceTrack");

        EvenetCenter.on("TouchLayer:drag_cancel", e=>{
            this.onDragCancel(e.detail);
        }, "RaceTrack");
    }

    onDestroy(){
        EvenetCenter.reset("RaceTrack");

        NodePoolManager.instance.clear("CarPark");
        NodePoolManager.instance.clear("Car");
        NodePoolManager.instance.clear("Score");
    }

    start () {
        this.initRaceTrack();
    }

    initRaceTrack(){
        let trackConfig = TrackManager.instance.getTrackConfigSingle(TrackManager.instance.currentTrackId);
        NodePoolManager.instance.clear("CarPark");
        NodePoolManager.instance.clear("Car");
        NodePoolManager.instance.clear("Score");

        NodePoolManager.instance.initNodePool("Car", this.car, trackConfig.drivingLimit);
        NodePoolManager.instance.initNodePool("CarPark", this.carPark, trackConfig.pitcount);
        NodePoolManager.instance.initNodePool("Score", this.score, trackConfig.drivingLimit);

        cc.find("total_income/Label", this.node).getComponent(cc.Label).string = "0";
        cc.find("sec_income/Label", this.node).getComponent(cc.Label).string = "0";
        cc.find("track_begin/Label", this.node).getComponent(cc.Label).string = "0/"+trackConfig.drivingLimit;

        const carDataList = GameHelper.playerDataInstance().carList[TrackManager.instance.currentTrackId];
        if(carDataList){
            for(const carData of carDataList){
                this.initCarPark(carData);
            }
        }
    }

    updateTrackRunningState(){
        let trackConfig = TrackManager.instance.getTrackConfigSingle(TrackManager.instance.currentTrackId);
        let carDataList = GameHelper.playerDataInstance().carList[TrackManager.instance.currentTrackId];
        let runningList = carDataList.where(a => a.mode == "run");
        let sum:BigNumber = new BigNumber(0);
        for(let carData of runningList){
            let dbCarData = carData.getConfigRow();
            sum = sum.plus(ConfigHelper.convertUnitBignumber(dbCarData.trackoutputgold/(dbCarData.circletime/1000), dbCarData.trackoutputunit));
        }
        cc.find("sec_income/Label", this.node).getComponent(cc.Label).string = sum.toFixed(0).toString();
        cc.find("track_begin/Label", this.node).getComponent(cc.Label).string = runningList.length+"/"+trackConfig.drivingLimit;
    }

    onChangeTrack(){
        this.initRaceTrack();
    }

    //向赛道添加
    addCar(parkIndex:number, carData:CarData, startPoint:cc.Vec2 = new cc.Vec2(-285,194)){
        let car = NodePoolManager.instance.create("Car", cc.find("carLayer", this.node))
        if(car){
            let carController:CarController = car.getComponent('CarController');
            carController.startPoint = startPoint;
            carController.raceTrack = this;
            carController.carData = carData;
            carController.startAnim();
            car.tag = parkIndex;
        }
        else{
            console.log("汽车超过上限");
        }
    }

    removeCar(parkIndex:number){
        let car = cc.find("carLayer", this.node).getChildByTag(parkIndex);
        if(car){
            let carController:CarController = car.getComponent('CarController');
            carController.stopAnim();
            NodePoolManager.instance.put("Car", car);
        }
        else{
            console.log("汽车已经回收");
        }
    }

    clearCar(){
        NodePoolManager.instance.clear("Car");
    }

    initCarPark(carData:CarData){
        const parkIndex = carData.pit;
        const car_dbId = carData.ID;
        let car_park = NodePoolManager.instance.create("CarPark", this.dragLayer, this.carPark);
        if(car_park){
            let path = `parkLayoutY/parkLayoutX${Math.floor((parkIndex-1)/3)+1}/park${parkIndex}`;
            let pos = cc.find(path, this.node).convertToWorldSpaceAR(new cc.Vec2(0, 0));
            car_park.position = this.dragLayer.convertToNodeSpaceAR(pos);
            car_park.tag = parkIndex;
            car_park.active = false;
            cc.loader.loadRes(`textures/car/car_${car_dbId}_1`, cc.SpriteFrame, (err, spriteframe) =>{
                car_park.active = true;
                cc.find("carShadow", car_park).getComponent(cc.Sprite).spriteFrame = spriteframe;
                cc.find("carIdle", car_park).getComponent(cc.Sprite).spriteFrame = spriteframe;
            })

            let carShadow = cc.find("carShadow", car_park);
            carShadow.on('click', e=>{
                this.removeCar(car_park.tag);
                this.changeCarParkState(car_park.tag, car_park, "park");
                this.updateTrackRunningState();
            }, carShadow);

            let box = cc.find("box", car_park);
            box.on('click', e=>{
                console.log("Open box");
            }, box);
        }
        else{
            console.log("汽车Park超过上限");
        }
        return car_park;
    }

    //向赛道添加停放车辆
    addCarPark(parkIndex:number, car_dbId:number, trackId?:number){
        let car_park = NodePoolManager.instance.create("CarPark", this.dragLayer, this.carPark);
        if(car_park){
            let path = `parkLayoutY/parkLayoutX${Math.floor((parkIndex-1)/3)+1}/park${parkIndex}`;
            let pos = cc.find(path, this.node).convertToWorldSpaceAR(new cc.Vec2(0, 0));
            car_park.position = this.dragLayer.convertToNodeSpaceAR(pos);
            car_park.tag = parkIndex;
            

            let carData:CarData = new CarData();
            carData.ID = car_dbId;
            carData.pit = parkIndex;

            trackId = trackId || TrackManager.instance.currentTrackId;
            GameHelper.playerDataInstance().addCar(trackId, carData);

            car_park.active = false;
            cc.loader.loadRes(`textures/car/car_${car_dbId}_1`, cc.SpriteFrame, (err, spriteframe) =>{
                car_park.active = true;
                cc.find("carShadow", car_park).getComponent(cc.Sprite).spriteFrame = spriteframe;
                cc.find("carIdle", car_park).getComponent(cc.Sprite).spriteFrame = spriteframe;
            })

            let carShadow = cc.find("carShadow", car_park);
            carShadow.on('click', e=>{
                this.removeCar(car_park.tag);
                this.changeCarParkState(car_park.tag, car_park, "park");
                this.updateTrackRunningState();
            }, carShadow);

            let box = cc.find("box", car_park);
            box.on('click', e=>{
                console.log("Open box");
            }, box);
        }
        else{
            console.log("汽车Park超过上限");
        }
        return car_park;
    }

    //删除停放车辆， 一般是合并车辆、赛道重新加载才会使用
    removeCarPark(parkIndex:number){
        let node = this.dragLayer.getChildByTag(parkIndex);

        let carShadow = cc.find("carShadow", node);
        carShadow.targetOff(carShadow);

        let box = cc.find("box", node);
        box.targetOff(box);

        GameHelper.playerDataInstance().deleteCar(TrackManager.instance.currentTrackId, null, parkIndex);

        NodePoolManager.instance.put("CarPark", node);
    }

    //赛道重新加载才会使用
    clearCarPark(){
        NodePoolManager.instance.clear("CarPark");
    }

    //显示获得金币
    showScore(score:number, unit:string|null|undefined){
        let scoreItem = NodePoolManager.instance.create("Score", cc.find("Canvas"))
        let label = cc.find("gold/Label", scoreItem).getComponent(cc.Label);
        label.string = "+" + score.toString()
        if(unit)
            label.string = "+" + score.toString() + unit;

        let animation = cc.find("gold", scoreItem).getComponent(cc.Animation);
        animation.stop();
        animation.once("finished", e=>{
            this.addTotalScore(score, unit);
            NodePoolManager.instance.put("Score", scoreItem);
        }, animation);
        animation.play("score", 0);

        let particleSystem = cc.find('scorelight', scoreItem).getComponent(cc.ParticleSystem);
        particleSystem.stopSystem();
        particleSystem.resetSystem();
    }

    addTotalScore(score:number, unit:string|null|undefined){
        GameHelper.playerDataInstance().plusCoinByUnit(score, unit);
        cc.find("total_income/Label", this.node).getComponent(cc.Label).string = GameHelper.playerDataInstance().coin;
        let totalNode = cc.find("total_income", this.node);
        totalNode.stopAllActions();
        totalNode.runAction(cc.sequence(
            cc.scaleTo(0.3, 1.2),
            cc.scaleTo(0.1, 1)
        ));
    }

    onDragStart(node:cc.Node){
        this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));

        let carData = GameHelper.playerDataInstance().getCarData(node.tag);

        let shadowNode = new cc.Node();
        shadowNode.name = "shadow";
        cc.loader.loadRes(`textures/car/car_${carData.ID}_1`, cc.SpriteFrame, (error, spriteframe)=>{
            shadowNode.addComponent(cc.Sprite).spriteFrame = spriteframe;
        });
        this.dragLayer.addChild(shadowNode);
        shadowNode.position = node.position;
        shadowNode.active = false;
        shadowNode.opacity = 180;
        shadowNode.scale = 0.42;
    }

    onDragMove(node:cc.Node){
        node.setLocalZOrder(100);

        let shadowNode = this.dragLayer.getChildByName('shadow');
        if(shadowNode){
            shadowNode.active = true;
        }
    }

    onDragEnd(node:cc.Node){
        if(node){
            node.setLocalZOrder(0);

            let playerData:PlayerData = GameHelper.playerDataInstance();

            //是否在赛道区域
            let pos = node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
            let pos_ = cc.find("carLayer", this.node).convertToNodeSpaceAR(pos);
            let rect = new cc.Rect(-circle_r-circle_w*1.5, -circle_l/2, circle_w*3, circle_l);
            if(rect.contains(pos_)){
                this.addCar(node.tag, playerData.getCarData(node.tag), pos_);
                this.changeCarParkState(node.tag, node, "run");
                this.backToCarParkSpace(node.tag, node, false, ()=>{
                    this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));
                });
                this.updateTrackRunningState();
                return;
            }

            //是否需要互换位置
            let carData = playerData.getCarData(node.tag);
            let trackConfig = TrackManager.instance.getTrackConfigSingle(TrackManager.instance.currentTrackId);
            for(let i = 1; i <= trackConfig.pitcount; i++){
                let child = this.dragLayer.getChildByTag(i);
                if(child){
                    let box:cc.Rect = child.getBoundingBox();
                    if(child != node && child.getBoundingBox().contains(node.position)){
                        let child_carData = playerData.getCarData(child.tag);
                        if(carData.ID === child_carData.ID && child_carData.mode === "park"){//合并
                            node.position = cc.pAdd(child.position,new cc.Vec2(-50, 0));
                            child.position = cc.pAdd(child.position,new cc.Vec2(50, 0));
                            child.runAction(
                                cc.spawn(
                                    cc.moveBy(0.2, new cc.Vec2(-50, 0)), 
                                    cc.fadeTo(0.2, 180)
                                )
                            )
                            node.runAction(cc.sequence(
                                cc.spawn(
                                    cc.moveBy(0.2, new cc.Vec2(50, 0)), 
                                    cc.fadeTo(0.2, 180)
                                ), 
                                cc.callFunc(()=>{
                                    node.opacity = 255;
                                    child.opacity = 255;
                                    this.removeCarPark(carData.pit);
                                    this.removeCarPark(child_carData.pit);
                                    let car_park = this.addCarPark(child_carData.pit, child_carData.ID+1);
                                    setTimeout(() => {
                                        let scaleTo = cc.scaleTo(0.1, 1.2);
                                        let scaleBack = cc.scaleTo(0.1, 1);
                                        car_park.runAction(cc.sequence(scaleTo, scaleBack));        
                                    }, 100);
                                }))
                            )
                            this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));
                            return;
                        }
                        else if(child_carData.mode === "park"){//互换位置
                            this.removeCarPark(carData.pit);
                            this.removeCarPark(child_carData.pit);
                            this.addCarPark(child_carData.pit, carData.ID);
                            this.addCarPark(carData.pit, child_carData.ID);
                            this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));
                            return;
                        }
                    }
                }
                else{
                    let path = `parkLayoutY/parkLayoutX${Math.floor((i-1)/3)+1}/park${i}`
                    let node_ = cc.find(path, this.node);
                    if(node_){
                        let box:cc.Rect = cc.find(path, this.node).getBoundingBoxToWorld();
                        let pos = node.convertToWorldSpaceAR(new cc.Vec2(0, 0))
                        if(box.contains(pos)){
                            this.removeCarPark(carData.pit);
                            let car_park = this.addCarPark(i, carData.ID);
                            if(car_park){
                                setTimeout(() => {
                                    let scaleTo = cc.scaleTo(0.1, 1.2);
                                    let scaleBack = cc.scaleTo(0.1, 1);
                                    car_park.runAction(cc.sequence(scaleTo, scaleBack));        
                                }, 100);
                            }
                            this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));
                            return;
                        }
                    }
                }
            }

            //回弹到原来位置
            this.backToCarParkSpace(node.tag, node, true, ()=>{
                this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));
            });
        }
    }

    onDragCancel(node:cc.Node){
        node.setLocalZOrder(0);

        //回弹到原来位置
        this.backToCarParkSpace(node.tag, node, true, ()=>{
            this.dragLayer.removeChild(this.dragLayer.getChildByName('shadow'));
        });
    }

    //回到原来的地方
    backToCarParkSpace(parkIndex:number, node:cc.Node, smooth:boolean = true, callback?:()=>void){
        let path = `parkLayoutY/parkLayoutX${Math.floor((parkIndex-1)/3)+1}/park${parkIndex}`
        let pos = cc.find(path, this.node).convertToWorldSpaceAR(new cc.Vec2(0, 0));
        let pos_ = this.dragLayer.convertToNodeSpaceAR(pos);
        if(smooth){
            let distance = cc.pDistance(node.position, pos_);
            let moveTo = cc.moveTo(distance/1000, pos_);
            let scaleTo = cc.scaleTo(0.1, 1.2);
            let scaleBack = cc.scaleTo(0.1, 1);
            let callFunc = cc.callFunc(()=>{
                if(callback) callback();
            });
            node.runAction(cc.sequence(moveTo, callFunc, scaleTo, scaleBack));
        }
        else{
            node.position = pos_;
            if(callback){
                callback();
            }
        }
    }

    //更改汽车的状态
    changeCarParkState(parkIndex:number, node:cc.Node, mode:"run"|"park"){ 
        let carData:CarData = GameHelper.playerDataInstance().getCarData(parkIndex, TrackManager.instance.currentTrackId);
        carData.mode = mode;
        cc.find("carShadow", node).active = (mode == "run");
        cc.find("resetBtn", node).active = (mode == "run");
        cc.find("carIdle", node).active = (mode == "park");
    }

    //找到空闲的停车位
    findEmptyParkSpace(trackId?:number):number{
        trackId = trackId || TrackManager.instance.currentTrackId;
        let trackConfig = TrackManager.instance.getTrackConfigSingle(trackId);
        let carDataList = GameHelper.playerDataInstance().carList[trackId];
        if(carDataList){
            for(let i = 1; i <= trackConfig.pitcount; i++){
                let carData:CarData = carDataList.where(a => a.pit == i).single;
                if(!carData){
                    return i;
                }
            }
        }
        else{
            return 1;
        }
        return -1;
    }

    _test(){
        this.addCarPark(1, 13, 1);
        this.addCarPark(2, 13, 1);
        this.addCarPark(3, 13, 1);
        this.addCarPark(4, 13, 1);
        this.addCarPark(5, 13, 1);
        this.addCarPark(6, 13, 1);
        this.addCarPark(7, 13, 1);
    }

    // update (dt) {}
}
