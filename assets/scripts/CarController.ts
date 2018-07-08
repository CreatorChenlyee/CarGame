const {ccclass, property} = cc._decorator;
import RaceTrack from './RaceTrack'
import EventCenter from './framework/EventCenter';
import CarData from './gameData/CarData';
import PlayerData from './gameData/PlayerData';
import StorageCenter from './framework/StorageCenter';

const circle_r:number = 287;  //赛道半圆
const circle_l:number = 407;  //赛道直线长度
const circle_w:number = 50;   //赛道宽度
const offsetY:number  = 0;   //误差偏移

enum Area{CENTER = 0, UP, LEFT, BOTTOM, RIGHT};

@ccclass
export default class CarController extends cc.Component {
    @property(cc.TypeScript)
    raceTrack:RaceTrack = null;

    protected circlePoints:cc.Vec2[] = [            
        new cc.Vec2(-circle_r, circle_l/2), //lt
        new cc.Vec2(-circle_r, -circle_l/2), //lb
        new cc.Vec2(circle_r, -circle_l/2), //rb
        new cc.Vec2(circle_r, circle_l/2), //rt
    ];

    public    startPoint:cc.Vec2 = new cc.Vec2(-circle_r, 150);  //赛车放置的起点
    public    carData:CarData = null;                            //汽车数据

    protected scorePoint:cc.Vec2 = new cc.Vec2(circle_r, 33);    //赛车终点
    protected linearVelocity:number = 600;                  //赛车线速度
    protected angularVelocity:number = 0;                   //角速度
    protected runningTime:number = 0;                       //赛车当前半圆路径运动时间
    protected arrived:boolean = false;                      //当前圈赛车是否冲过终点
    protected isRunning:boolean = false;                    //是否在赛跑
    protected circleTime:number = 5;                        //赛车一圈消耗时间

    start () {
        
    };

    loadSkin(){
        this.node.active = false;
        let self = this;
        cc.loader.loadRes(`textures/car/car_${this.carData.ID}_2`, cc.SpriteFrame, (err, spriteFrame)=>{
            if (err) {
		        cc.error(err.message || err);
		        return;
            }
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            self.node.active = true;
        });
    }

    startAnim(){
        this.circleTime = this.carData.getConfigRow().circletime / 1000;
        this.linearVelocity = (Math.PI*2.0*circle_r + circle_l*2.0)/this.circleTime;
        let circle_time = Math.PI*circle_r / (Math.PI*circle_r + circle_l) * this.circleTime;
        this.angularVelocity = 360.0/circle_time;

        this.loadSkin();
        this.isRunning = true;
        this.node.position = this.startPoint;
    };

    stopAnim(){ 
        this.isRunning = false;
    };

    _startAnim(){
        this.node.position = this.startPoint;
        //left
        let left = cc.moveTo((this.startPoint.y-this.circlePoints[1].y)/this.linearVelocity, this.circlePoints[1]);

        //down
        let downbezier:cc.Vec2[] = [
            //new cc.Vec2(-285, -194),
            new cc.Vec2(-285, -580),
            new cc.Vec2(285, -580),
            new cc.Vec2(285, -194),
        ];
        let time = Math.PI*285/this.linearVelocity;
        let down = cc.bezierTo(time, downbezier);
        let rotatedown = cc.rotateTo(time, -180);
        let downspawn = cc.spawn(down, rotatedown);

        //right
        let rup = cc.moveTo((this.circlePoints[3].y-this.circlePoints[2].y)/this.linearVelocity, this.circlePoints[3]);
        let delaytime = cc.delayTime((this.scorePoint.y - this.circlePoints[2].y)/this.linearVelocity);
        let callfunc = cc.callFunc(()=>{
            //his.raceTrack.showScore(100);
        }, this);
        let seq = cc.sequence(delaytime, callfunc);
        let right = cc.spawn(rup, seq);

        //up
        let upbezier:cc.Vec2[] = [
            //new cc.Vec2(285, 194),
            //new cc.Vec2(0, 860),
            new cc.Vec2(285, 580),
            new cc.Vec2(-285, 580),
            new cc.Vec2(-285, 194),
        ];
        let up = cc.bezierTo(time, upbezier);
        let rotateup = cc.rotateTo(time, -360);
        let upspawn = cc.spawn(up, rotateup);

        //circle
        let circle = cc.moveTo((this.circlePoints[0].y-this.startPoint.y)/this.linearVelocity, this.startPoint);

        this.node.runAction(cc.repeatForever(cc.sequence(left, downspawn, right, upspawn, circle)));
    }

    _stopAnim(){
        this.node.stopAllActions();
    }

    destroyCar(){
        this.node.destroy();
    }

    checkArea(pos:cc.Vec2):Area{
        let leftRect = new cc.Rect(-circle_r - circle_w*1.5, -circle_l/2 - offsetY/2, circle_w*3, circle_l+offsetY);
        if(leftRect.contains(pos)){
            return Area.LEFT;
        }

        let rightRect = new cc.Rect(circle_r - circle_w*1.5, -circle_l/2-offsetY/2, circle_w*3, circle_l+offsetY);
        if(rightRect.contains(pos)){
            return Area.RIGHT;
        }

        let upRect = new cc.Rect(-circle_r-circle_w/2, circle_l/2, circle_r*2+circle_w, circle_r+circle_w/2);
        if(upRect.contains(pos)){
            return Area.UP;
        }

        let downRect = new cc.Rect(-circle_r-circle_w/2, -circle_l/2 - circle_r - circle_w/2, circle_r*2+circle_w, circle_r + circle_w/2);
        if(downRect.contains(pos)){
            return Area.BOTTOM;
        }

        return Area.CENTER;
    }

    update(dt){
        if(!this.isRunning){
            return;
        }

        let pos = this.node.getPosition();
        let area = this.checkArea(pos);
        switch(area){
            case Area.LEFT:{
                this.arrived = false;
                this.node.setPosition(new cc.Vec2(-circle_r, pos.y - dt * this.linearVelocity));
                this.node.rotation = 0;
                this.runningTime = 0;
            }break;

            case Area.BOTTOM:{
                this.runningTime += dt;
                let angle = this.angularVelocity * this.runningTime;
                let pos_ = new cc.Vec2(circle_r, 0).rotate((180 + angle)/180*Math.PI);
                let pos__ = cc.pAdd(pos_, new cc.Vec2(0, -circle_l/2));
                this.node.setPosition(pos__);
                this.node.rotation = -angle;
            }break;

            case Area.RIGHT:{
                this.node.rotation = -180;
                let offsetY = pos.y + dt * this.linearVelocity;
                this.node.setPosition(new cc.Vec2(circle_r, offsetY));
                if(this.arrived == false && offsetY >= 0){
                    this.arrived = true;
                    let dbConfig = this.carData.getConfigRow()
                    let gold:number = dbConfig.trackoutputgold;
                    let unit:string|null|undefined = dbConfig.trackoutputunit;
                    EventCenter.emit("RaceTrack:showScore", {gold:gold, unit:unit});
                }
                this.runningTime = 0;
            }break;

            case Area.UP:{
                this.runningTime += dt;
                let angle = this.angularVelocity * this.runningTime;
                let pos_ = new cc.Vec2(circle_r, 0).rotate(angle/180*Math.PI);
                let pos__ = cc.pAdd(pos_, new cc.Vec2(0, circle_l/2));
                this.node.setPosition(pos__);
                this.node.rotation = -180 - angle;
            }break;

            case Area.CENTER:
            break;
        }
    }
}
