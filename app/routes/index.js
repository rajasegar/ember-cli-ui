import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service project;

  afterModel() {
    // Empty manifest or not an Ember project
    if (!this.project.isEmberProject) {
      this.transitionTo('new-project');
    }

  }
}
