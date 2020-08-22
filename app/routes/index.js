import Route from '@ember/routing/route';

export default class IndexRoute extends Route {

   async model() {
    const response = await fetch('/project');
    const project = await response.json();

    return { project };
  }

afterModel(model) {
  // Empty manifest or not an Ember project
  const { project } = model;
  const hasCli = project.devDependencies && project.devDependencies['ember-cli'];
    if (Object.keys(model.project) === 0 || !hasCli) {
      this.transitionTo('new-project');
    }
  }
}
