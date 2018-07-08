'use strict';

let child_process=require('child_process')
let fs=require('fs')

let enableLog=true
let log=function(s){
  if(enableLog){
    return Editor.log(s)
  }else{

  }
}

let syncFolder=function(callback){
  // log(Editor.projectPath)
  let scriptPath=Editor.projectPath+'/assets/scripts'
  scriptPath=fs.realpathSync(scriptPath)
  let toolPath=Editor.projectPath+'/packages/auto-merge-config/scripts/sync.py'
  toolPath=fs.realpathSync(toolPath)
  const cmdline=`python3 ${toolPath} ${scriptPath} && exit`
  log(`merge ${scriptPath}`)
  log(cmdline)
  let ret=child_process.exec(cmdline,callback)
  return ret
}

let timerid=null
let mergingProcess=null

let startMerger=()=>{
  if(timerid){
    return
  }

  timerid=setInterval(()=>{
	  if(mergingProcess){
		  mergingProcess.kill()
		  mergingProcess=null
	  }
    mergingProcess=syncFolder(function(){
		if(mergingProcess){
		mergingProcess.kill()
		mergingProcess=null
		}
	})
  },2500)
  log('dataframe merger enabled')
}

let stopMerger=()=>{
  if(timerid){
    clearInterval(timerid)
    timerid=null
    log('dataframe merger cancelled')
  }
}

module.exports = {
  load () {
    // execute when package loaded
    startMerger()
  },

  unload () {
    // execute when package unloaded
    stopMerger()
  },

  // register your ipc messages here
  messages: {
    'start-merger' () {
      // open entry panel registered in package.json
      // Editor.Panel.open('auto-merge-config');
      startMerger()
    },
    'stop-merger' () {
      // log('Hello World!');
      // send ipc message to panel
      // Editor.Ipc.sendToPanel('auto-merge-config', 'auto-merge-config:hello');
      stopMerger()
    },
    'clicked' () {
      // log('Button clicked!');
    },
    'toggle-log'(){
      enableLog=!enableLog
    }
  },
};