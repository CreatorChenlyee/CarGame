'use strict';

const path = require('path');
const fs = require('fs');
const child_process=require('child_process')

let timerid=null
let enable=true
let isdebug=false

function resortMetaFiles(){
	let cwd=process.cwd()
	process.chdir(Editor.projectPath)
	let ret=child_process.execSync('git status -s -u ').toString()
	let difflist=ret.replace('git status: ','').split('\n')
	difflist.pop()
	if(isdebug){
		Editor.log('difflist:',difflist)
	}
	let metafiles=[]
	for(let diffitem of difflist){
		if(! diffitem.endsWith('.meta')){
			continue
		}
		let fullpath=diffitem.match(/^\s*[\w\?\!]+ (.*)\s*$/)[1]
		if(!fs.existsSync(fullpath)){
			continue
		}
		if(!fs.lstatSync(fullpath).isFile()){
			continue
		}
		metafiles.push(fullpath)
	}

	if(isdebug){
		Editor.log('metafiles:',metafiles)
	}
	for(let file of metafiles){
		// if(!fs.existsSync(file)){
		// 	continue
		// }
		let content=fs.readFileSync(file,'utf-8')
		// let newcontent=JSON.stringify(JSON.parse(content))
		let newcontent=content.replace('\r','\n').replace('\n\n','\n')
		if(content!=newcontent){
			fs.writeFileSync(file,newcontent,'utf-8')
			Editor.log('modified meta file: '+file)
		}else{
			if(isdebug){
				Editor.log('already new meta file: '+file)
			}
		}
	}
	process.chdir(cwd)
}

module.exports = {
	load () {
		// execute when package loaded
		if(timerid){
			clearInterval(timerid)
			timerid=null
		}
		timerid=setInterval(()=>{
			if(!enable){
				return
			}
			resortMetaFiles()
		},5000)
		resortMetaFiles()
	},

	unload () {
		// execute when package unloaded
		if(timerid){
			clearInterval(timerid)
			timerid=null
		}
	},

	// register your ipc messages here
	messages: {
		'sort' () {
			// open entry panel registered in package.json
			resortMetaFiles()
		},
		'enable' (){
			enable=true
		},
		'disable' (){
			enable=false
		},
		'toggle-debug' (){
			isdebug=!isdebug
		},
	},
};