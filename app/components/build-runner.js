import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BuildRunnerComponent extends Component {

  @tracked command;
  @tracked disabled = false;
  @tracked showSpinner = false;
  @tracked assets;

  @action
  runBuild() {
    this.command  = `npm run build\r\n`;
    this.disabled = true;
  }

  @action
  socketCallback(msg) {

    if(msg.data.includes('Built project successfully.')) {
      this.disabled = false;
      this.showSpinner = true;
      this.assets =  fetch('/assets')
      .then(res => res.json())
      .then(data => {
      return data;
    });
    }
  }

}
