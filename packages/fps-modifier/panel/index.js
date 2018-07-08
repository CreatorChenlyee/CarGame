// panel/index.js, this filename needs to match the one registered in package.json

let cevent
let fps=60
Editor.Panel.extend({
  template: `
    <label>请输入帧率：</label>
    <input v-model="filename"></input>
    <ui-button @confirm="onConfirm">Click Me</ui-button>
  `,

  ready () {
    new window.Vue({
      el: this.shadowRoot,
      data: {
        filename:""
      },
      methods: {
        onConfirm ( event ) {
          event.stopPropagation();
		  fps=parseInt(this.filename)
			Editor.Ipc.sendToMain('fps-modifier:say-hello',fps)
        },
      },
    });
  },

  messages: {
    'fps-modifier:fps-modifier:hello' (event,cb) {
      console.log("set-callback",cb)
      cevent=event
    }
  }

});