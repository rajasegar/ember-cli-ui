import Modifier from 'ember-modifier';
import { Terminal } from  'xterm';
import { inject as service } from '@ember/service';
import { AttachAddon } from 'xterm-addon-attach';

let  socket = null;
let  term  = null;
let  pid = null;


function runRealTerminal() {
  term.loadAddon(new AttachAddon(socket));
  term._initialized = true;
}

function runFakeTerminal() {
}

export default class CreateXtermModifier extends Modifier {

  @service websockets;


  didInstall() {

    term = new Terminal();
    term.open(this.element);
    term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    term.focus();
    window.term = this.term;
    term.onResize((size) => {
      if (!pid) {
        return;
      }
      const cols = size.cols;
      const rows = size.rows;
      const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;

      fetch(url, {method: 'POST'});
    });

    const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const port = 3000;
    let socketURL = protocol + location.hostname + ((port) ? (':' + port) : '') + '/terminals/';

    // fit is called within a setTimeout, cols and rows need this.
    setTimeout(function() {


      fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {method: 'POST'}).then(function(res)  {
        res.text().then(function(processId)  {
          pid = processId;
          socketURL += processId;
          socket = new WebSocket(socketURL);
          socket.onopen = runRealTerminal;
          socket.onclose = runFakeTerminal;
          socket.onerror = runFakeTerminal;
        });
      });
    }, 0);

    term.onKey((key, ev ) => {
    });


  }






}
