import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class InstallRunnerComponent extends Component {

  @tracked name;
  @tracked command;

  @action
  runInstall() {
    if(this.name) {
      this.command = `ember install ${this.name}\r\n`;
    }
  }

}
