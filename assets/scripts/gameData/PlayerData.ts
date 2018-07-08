import StorageData,{StorageClass} from '../framework/StorageData'
import CarData from './CarData'
import StorageCenter from '../framework/StorageCenter'
import TrackManager from '../TrackManager'
import ConfigHelper from '../gameConfig/ConfigHelper';

@StorageClass("PlayerData")
export default class PlayerData extends StorageData{
    public carList:{[trackId:number]:CarData[]} = {};  //汽车列表
    protected _coin:string = "0";          //拥有的金币
    protected _diamand:string = "0";       //拥有的钻石
    protected _carBuyList:{[dbID:number]:number} = {};     //汽车购买数量列表

    //增加汽车
    addCar(trackId:number, data:CarData){
        if(this.carList[trackId] === undefined){
            this.carList[trackId] = [];
        }
        this.carList[trackId].push(data);
    }

    //回收汽车
    deleteCar(trackId:number, data:CarData, parkIndex?:number){
        if(this.carList[trackId] === undefined){
            return console.warn("不存在赛道"+trackId+"的赛车");
        }
        if(data){
            this.carList[trackId].remove(data);
            return;
        }
        if(parkIndex){
            let data = this.carList[trackId].where(a => a.pit == parkIndex).single;
            this.carList[trackId].remove(data);
        }
    }

    //购买汽车，增加购买数量值
    buyCar(car_db_id:number){
        if(this._carBuyList[car_db_id] === undefined){
            this._carBuyList[car_db_id] = 0;
        }
        this._carBuyList[car_db_id] += 1;
    }

    //购买汽车数量
    getCarBuyCount(car_db_id:number){
        if(this._carBuyList[car_db_id] === undefined){
            this._carBuyList[car_db_id] = 0;
        }
        return this._carBuyList[car_db_id];
    }

    //增加金币
    plusCoinByUnit(coin: number, unit?: string) {
        var num = new BigNumber(this.coin)
        this._coin = num.plus(ConfigHelper.convertUnitBignumber(coin, unit)).toFixed();
    }

    //花费金币
    subCoinByUnit(coin: number, unit?: string) {
        var num = new BigNumber(this.coin)
        this._coin = num.plus(ConfigHelper.convertUnitBignumber(coin, unit).negated()).toFixed();
    }

    get coin():string{
        return this._coin;
    }

    checkCoinEnough(cnt):boolean{
        return new BigNumber(this.coin).isGreaterThanOrEqualTo(new BigNumber(cnt));
    }

    //增加钻石
    plusDiamandByUnit(diamand: number, unit?: string) {
        var num = new BigNumber(this._diamand)
        this._diamand = num.plus(ConfigHelper.convertUnitBignumber(diamand, unit)).toFixed();
    }

    //消费钻石
    subDiamandByUnit(diamand: number, unit?: string) {
        var num = new BigNumber(this._diamand)
        this._diamand = num.plus(ConfigHelper.convertUnitBignumber(diamand, unit).negated()).toFixed();
    }

    get diamand():string{
        return this._diamand;
    }

    checkDiamandEnough(cnt):boolean{
        return new BigNumber(this._diamand).isGreaterThanOrEqualTo(new BigNumber(cnt));
    }

    getCarData(parkIndex:number, trackId?:number){
        trackId = trackId || TrackManager.instance.currentTrackId;

        let carDataList = this.carList[trackId];
        if(!carDataList){
            console.warn("getCarData TrackId " + trackId);
            return null;
        }
        let carData = carDataList.where(a => a.pit == parkIndex).single;
        if(!carData){
            console.warn("getCarData parkIndex " + parkIndex);
            return null;
        }

        return carData;
    }

    setCarDataState(mode:"run"|"park", parkIndex:number, trackId?:number){
        trackId = trackId || TrackManager.instance.currentTrackId;
        let carDataList = this.carList[trackId];
        if(!carDataList){
            console.warn("setCarDataState TrackId " + trackId);
            return null;
        }
        let carData = carDataList.where(a => a.pit == parkIndex).single;
        if(!carData){
            console.warn("setCarDataState parkIndex " + parkIndex);
            return null;
        }
        carData.mode = mode;
    }
}