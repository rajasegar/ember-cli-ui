import Route from '@ember/routing/route';

export default class DependenciesRoute extends Route {

   async model() {
    const response = await fetch('/project');
    const project = await response.json();

    return { project };
  }
}
