import StorageCreater from './StorageCreator'

export default class Core{

}

export function StorageClass(classname:string):any{
    return function(ctor){
        let saveclass = function(...args){
            ctor.call(this, args);
            this._classname_ = classname;
        }
        saveclass.prototype = ctor.prototype;
        StorageCreater.instance.put(classname, function(){
            return new saveclass();
        });
        return saveclass;
    };
}