import Component from '@glimmer/component';

export default class DepsListComponent extends Component {


  get dependencies() {

      return Object.keys(this.args.deps).map((d) => {
        return { 
          name: d, 
          version: this.args.deps[d],
        };
      });
  }
}
