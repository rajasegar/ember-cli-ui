import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ServeRunnerComponent extends Component {

  @tracked command;

  @action
  startServer() {
    this.command = 'npm start\r\n';
  }

  @action
  stopServer() {
    this.command = '\x03';
  }


}
