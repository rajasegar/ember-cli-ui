import Component from '@glimmer/component';
import { action }  from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UpdateRunnerComponent extends Component {

  resolveConflicts = false;
  runCodemods = false;
  reset = false;
  compare = false;
  stats = false;
  listCodemods = false;

  @tracked command;
  @tracked toVersion;

  @action
  toggleResolveConflicts() {
    this.resolveConflicts = !this.resolveConflicts;
  }

  @action
  toggleRunCodemods() {
    this.runCodemods = !this.runCodemods;
  }

  @action
  toggleReset() {
    this.reset = !this.reset;
  }

  @action
  toggleCompare() {
    this.compare = !this.compare;
  }

  @action
  toggleStats() {
    this.stats = !this.stats;
  }

  @action
  toggleListCodemods() {
    this.listCodemods = !this.listCodemods;
  }

  @action
  runUpdate() {
    const {

      resolveConflicts,
      runCodemods,
      reset,
      compare,
      stats,
      listCodemods,
      toVersion
    } = this;

    const _resolveConflicts = resolveConflicts ? '--resolve-conflicts' : '';
    const _runCodemods = runCodemods ? '--run-codemods' : '';
    const _reset = reset ? '--reset' : '';
    const _compare = compare ? '--compare-only' : '';
    const _stats = stats ? '--stats-only' : '';
    const _listCodemods = listCodemods ? '--list-codemods' : '';
    const _toVersion = toVersion ? `--to=${toVersion}` : '';

    this.command = `ember-cli-update ${_toVersion} ${_resolveConflicts} ${_runCodemods} ${_reset} ${_compare} ${_stats} ${_listCodemods}\r\n`;
  }

  @action
  resetProject() {
    this.command = `git reset --hard && git clean -f\r\n`;
  }

  @action
  installEcu() {
    this.command = `npm i -g ember-cli-update\r\n`;
  }

}
