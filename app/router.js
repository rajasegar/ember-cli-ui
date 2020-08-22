import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('serve');
  this.route('test');
  this.route('lint');
  this.route('generate');
  this.route('destroy');
  this.route('install');
  this.route('build');
  this.route('project-tasks');
  this.route('new-project');
  this.route('dependencies');
  this.route('project-update');
});
