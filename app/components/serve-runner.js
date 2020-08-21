import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ServeRunnerComponent extends Component {

  @tracked buttonLabel = "Start Server"
  @tracked serverRunning = false;
  @tracked command;

  @action
  startServer() {
    if(this.serverRunning) {
      this.buttonLabel = "Start Server";
      this.command = '\x03';
    } else {
      this.buttonLabel = "Stop Server";
      this.command = 'npm start\r\n';
    }
    this.serverRunning = !this.serverRunning;
  }


}
