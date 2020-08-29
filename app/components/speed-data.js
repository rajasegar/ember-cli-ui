import Component from '@glimmer/component';

export default class SpeedDataComponent extends Component {
  get items() {
    const data = this.args.data;
    const keys = Object.keys(this.args.data);
    return keys.map(k => {
      return {
        name: data[k].title,
        time: data[k].totalDownloadTime,
        mbps: data[k].mbps
      }
    });
  }
}
