
cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: false,
        menu: 'Dev/NodeExt'
    },
    
    ctor: function() {
        this._myvisible = true;
    },

    properties: {
        myvisible:{
            tooltip:'标签',
            get(){
                return this._myvisible
            },
            set(value){
                this._myvisible=value
            },
        },
        _myvisible:true,
    },

    onLoad(){
        this.node.active=this._myvisible
    }

});
