const {ccclass, property} = cc._decorator;

@ccclass
export default class DMenu extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    //start () {}
    @property(cc.Label)
    nikeName:cc.Label = null;

    @property(cc.Label)
    userId:cc.Label = null;

    @property(cc.Node)
    head:cc.Node = null;

    onLoad(){
       let profileImg =  "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzMgiarjjWdq22PicibrlTedqputjK29JNHicUpGsjo56wl7dvDMOIXiaEg3bVNqRb38dWSzdOicqPlCog/132"
       cc.loader.load(profileImg + "?aaa=aa.jpg", (err, texture) =>{
           if (err){
               console.log(err.message)
               return
           }
           let sp = new cc.SpriteFrame(texture);
           this.head.getComponent(cc.Sprite).spriteFrame = sp;
           this.head.setScale(192.0/sp.getTexture().width);
       })

       this.nikeName.string = "TYTY";
       this.userId.string = "123341";
    };

    onFeedbackCliced(){
        
    };

    onBlackClick(){
        //Core.instance.closeLayer("prefabs/dialogs/DMenu");
    };
}
