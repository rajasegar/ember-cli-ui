import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Terminal } from  'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { WebLinksAddon } from 'xterm-addon-web-links';

let socket = null;
let term = null;
let pid = null;

export default class LintRunnerComponent extends Component {

  @action
  runLint() {
    socket.send('npm run lint\r\n');
  }

  initTerminal(element) {

    term = new Terminal();
    term.loadAddon(new WebLinksAddon(undefined, undefined, true));
    term.open(element);
    term.focus();
    window.term = term;
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
          socket.onopen = () => {
            term.loadAddon(new AttachAddon(socket));
            term._initialized = true;
          };
          socket.onclose = () => {};
          socket.onerror = () => {};
        });
      });
    }, 0);

  }


}
