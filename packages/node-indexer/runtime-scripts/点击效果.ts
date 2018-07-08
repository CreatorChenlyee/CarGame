import SoundManager from '../../../assets/scripts/extends/SoundManager';
import Core from '../../../assets/scripts/framework/Core';

export type ShowParams={
	data?:any,
	modalWindow?:boolean,
	callback?:any
}

export type ShowCall=(result:ShowParams)=>void

/*
//@call in back
onShowInviteDialog(show:ShowCall){
	Utils.getShareList(ShareType.inviteShare, 32, (data) => {
		show( { data: { invites: data.invites } })
	})
}

//@just now
onShowInviteDialog():ShowParams{
	return { data: { invites: [] }}
}
*/

cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: false,
		menu: 'Dev/点击效果',
	},
    
    properties: {
		playAudioOnClick:{
			tooltip:'点击音效',
			displayName: '播放点击音效',
			default:true,
		},

        audios:{
			tooltip:'音效',
			displayName: '播放音效',
			url: [cc.AudioClip],
			animatable: false,
			default:[],
		},

		openDialog:{
			tooltip:'关闭对话框',
			displayName:'关闭对话框',
			type:cc.Prefab,
			default:null,
		},

		dialog:{
			tooltip:'打开对话框',
			displayName:'打开对话框',
			type:cc.Prefab,
			default:null,
		},

		// isCallInBack:{
		// 	tooltip:'回调打开',
		// 	default:false,
		// },

		dialogParams:{
			tooltip:'对话框传入参数',
			displayName:'参数',
			type:cc.Component.EventHandler,
			default:[],
		}
	},

	onLoad:function(){
		
		let onClick=function(){
			const soundmg=SoundManager.instance

			if(this.playAudioOnClick){
				soundmg.playSound('clicked')
			}

			for(let audio of this.audios){
				let audioname=null
				let m=audio.match(/(\w+).\w+$/)
				if(m){
					audioname=m[1]
				}

				if(audioname){
					soundmg.playSound(audioname)
				}else{
					cc.error(`invalid sound url ${audio}`)
				}
			}

			if(this.closeDialog){
				Core.instance.closeLayer('prefabs/dialogs/'+this.closeDialog.name)
			}

			if(this.dialog){
				const params:cc.Component.EventHandler[]=this.dialogParams
				if(params.length>0){
					let handler=params[0].getHandler()
					let isCallInBack=handler && handler.length>0
					if(isCallInBack){
						params[0].callEmit([(result:ShowParams)=>{
							Core.instance.showLayer('prefabs/dialogs/'+this.dialog.name,result)
						}])
					}else{
						let result:ShowParams=params[0].callEmit([])
						Core.instance.showLayer('prefabs/dialogs/'+this.dialog.name,result)
					}
				}else{
					Core.instance.showLayer('prefabs/dialogs/'+this.dialog.name,{data:{}})
				}
			}
		}
		this.node.on('click',onClick,this)
	},
});
