'use strict';

const path = require('path');
const fs = require('fs');
const child_process=require('child_process')


function publishWX(mod){
	let toolpath=Editor.projectPath+"/../tool/"
	let cwd=process.cwd()
	let cmdPath="";
	if(process.platform=="darwin"){
		if(mod=="Develop"){
			cmdPath=toolpath+"publish2develop.command"
		}else if(mod=="Test"){
			cmdPath=toolpath+"publish2test.command"
		}else if(mod=="Release"){
			cmdPath=toolpath+"publish2release.command"
		}
	}else if(process.platform == "win"){
		if(mod=="Develop"){
			cmdPath=toolpath+"publish2develop.bat"
		}else if(mod=="Test"){
			cmdPath=toolpath+"publish2test.bat"
		}else if(mod=="Release"){
			cmdPath=toolpath+"publish2release.bat"
		}
	}

	Editor.log(cmdPath)
	var p=child_process.exec(cmdPath)
    p.stderr.on("data",(chunk)=>{
        Editor.error(chunk)
    })
    p.stdout.on("data",(chunk)=>{
        Editor.log(chunk);
    })
    p.on("exit",(code,signal)=>{
		//执行完毕
		console.log("执行完毕")
    })

}

module.exports = {
	load () {
		// execute when package loaded
	},

	unload () {
		// execute when package unloaded
	},

	// register your ipc messages here
	messages: {
		'Develop' () {
			// open entry panel registered in package.json
			publishWX('Develop')
		},
		'Test' () {
			// open entry panel registered in package.json
			publishWX('Test')
		},
		'Release' () {
			// open entry panel registered in package.json
			publishWX('Release')
		}
	},
};