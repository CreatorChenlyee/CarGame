
let taggedNodes={}

cc.findTaggedNode=function(tag){
    let nodes=taggedNodes[tag]
    if(!nodes){
        return null
    }
    for(let i=nodes.length-1;i>=0;i--){
        let node=nodes[i]
        if(!node){
            return null
        }
        if(!cc.isValid(node)){
            nodes.pop()
            continue
        }
        return node
    }
    return null
}

cc.findRelative=function(path,tag){
    let root=cc.findTaggedNode(tag)
    return cc.find(path,root)
}


cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
        menu: 'Dev/TagNode'
    },
    
    properties: {
        tag:{
            // default:'',
            tooltip:'标签',
            get(){
                return this._tag
            },
            set(tag){
                if(this.node){
                    let nodes=taggedNodes[tag] || []
                    taggedNodes[tag]=nodes
                    if(nodes.indexOf(this.node)>=0){
                        return
                    }
                    this._tag=tag
                    if(tag && tag!=''){
                        nodes.push(this.node)
                    }else{
                        nodes.remove([this.node])
                    }
                }else{
                    console.error("invalid node of indexer component")
                }
            },
        },
        _tag:'',
    },

    
    onLoad () {
        if(CC_EDITOR) {
        }
        // let tag=this._tag
        // taggedNodes[tag]=taggedNodes[tag] || []
        // taggedNodes[tag].push(this.node)
        this.tag=this._tag
    },

});
