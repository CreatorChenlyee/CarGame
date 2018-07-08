import StorageData from './StorageData'

export default class StorageCreater{
    static _instance:StorageCreater = new StorageCreater();
    public static get instance(){
        return StorageCreater._instance;
    }

    private _ctorMap:{[classname:string]:()=>StorageData} = {};

    public put(classname:string, creator:()=>StorageData){
        if(!this._ctorMap[classname]){
            this._ctorMap[classname] = creator;
        }
        else{
            console.warn(`${classname} is repeat `);
        }
    }

    public create(classname:string, ...args):StorageData{
        if(this._ctorMap[classname]){
            let creator = this._ctorMap[classname];
            if(creator){
                return creator();
            }
            return null;
        }
        else{
            console.error(`${classname} is not exsit `);
            return null;
        }
    }
}