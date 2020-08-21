import Route from '@ember/routing/route';

export default class ProjectTasksRoute extends Route {

   async model() {
    const response = await fetch('/project');
    const project = await response.json();

    const { scripts } = project;
     const tasks = Object.keys(scripts).map(s => {
       return { name: s, task: scripts[s] };
     });
    return { tasks };
  }
}
