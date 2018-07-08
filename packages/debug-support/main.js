'use strict';

const fs = require('fs')
const path = require('path')
const child_process = require('child_process')

let targetFile
module.exports = {
	load() {
		// execute when package loaded
		targetFile=Editor.projectPath+'/assets/scripts/framework/DebugConfig.js'
	},

	unload() {
		// execute when package unloaded
	},

	// register your ipc messages here
	messages: {
		'disable-debug'(event, fps) {
			let content = fs.readFileSync(targetFile, 'utf-8')
			let modifiedContent = content.replace('window.wdebug=true //@mark', 'window.wdebug=false //@mark')
			fs.writeFileSync(targetFile, modifiedContent, 'utf-8')
			process.chdir(path.dirname(process.execPath) + '/resources/engine/')
			Editor.log('关闭调试')
		},
		'enable-debug'(event, fps) {
			let content = fs.readFileSync(targetFile, 'utf-8')
			let modifiedContent = content.replace('window.wdebug=false //@mark', 'window.wdebug=true //@mark')
			fs.writeFileSync(targetFile, modifiedContent, 'utf-8')
			process.chdir(path.dirname(process.execPath) + '/resources/engine/')
			Editor.log('开启调试')
		},
	},
};