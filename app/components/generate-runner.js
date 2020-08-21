import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import blueprints from 'ember-cli-ui/constants/blueprints';

export default class GenerateRunnerComponent extends Component {

  @tracked blueprint = 'component';
  @tracked name;
  @tracked command;

  blueprints = Object.keys(blueprints).map(b => {
    return { title: b, value: blueprints[b] }
  });

  @action
  runGenerate() {
    if(this.name) {
      this.command = `ember g ${this.blueprint} ${this.name}\r\n`;
    }
  }

  @action
  updateBlueprint(event) {
    this.blueprint = event.target.value;
  }


}
