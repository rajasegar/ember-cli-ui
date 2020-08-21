import Component from '@glimmer/component';

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Terminal } from  'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { WebLinksAddon } from 'xterm-addon-web-links';
import blueprints from 'ember-cli-ui/constants/blueprints';

let socket = null;
let term = null;
let pid = null;

export default class DestroyRunnerComponent extends Component {

  @tracked blueprint = 'component';
  @tracked name;

  blueprints = Object.keys(blueprints).map(b => {
    return { title: b, value: blueprints[b] }
  });

  @action
  runDestroy() {
    if(this.name) {
      socket.send(`ember d ${this.blueprint} ${this.name}\r\n`);
    }
  }

  @action
  updateBlueprint(event) {
    this.blueprint = event.target.value;
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
      const url = '/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;

      fetch(url, {method: 'POST'});
    });

    const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const port = 3000;
    let socketURL = protocol + location.hostname + ((port) ? (':' + port) : '') + '/terminals/';

    // fit is called within a setTimeout, cols and rows need this.
    setTimeout(function() {


      fetch('/terminals?cols=' + term.cols + '&rows=' + term.rows, {method: 'POST'}).then(function(res)  {
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