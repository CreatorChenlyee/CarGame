module.exports = {
    'get-class-id': function (event,className) {
        
        //等待编辑器数据刷新
        setTimeout(() => {
            let classId=cc.js._getClassId(cc.js.getClassByName(className))
            event.reply(classId);
                  
        }, 1000);


    }
};