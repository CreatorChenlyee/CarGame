// main.js

const path = require('path');
const fs = require('fs');
const child_process=require('child_process')

let enable=false

function clearCache(){

    if(!enable){
        return
    }

    let engineDir=path.dirname(process.execPath)+'/resources/engine'
    let cacheDir=engineDir+'/bin/.cache'
    // fs.rmdirSync(cacheDir)
    if(fs.existsSync(cacheDir)){
        child_process.execSync('rmdir /s /q "'+cacheDir+'"')
    }
    Editor.log('removed cache dir:',!fs.existsSync(cacheDir))

}

function onBeforeBuildFinish (options, callback) {
    clearCache()

    callback();
}

module.exports = {
    load () {
        Editor.Builder.on('build-start', onBeforeBuildFinish);
    },

    unload () {
        Editor.Builder.removeListener('build-start', onBeforeBuildFinish);
    },

    messages: {
        'clear-cache' () {
            // open entry panel registered in package.json
            clearCache()
        },
        'enable' () {
            // open entry panel registered in package.json
            enable=true
        },
        'disable' () {
            // open entry panel registered in package.json
            enable=false
        }
    }
};
