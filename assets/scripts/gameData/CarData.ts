import StorageData,{StorageClass} from '../framework/StorageData'
import carConfig, {carconfigRow} from '../gameConfig/carConfig'
import ConfigHelper from '../gameConfig/ConfigHelper'

@StorageClass("CarData")
export default class CarData extends StorageData{
    mode:"run"|"park" = "park";  //模式
    //uid:number = 0;            //唯一ID
    ID:number  = 1;              //config 对应ID
    pit:number = 0;              //停放位置
    pos:cc.Vec2 = new cc.Vec2(0, 0); //

    public getConfigRow(){
        return <carconfigRow>ConfigHelper.search("ID", this.ID, carConfig);
    }
}