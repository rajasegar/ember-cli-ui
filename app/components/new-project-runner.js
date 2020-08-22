import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NewProjectRunnerComponent extends Component {
  dryRun = false
  verbose = false
  npm = false
  git = false
  yarn = false
  bower = false
  appName = 'my-app'
  blueprint = ''
  dir = ''
  noWelcome = false
  alias = true

  @tracked name;
  @tracked command;


  @action
  createNewProject() {

    const dryRun = this.dryRun ? 
      this.alias ? '-d' : ' --dry-run' : '';

    const npm = this.npm ? this.alias ? '-sn' : '--skip-npm' : '';
    const git = this.git ? this.alias ? '-sg' : '--skip-git' : '';
    const bower = this.bower ? this.alias ? '-sb' : '--skip-bower' : '';
    const yarn = this.yarn ? '--yarn' : '';
    const noWelcome = this.noWelcome ? '--no-welcome' : '';
    const verbose = this.verbose ? this.alias ? '-v' : '--verbose' : '';
    const blueprint = this.blueprint ? this.alias ? `-b ${this.blueprint}` : `--blueprint ${this.blueprint}` : '';
    const dir = this.dir ? this.alias ? `-dir ${this.dir}` : `--directory ${this.dir}` : '';
    const _command = `ember new ${this.name} ${dryRun} ${npm} ${git} ${bower} ${yarn} ${verbose} ${blueprint} ${dir} ${noWelcome}\r\n`;
    console.log(_command);
    this.command = _command;
  }


  @action
  toggleDryRun() {
    this.dryRun = !this.dryRun;
  }

  @action
  toggleVerbose() {
    this.verbose = !this.verbose;
  }  

  @action
  toggleSkipNpm() {
    this.npm = !this.npm;
  }  

  @action
  toggleSkipGit() {
    this.git = !this.git;

  }  

  @action
  toggleYarn() {
    this.yarn = !this.yarn;

  }  

  @action
  toggleSkipBower() {
    this.bower = !this.bower;
  }

  @action
  toggleWelcome() {
    this.noWelcome = !this.noWelcome;
  }

  @action
  updateAppName(event) {
    this.appName = event.target.value;
  }

  @action
  updateBlueprint(event) {
    this.blueprint = event.target.value;
  }  

  @action
  updateDirectory(event) {
    this.dir = event.target.value;
  }
}
