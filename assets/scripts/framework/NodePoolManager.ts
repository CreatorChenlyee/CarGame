// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export default class NodePoolManager {  
    protected static _instance = new NodePoolManager();
    public    static get instance(){
        return NodePoolManager._instance;
    }

    protected _poolMap:{[name:string]:cc.NodePool} = {};

    initNodePool(name:string, prefab:cc.Prefab, capacity:number):void{
        for(let i = 0; i < capacity; i++){
            let node = cc.instantiate(prefab);
            this.put(name, node);
        }
    }

    create(name:string, parentNode:cc.Node, prefab?:cc.Prefab):cc.Node{
        let node = this.get(name);
        if((node == null || node === undefined) && (prefab && prefab instanceof cc.Prefab)){
            node = cc.instantiate(prefab); 
        }
        if(node){
            node.parent = parentNode;
        }
        return node;
    }

    put(name:string, node:cc.Node):void{
        if(this._poolMap[name] === undefined){
            this._poolMap[name] = new cc.NodePool(name);
        }
        this._poolMap[name].put(node);
    }

    get(name:string, ...params:any[]):cc.Node{
        if(this._poolMap[name]){
            return this._poolMap[name].get(params);
        }
        return null;
    }

    clear(name:string):void{
        if(this._poolMap[name]){
            this._poolMap[name].clear();
        }
    }

    clearAll(){
        for(let name in this._poolMap){
            this.clear(name);
        }
    }
}
