import StorageData from './StorageData'
import StorageCreater from './StorageCreator'
import {XXTEA} from './xxtea'

class StorageHelper{
    static s_encrptKey:string = "";

    static setItem(key:string, value:string, encrypt:boolean):void{
        if(encrypt){
            value = XXTEA.encryptToBase64(value, StorageHelper.s_encrptKey);
        }
        cc.sys.localStorage.setItem(key, value);
    }

    static getItem(key:string, encrypt:boolean):string{
        let value = cc.sys.localStorage.getItem(key);
        if(encrypt){
            value = XXTEA.decryptFromBase64(value, StorageHelper.s_encrptKey);
        }
        return value;
    }
}

export default class StorageCenter{
    protected static s_storageTimeKey = "Storage_Time_Key";

    protected static _instance = new StorageCenter();
    public static get instance(){
        return StorageCenter._instance;
    }

    //玩家数据
    public playerData:StorageData = null;

    //把数据存储到本地
    public saveToLocalStorage(storageKey:string):boolean{
        this.saveDataToJsonString(storageKey);
        StorageHelper.setItem(StorageCenter.s_storageTimeKey, "", false);
        return true;
    }

    //把数据从本地读取出来
    public loadFromLocalStorage(storageKey:string):boolean{
        this.loadDataFromJsonString(storageKey);
        StorageHelper.getItem(StorageCenter.s_storageTimeKey, false);
        return true;
    }

    public clearLocalStorage(storageKey:string):boolean{
        this.clearLocalJsonStringData(storageKey);
        return true;
    }

    //以Json格式读取数据
    protected loadDataFromJsonString(storageKey:string):boolean{
        let json = StorageHelper.getItem(storageKey, true);
        let property = JSON.parse(json);
        for(const propertyKey in property){
            const propertyValue = property[propertyKey];
            this[propertyKey] = this.loadProperty(propertyValue);
        }
        return true;
    }

    //以Json格式保存数据
    protected saveDataToJsonString(storageKey:string):boolean{
        let result:any = {};
        for(let propertyKey in this){
            let propertyValue = this[propertyKey];
            if(this.hasOwnProperty(propertyKey) && propertyValue instanceof StorageData){
                result[propertyKey] = this.saveProperty(propertyValue);
            }
        }
        const json = JSON.stringify(result);
        StorageHelper.setItem(storageKey, json, true);
        return true;
    }

    protected clearLocalJsonStringData(storageKey:string):boolean{
        const json = JSON.stringify({});
        StorageHelper.setItem(storageKey, json, true);
        return true;
    }

    //读取属性
    protected loadProperty(property:any):any{
        if(property instanceof Array){
            let result = []
            for(const propertyValue of property){
                result.push(this.loadProperty(propertyValue));
            }
            return result;
        }
        else if(property instanceof Object){
            if(property._class_){
                let obj = StorageCreater.instance.create(property._class_);
                for(let propertyKey in property){
                    if(propertyKey != "_class_"){
                        obj[propertyKey] = this.loadProperty(property[propertyKey]);
                    }
                }
                return obj;
            }
            else{
                let result:any = {}
                for(const propertyKey in property){
                    result[propertyKey] = this.loadProperty(property[propertyKey]);
                }
                return result;
            }
        }
        else{
            return property;
        }
    }

    //保存属性
    protected saveProperty(property:any):any{
        if(property instanceof StorageData){
            let result:any = {}
            result._class_ = property["_classname_"];
            for(const propertyKey in property){
                if(property.hasOwnProperty(propertyKey) && "_classname_" != propertyKey){
                    result[propertyKey] = this.saveProperty(property[propertyKey]);
                }
            }
            return result;
        }
        else if(property instanceof Array){
            let result = []
            for(const propertyValue of property){
                result.push(this.saveProperty(propertyValue));
            }
            return result;
        }
        else if(property instanceof Object){
            let result:any = {}
            for(const propertyKey in property){
                if(property.hasOwnProperty(propertyKey)){
                    result[propertyKey] = this.saveProperty(property[propertyKey]);
                }
            }
            return result;
        }
        else{
            return property;
        }
    }
}