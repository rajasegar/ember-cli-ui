import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

export default class BuildRunnerComponent extends Component {

  @tracked disabled = false;
  @tracked showSpinner = false;
  @tracked assets = [];
  @tracked showLog = false;
  @tracked logs = [];
  @tracked buildReady = false;

  @action
  runBuild() {
    this.showSpinner = true;
    this.disabled = true;
    fetch('/build')
      .then(res => res.json())
      .then(response => {
        //console.log(response);
        this.logs = response.logs.map(l => htmlSafe(l));
        this.assets = response.assets;

        this.showSpinner = false;
        this.disabled = false;
        this.buildReady = true;
      });

  }

  @action
  toggleLog() {
    this.showLog = !this.showLog;
  }

  get logBtnLabel() {
    return this.showLog ? 'Hide Log' : 'Show Log';
  }

}
