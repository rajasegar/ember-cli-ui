import Modifier from 'ember-modifier';
import { Terminal } from  'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { WebLinksAddon } from 'xterm-addon-web-links';

export default class CreateXtermModifier extends Modifier {

  socket = null;
  term = null;
  pid = null;

  didUpdateArguments() {
    const command = this.command;
    this.socket.send(command);
  }

  get command() {
    return this.args.named.command;
  }

  didInstall() {


    this.term = new Terminal();
    this.term.loadAddon(new WebLinksAddon(undefined, undefined, true));
    this.term.open(this.element);
    this.term.focus();
    window.term = this.term;
    this.term.onResize((size) => {
      if (!this.pid) {
        return;
      }
      const cols = size.cols;
      const rows = size.rows;
      const url = '/terminals/' + this.pid + '/size?cols=' + cols + '&rows=' + rows;

      fetch(url, {method: 'POST'});
    });

    const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    let socketURL = protocol + location.hostname + ((location.port) ? (':' + location.port) : '') + '/terminals/';

    // fit is called within a setTimeout, cols and rows need this.
    setTimeout(() => {


      fetch('/terminals?cols=' + this.term.cols + '&rows=' + this.term.rows, {method: 'POST'}).then((res) =>  {
        res.text().then((processId) =>  {
          this.pid = processId;
          socketURL += processId;
          this.socket = new WebSocket(socketURL);
          this.socket.onopen = () =>  {
            this.term.loadAddon(new AttachAddon(this.socket));
            this.term._initialized = true;
          };
          this.socket.onclose = () => {};
          this.socket.onerror = () => {};
        });
      });
    }, 0);


  }

}
