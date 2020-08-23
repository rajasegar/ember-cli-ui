import Component from '@glimmer/component';
import { diff, coerce } from 'semver';

export default class DepsListComponent extends Component {
  get items() {
    const url = `/dependencies?type=${this.args.type}`;
    return fetch(url)
      .then(res => res.json())
      .then(deps => {
        debugger
        const { dependencies } = deps;
        return dependencies.map(d => {
          d.diff = '-';
          if(d.latest !== '-') {
            d.diff = diff(coerce(d.version), coerce(d.latest));
          }
          return d;
        });
      });
  }
}
