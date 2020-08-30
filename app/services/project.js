import Service from '@ember/service';
import { coerce, valid } from 'semver';

export default class ProjectService extends Service {
  async initialize() {
    const response = await fetch('/project');
    const project = await response.json();
    this.project = project;
    return project;
  }

  get name() {
    return this.project.name;
  }

  get description() {
    return this.project.description;
  }

  get version() {
    return this.project.version;
  }

  get cliVersion() {
    return valid(coerce(this.project.devDependencies['ember-cli']));
  }

  get depsLength() {
    const  { dependencies } = this.project;
    const len = dependencies && Object.keys(dependencies).length || 0;
    return len;
  }

  get devDepsLength() {
    const len = Object.keys(this.project.devDependencies).length || 0;
    return len;
  }

  get license() {
    return this.project.license;
  }

  get edition() {
    return this.project.ember &&  this.project.ember.edition || '';
  }

  get node() {
    return this.project.engines.node;
  }

  get private() {
    return this.project.private;
  }

  get tasks() {
    const { scripts } = this.project;
    return Object.keys(scripts).map(s => {
      return { name: s, task: scripts[s] };
    });
  }

  get isEmberProject() {

    const hasCli = this.project.devDependencies && this.project.devDependencies['ember-cli'];
    return Object.keys(this.project) > 0 || hasCli;

  }

  get projectPath() {
    return this.project.projectPath;
  }

}
