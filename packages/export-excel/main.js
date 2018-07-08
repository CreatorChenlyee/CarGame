'use strict';

const path = require('path');
const fs = require('fs');
const child_process=require('child_process')

let toUpdateExportTool=false

function exportExcel(){
	let toolpath=Editor.projectPath+"/../tool/"

	Editor.log('更新导表工具 。。。')
	let cwd=process.cwd()
	process.chdir(toolpath+'/ExcelExport')
	let updateCmdline='git pull'
	if(!toUpdateExportTool){
		updateCmdline='echo on'
	}
	let updateMsg=child_process.exec(updateCmdline,(error,stdout,stderr)=>{
		if(error){
			Editor.error('更新导表工具失败')
			Editor.error(error)
			Editor.error(stderr)
			// return
		}else{
			Editor.log(stdout)
			Editor.log('更新导表工具成功')
		}
		// Editor.log(updateMsg)
	
		Editor.log('开始导表 。。。')
		process.chdir('..')
		let cmdpath
		let msg
		if(process.platform=='win32'){
			cmdpath='call export.bat'
		}else{
			cmdpath='./export.command'
		}
		child_process.exec(cmdpath,(error,stdout,stderr)=>{
			process.chdir(cwd)
			if(error){
				Editor.error('导表失败')
				Editor.error(error)
				Editor.error(stderr)
			}else{
				Editor.log('导表结果: ',stdout)
				Editor.log('导表成功')
			}
		})
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
		'export' () {
			// open entry panel registered in package.json
			process.nextTick(()=>{
				exportExcel()
			})
		}
	},
};