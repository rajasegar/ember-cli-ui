import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TestRunnerComponent extends Component {

  @tracked command;
  @tracked type = "ALL";
  @tracked filter;

  commands = {
    ALL: 'npm test',
    Unit: 'ember t -f="Unit"',
    Integration: 'ember t -f="Integration"',
    Acceptance: 'ember t -f="Acceptance"',
    'Custom Filter': '',
  };

  @action
  runTests() {
    if(this.type === 'Custom') {
    this.command = `ember t -f="${this.filter}"\r\n`;
    } else  {
      this.command = `${this.commands[this.type]}\r\n`;
    }
  }

  @action
  updateType(event) {
    this.type = event.target.value;
  }



}
