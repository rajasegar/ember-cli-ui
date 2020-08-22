import Component from '@glimmer/component';
import { coerce, valid } from 'semver';

export default class ProjectInfoComponent extends Component {
  get depsLength() {
    const len = Object.keys(this.args.project.dependencies).length || 0;
    return len;
  }

  get devDepsLength() {
    const len = Object.keys(this.args.project.devDependencies).length || 0;
    return len;
  }

  get cliVersion() {
    const v =  valid(coerce(this.args.project.devDependencies['ember-cli']));
    console.log(v);
    return v;
  }
}
