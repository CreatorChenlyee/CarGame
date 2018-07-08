import {XXTEA} from '../framework/xxtea';
import unitConfig, { unitconfigRow } from './unitConfig'
import unitconfig from './unitConfig';

export default class ConfigHelper{
    static decryptConfig(decryptKey:string, dataBase64:string):any[]{
        let config:any[] = [];
        let data = JSON.parse(XXTEA.decryptFromBase64(dataBase64, decryptKey));
        for(let record of data){
            let obj = {}
            for(let key in record){
                obj[key] = record[key];
            }
            config.push(obj);
        }
        return config;
    };

    static search(key:string|number, value:string|number, dataConfig:any[]):any{
        for(let data of dataConfig){
            if(data[key] && data[key] === value){
                return data;
            }
        }
        return null;
    }

    static searchList(key:string|number, value:string|number, dataConfig:any[]):any[]{
        let config:any[] = [];
        for(let data of dataConfig){
            if(data[key] && data[key] === value){
                config.push(data);
            }
        }
        return config;
    }

    static convertUnitBignumber(num:number, unit?:string):BigNumber{
        if(unit == null || unit == undefined || unit == ''){
            return new BigNumber(num);
        }

        let config:unitconfigRow = ConfigHelper.search('unit', unit, unitconfig);
        let bigNumber = new BigNumber("1" + "0".repeat((config.unitid-1)*3));
        console.log(bigNumber.toString());
        return bigNumber.multipliedBy(num);
    }
} 