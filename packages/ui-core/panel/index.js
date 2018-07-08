// panel/index.js, this filename needs to match the one registered in package.json

let callback=null
Editor.Panel.extend({
  template: `
    <label>请输入文件名：</label>
    <input v-model="filename"></input>
    <ui-button @confirm="onConfirm">Click Me</ui-button>
  `,

  ready () {
    Editor.Ipc.sendToMain('ui-core:show-ok');

    new window.Vue({
      el: this.shadowRoot,
      data: {
        filename:""
      },
      methods: {
        onConfirm ( event ) {
          event.stopPropagation();
          console.log(callback,this.filename);
          Editor.Ipc.sendToMain('ui-core:'+callback,this.filename);
        },
      },
    });
  },

  messages: {
    'ui-core:set-callback' (event,cb) {
      console.log("set-callback",cb)
      callback=cb
    }
  }

});