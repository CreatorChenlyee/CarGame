'use strict';

const fs=require('fs')
const path=require('path')
const child_process=require('child_process')

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('fps-modifier');
	  Editor.Ipc.sendToPanel('fps-modifier', 'fps-modifier:hello');
    },
    'say-hello' (event,fps) {
		let targetFile=path.dirname(process.execPath)+'/resources/engine/cocos2d/core/CCGame.js'
		let templateFile=Editor.url('packages://fps-modifier/template/CCGame.js', 'utf8')
		Editor.log('setting fps to',fps);
		let content=fs.readFileSync(templateFile,'utf-8')
		// let content=fs.readFileSync(targetFile,'utf-8')
		let modifiedContent=content.replace('1000/25','1000/'+fps)
		fs.writeFileSync(targetFile,modifiedContent,'utf-8')
		process.chdir(path.dirname(process.execPath)+'/resources/engine/')
		child_process.exec('gulp build-html5-preview',function(error,stdout,stderr){
			Editor.log(error,stderr)
			Editor.log('fps modified to',fps);
		})
		
    }
  },
};