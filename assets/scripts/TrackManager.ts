// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import trackconfig, {trackconfigRow} from './gameConfig/trackconfig'
import EventCenter from "./framework/EventCenter"
import StorageCenter from "./framework/StorageCenter"
import PlayerData from './gameData/PlayerData'
import CarData from './gameData/CarData';
import { carconfigRow } from './gameConfig/CarConfig';

// export class trackconfigRow{
// 	trackid?:uid = 0	//赛道ID
// 	trackname?:string = ''	//赛道名字
// 	seasonid?:number = 0	//赛季ID
// 	drivingLimit?:number = 0	//行驶上限
// 	pitcount?:number = 0	//赛车位数量
// }

export default class TrackManager{
    private _trackconfig:trackconfigRow[] = trackconfig;

    private _currentTrackId:number = 1;
    private _currentSeasonId:number = 1;

    private static _instance = new TrackManager();
    public static get instance():TrackManager{
        return TrackManager._instance;
    }

    public set currentTrackId(trackId:number){
        this._currentTrackId = trackId;
    }

    public get currentTrackId():number{
        return this._currentTrackId;
    }

    public set currentSeasonId(seasonId:number){
        this._currentSeasonId = seasonId;
    }

    public get currentSeasonId():number{
        return this._currentSeasonId;
    }

    public getTrackConfigSingle(trackId:number):trackconfigRow{
        return this._trackconfig.where(a => a.trackid === trackId).single;
    }

    checkTrackUnlocked(trackId:number):boolean{
        let playerData:PlayerData = <PlayerData>(StorageCenter.instance.playerData);
        let config = this.getTrackConfigSingle(trackId);
        let unlockLv = config.unlockcarid;
        for(let carData of playerData.carList[trackId]){
            let config:carconfigRow = carData.getConfigRow();
            if(config.lv >= unlockLv){
                return true;
            }
        }
        if(trackId === 1){
            return true;
        }
        return false;
    }

    checkTrackFull(trackId:number):boolean{
        let playerData:PlayerData = <PlayerData>(StorageCenter.instance.playerData);
        let config = this.getTrackConfigSingle(trackId);
        let config_next = this.getTrackConfigSingle(trackId + 1);
        let sum_pitcount = 0;
        let sum_drivingLimit = 0;
        for(let carData of playerData.carList[trackId]){
            if(carData.ID >= config.unlockcarid 
                && ((config_next && carData.ID < config_next.unlockcarid)
                || !config_next)){
                if(carData.mode === "run"){
                    sum_drivingLimit++;
                }
                else{
                    sum_pitcount ++;
                }
            }
        }
        return (sum_pitcount+sum_drivingLimit >= config.pitcount) && (sum_drivingLimit >= config.drivingLimit);
    }

    updateTrackState(){
        EventCenter.emit("HomeUI:checkAllTrack");
    }

    updateAllTrackState(){
        EventCenter.emit("HomeUI:checkAllTrack");
    }
}
