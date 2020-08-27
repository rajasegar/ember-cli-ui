import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ServeRunnerComponent extends Component {

  @tracked command;
  @tracked isBuildRunning = false;
  @tracked disabled = false;

  get label() {
    return this.isBuildRunning ? "Stop" : "Start";
  }

  get icon() {
    return this.isBuildRunning ? 'stop' : 'play';
  }

  @action
  toggleServe() {

    this.command = this.isBuildRunning ? '\x03' : 'npm start\r\n';
    this.isBuildRunning = !this.isBuildRunning;
    if(this.label === "Start") {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  @action
  socketCallback(message) {
    if(message && message.data) {
    if(message.data.includes('Build successful')) {
      this.isBuildRunning = true;
      this.disabled = false;
    }

    if(message.data.includes('ERR')) {
      this.isBuildRunning = false;
      this.disabled = false;
    }
    }
  }


}
