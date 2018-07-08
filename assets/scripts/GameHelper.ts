import PlayerData from './gameData/PlayerData'
import StorageCenter from './framework/StorageCenter'

export default class GameHelper{
    //static 
    static playerDataInstance():PlayerData{
        if(!StorageCenter.instance.playerData){
            let playerData = new PlayerData();
            StorageCenter.instance.playerData = playerData;
        }
        return <PlayerData>StorageCenter.instance.playerData;
    }

    public static convertBignumberToUnitString(bigNumber:BigNumber):string{
        return ;
    }

    public static convertUnitStringToBignumber(numberString:string):BigNumber{
        return ;
    }
}