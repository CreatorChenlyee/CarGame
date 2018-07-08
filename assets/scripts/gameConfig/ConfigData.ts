export type uid = number;

export default class ConfigData{
    protected _config:any[] = [];

    getDefaultConfig():any[]{
        return this._config;
    }
}