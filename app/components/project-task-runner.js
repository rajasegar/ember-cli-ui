import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProjectTaskRunnerComponent extends Component {

  @service project;

  @tracked task;
  @tracked command;
  @tracked taskCommand;

  @action
  runTask() {
    this.command = `npm run ${this.task}\r\n`;
  }

  @action
  updateTask(event) {
    this.task = event.target.value;
    this.taskCommand = this.project.tasks.find(t => t.name === this.task).task;
  }
}
