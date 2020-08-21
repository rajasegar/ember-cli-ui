import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BuildRunnerComponent extends Component {

  @tracked command;

  @action
  runBuild() {
    this.command  = `npm run build\r\n`;
  }

}
