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

import EventCenter from "./framework/EventCenter"

@ccclass
export default class TouchLayer extends cc.Component {

    @property(cc.Node)
    content:cc.Node = null;

    @property(cc.Node)
    _dragNode:cc.Node = null;

    @property({
        tooltip:"是否可以拖动"
    })
    dragable:boolean = true;

    start(){
        this.node.on(cc.Node.EventType.TOUCH_START, (event:cc.Event.EventTouch) =>{
            this._dragNode = null;

            let pos = event.touch.getLocation();
            let children = this.content.children;
            for(let i = 0; i < children.length; i++){
                let node = children[i];
                if(node.active){
                    let box:cc.Rect = node.getBoundingBoxToWorld();
                    if(cc.rectContainsPoint(box, pos)){
                        if(this.dragable){
                            this._dragNode = node;
                        }
                        EventCenter.emit("TouchLayer:touch_start", node);
                        break;
                    }
                }
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event:cc.Event.EventTouch)=>{
            if(this.dragable){
                if(this._dragNode){
                    let pos_in_node = this.content.convertTouchToNodeSpaceAR(event.touch);
                    this._dragNode.position = pos_in_node;
                    EventCenter.emit("TouchLayer:drag_move", this._dragNode);
                }
            }
            else{
                let pos = event.touch.getLocation();
                let children = this.content.children;
                for(let i = 0; i < children.length; i++){
                    let node = children[i];
                    if(node.active){
                        let box:cc.Rect = node.getBoundingBoxToWorld();
                        if(cc.rectContainsPoint(box, pos)){
                            EventCenter.emit("TouchLayer:move_over", node);
                            break;
                        }
                    }
                }
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_END, (event:cc.Event.EventTouch)=>{
            if(this.dragable && this._dragNode){
                EventCenter.emit("TouchLayer:drag_end", this._dragNode);
            }
            this._dragNode = null;
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, (event:cc.Event.EventTouch)=>{
            if(this.dragable && this._dragNode){
                EventCenter.emit("TouchLayer:drag_cancel", this._dragNode);
            }
            this._dragNode = null;
        }, this);
    }
}
