'use strict';

const fs=require("fs")
const path=require("path")

let dialogsPath=path.join(Editor.projectPath,"resources/dialogs")
let scenesPath=path.join(Editor.projectPath,"scenes")

let dialogsScriptPath=path.join(Editor.projectPath,"scripts/dialogs")
let scenesScriptPath=path.join(Editor.projectPath,"scripts/scenes")


let callback=""
module.exports = {
	load () {
		// execute when package loaded
	},

	unload () {
		// execute when package unloaded
	},

	// register your ipc messages here
	messages: {
		'show-ok'(){
			Editor.Ipc.sendToPanel('ui-core',"ui-core:set-callback" ,callback);
		},
		'show-create-scene-scene'(){
			Editor.Panel.open('ui-core');
			callback= 'create-scene'
		},
		'show-create-scene-dialog'(){
			Editor.Panel.open('ui-core');
			callback= 'create-dialog'
		},
		'show-create-scene-animation'(){
			Editor.Panel.open('ui-core');
			callback= 'create-animation'
		},
		'create-scene' (ev,fileName) {
			//写入场景组件

			let template=fs.readFileSync(path.join(Editor.projectPath,"packages/ui-core/template/scene.ts"),"utf-8");

			template=template.replace(/{{ClassName}}/g,fileName);

			Editor.assetdb.create( 'db://assets/scripts/scenes/'+fileName+'.ts', template, function ( err, results ) {
				results.forEach(function ( result ) {

					//向渲染线程所要类ID
					Editor.Scene.callSceneScript('ui-core', 'get-class-id',fileName, function ( classId) {
						Editor.log(`classId = ${classId}`);
						// //创建界面
						let template=fs.readFileSync(path.join(Editor.projectPath,"packages/ui-core/template/scene.fire"),"utf-8");
						template=template.replace(/{{ClassId}}/g,classId);
						Editor.assetdb.create( 'db://assets/scenes/'+fileName+'.fire', template)
					});

				});
			});

			Editor.Panel.close('ui-core');
		},
		'create-dialog' (ev,fileName) {
			let template=fs.readFileSync(path.join(Editor.projectPath,"packages/ui-core/template/dialog.ts"),"utf-8");

			template=template.replace(/{{ClassName}}/g,fileName);

			Editor.assetdb.create( 'db://assets/scripts/dialogs/'+fileName+'.ts', template, function ( err, results ) {
				results.forEach(function ( result ) {

					//向渲染线程所要类ID
					Editor.Scene.callSceneScript('ui-core', 'get-class-id',fileName, function ( classId) {
						Editor.log(`classId = ${classId}`);
						// //创建界面
						let template=fs.readFileSync(path.join(Editor.projectPath,"packages/ui-core/template/dialog.prefab"),"utf-8");
						template=template.replace(/{{ClassId}}/g,classId);
						Editor.assetdb.create( 'db://assets/resources/prefabs/dialogs/'+fileName+'.prefab', template)
					});

				});
			});
			Editor.Panel.close('ui-core');
		},
		'create-animation' (ev,fileName) {
			
			// //创建界面
			let template=fs.readFileSync(path.join(Editor.projectPath,"packages/ui-core/template/animation.prefab"),"utf-8");
			Editor.assetdb.create( 'db://assets/resources/prefabs/anims/'+fileName+'.prefab', template)

			Editor.Panel.close('ui-core');
		},
	},
};