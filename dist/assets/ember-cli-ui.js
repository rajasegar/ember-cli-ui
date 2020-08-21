'use strict';



;define("ember-cli-ui/adapters/-json-api", ["exports", "@ember-data/adapter/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("ember-cli-ui/app", ["exports", "ember-resolver", "ember-load-initializers", "ember-cli-ui/config/environment"], function (_exports, _emberResolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class App extends Ember.Application {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "modulePrefix", _environment.default.modulePrefix);

      _defineProperty(this, "podModulePrefix", _environment.default.podModulePrefix);

      _defineProperty(this, "Resolver", _emberResolver.default);
    }

  }

  _exports.default = App;
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
});
;define("ember-cli-ui/component-managers/glimmer", ["exports", "@glimmer/component/-private/ember-component-manager"], function (_exports, _emberComponentManager) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberComponentManager.default;
    }
  });
});
;define("ember-cli-ui/components/build-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <button type="button" {{on "click" this.runBuild}}>Build</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"lFEAS5pT","block":"{\"symbols\":[],\"statements\":[[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"runBuild\"]]],null],[12],[2,\"Build\"],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,1],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/build-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let BuildRunnerComponent = (_dec = Ember._tracked, _dec2 = Ember._action, (_class = (_temp = class BuildRunnerComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "name", _descriptor, this);
    }

    runBuild() {
      socket.send(`npm run build\r\n`);
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = '/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "runBuild", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "runBuild"), _class.prototype)), _class));
  _exports.default = BuildRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, BuildRunnerComponent);
});
;define("ember-cli-ui/components/destroy-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links", "ember-cli-ui/constants/blueprints"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks, _blueprints) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <select {{on "change" this.updateBlueprint}}>
    {{#each this.blueprints as |b|}}
    <option value={{b.value}}>{{b.title}}</option>
  {{/each}}
  </select>
  Name:<Input type="text" placeholder="hello-world" @value={{this.name}}/>
  <button type="button" {{on "click" this.runDestroy}}>Destroy</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"S3ZtzhOF","block":"{\"symbols\":[\"b\"],\"statements\":[[11,\"select\"],[4,[38,0],[\"change\",[32,0,[\"updateBlueprint\"]]],null],[12],[2,\"\\n\"],[6,[37,2],[[30,[36,1],[[30,[36,1],[[32,0,[\"blueprints\"]]],null]],null]],null,[[\"default\"],[{\"statements\":[[2,\"  \"],[10,\"option\"],[15,2,[32,1,[\"value\"]]],[12],[1,[32,1,[\"title\"]]],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[13],[2,\"\\nName:\"],[8,\"input\",[[24,\"placeholder\",\"hello-world\"],[24,4,\"text\"]],[[\"@value\"],[[32,0,[\"name\"]]]],null],[2,\"\\n\"],[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"runDestroy\"]]],null],[12],[2,\"Destroy\"],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,3],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"-track-array\",\"each\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/destroy-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let DestroyRunnerComponent = (_dec = Ember._tracked, _dec2 = Ember._tracked, _dec3 = Ember._action, _dec4 = Ember._action, (_class = (_temp = class DestroyRunnerComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "blueprint", _descriptor, this);

      _initializerDefineProperty(this, "name", _descriptor2, this);

      _defineProperty(this, "blueprints", Object.keys(_blueprints.default).map(b => {
        return {
          title: b,
          value: _blueprints.default[b]
        };
      }));
    }

    runDestroy() {
      if (this.name) {
        socket.send(`ember d ${this.blueprint} ${this.name}\r\n`);
      }
    }

    updateBlueprint(event) {
      this.blueprint = event.target.value;
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = '/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "blueprint", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'component';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "name", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "runDestroy", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "runDestroy"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateBlueprint", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "updateBlueprint"), _class.prototype)), _class));
  _exports.default = DestroyRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, DestroyRunnerComponent);
});
;define("ember-cli-ui/components/generate-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links", "ember-cli-ui/constants/blueprints"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks, _blueprints) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <select {{on "change" this.updateBlueprint}}>
    {{#each this.blueprints as |b|}}
    <option value={{b.value}}>{{b.title}}</option>
  {{/each}}
  </select>
  Name:<Input type="text" placeholder="hello-world" @value={{this.name}}/>
  <button type="button" {{on "click" this.runGenerate}}>Generate</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"D/FV1fBe","block":"{\"symbols\":[\"b\"],\"statements\":[[11,\"select\"],[4,[38,0],[\"change\",[32,0,[\"updateBlueprint\"]]],null],[12],[2,\"\\n\"],[6,[37,2],[[30,[36,1],[[30,[36,1],[[32,0,[\"blueprints\"]]],null]],null]],null,[[\"default\"],[{\"statements\":[[2,\"  \"],[10,\"option\"],[15,2,[32,1,[\"value\"]]],[12],[1,[32,1,[\"title\"]]],[13],[2,\"\\n\"]],\"parameters\":[1]}]]],[13],[2,\"\\nName:\"],[8,\"input\",[[24,\"placeholder\",\"hello-world\"],[24,4,\"text\"]],[[\"@value\"],[[32,0,[\"name\"]]]],null],[2,\"\\n\"],[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"runGenerate\"]]],null],[12],[2,\"Generate\"],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,3],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"-track-array\",\"each\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/generate-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let GenerateRunnerComponent = (_dec = Ember._tracked, _dec2 = Ember._tracked, _dec3 = Ember._action, _dec4 = Ember._action, (_class = (_temp = class GenerateRunnerComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "blueprint", _descriptor, this);

      _initializerDefineProperty(this, "name", _descriptor2, this);

      _defineProperty(this, "blueprints", Object.keys(_blueprints.default).map(b => {
        return {
          title: b,
          value: _blueprints.default[b]
        };
      }));
    }

    runGenerate() {
      if (this.name) {
        socket.send(`ember g ${this.blueprint} ${this.name}\r\n`);
      }
    }

    updateBlueprint(event) {
      this.blueprint = event.target.value;
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "blueprint", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return 'component';
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "name", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "runGenerate", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "runGenerate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "updateBlueprint", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "updateBlueprint"), _class.prototype)), _class));
  _exports.default = GenerateRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, GenerateRunnerComponent);
});
;define("ember-cli-ui/components/install-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _class, _descriptor, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    Name:<Input type="text" placeholder="hello-world" @value={{this.name}}/>
  <button type="button" class="text-right" {{on "click" this.runInstall}}>Install</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"grOtCpTd","block":"{\"symbols\":[],\"statements\":[[2,\"Name:\"],[8,\"input\",[[24,\"placeholder\",\"hello-world\"],[24,4,\"text\"]],[[\"@value\"],[[32,0,[\"name\"]]]],null],[2,\"\\n\"],[11,\"button\"],[24,0,\"text-right\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"runInstall\"]]],null],[12],[2,\"Install\"],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,1],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/install-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let InstallRunnerComponent = (_dec = Ember._tracked, _dec2 = Ember._action, (_class = (_temp = class InstallRunnerComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "name", _descriptor, this);
    }

    runInstall() {
      if (this.name) {
        socket.send(`ember install ${this.name}\r\n`);
      }
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "name", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "runInstall", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "runInstall"), _class.prototype)), _class));
  _exports.default = InstallRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, InstallRunnerComponent);
});
;define("ember-cli-ui/components/lint-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <button type="button" {{on "click" this.runLint}}>Run Lint</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"QT+uHDd3","block":"{\"symbols\":[],\"statements\":[[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"runLint\"]]],null],[12],[2,\"Run Lint\"],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,1],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/lint-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let LintRunnerComponent = (_dec = Ember._action, (_class = class LintRunnerComponent extends _component.default {
    runLint() {
      socket.send('npm run lint\r\n');
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, (_applyDecoratedDescriptor(_class.prototype, "runLint", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "runLint"), _class.prototype)), _class));
  _exports.default = LintRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, LintRunnerComponent);
});
;define("ember-cli-ui/components/serve-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _temp;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <button type="button" {{on "click" this.startServer}}>{{this.buttonLabel}}</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"xl0QAS7C","block":"{\"symbols\":[],\"statements\":[[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"startServer\"]]],null],[12],[1,[32,0,[\"buttonLabel\"]]],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,1],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/serve-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let ServeRunnerComponent = (_dec = Ember._tracked, _dec2 = Ember._tracked, _dec3 = Ember._action, (_class = (_temp = class ServeRunnerComponent extends _component.default {
    constructor(...args) {
      super(...args);

      _initializerDefineProperty(this, "buttonLabel", _descriptor, this);

      _initializerDefineProperty(this, "serverRunning", _descriptor2, this);
    }

    startServer() {
      if (this.serverRunning) {
        this.buttonLabel = "Start Server";
        socket.send('\x03');
      } else {
        this.buttonLabel = "Stop Server";
        socket.send('npm start\r\n');
      }

      this.serverRunning = !this.serverRunning;
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "buttonLabel", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "Start Server";
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "serverRunning", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "startServer", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "startServer"), _class.prototype)), _class));
  _exports.default = ServeRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, ServeRunnerComponent);
});
;define("ember-cli-ui/components/terminal", ["exports", "@glimmer/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <div id="terminal" {{create-xterm}}></div>
  
  */
  {"id":"Ne+0KvF7","block":"{\"symbols\":[],\"statements\":[[11,\"div\"],[24,1,\"terminal\"],[4,[38,0],null,null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"create-xterm\"]}","meta":{"moduleName":"ember-cli-ui/components/terminal.hbs"}});

  class TerminalComponent extends _component.default {}

  _exports.default = TerminalComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, TerminalComponent);
});
;define("ember-cli-ui/components/test-runner", ["exports", "@glimmer/component", "xterm", "xterm-addon-attach", "xterm-addon-web-links"], function (_exports, _component, _xterm, _xtermAddonAttach, _xtermAddonWebLinks) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _dec, _class;

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  const __COLOCATED_TEMPLATE__ = Ember.HTMLBars.template(
  /*
    <button type="button" {{on "click" this.runTests}}>Run Tests</button>
  <div id="terminal" {{did-insert this.initTerminal }}></div>
  
  */
  {"id":"h3f75tOx","block":"{\"symbols\":[],\"statements\":[[11,\"button\"],[24,4,\"button\"],[4,[38,0],[\"click\",[32,0,[\"runTests\"]]],null],[12],[2,\"Run Tests\"],[13],[2,\"\\n\"],[11,\"div\"],[24,1,\"terminal\"],[4,[38,1],[[32,0,[\"initTerminal\"]]],null],[12],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"on\",\"did-insert\"]}","meta":{"moduleName":"ember-cli-ui/components/test-runner.hbs"}});

  let socket = null;
  let term = null;
  let pid = null;
  let TestRunnerComponent = (_dec = Ember._action, (_class = class TestRunnerComponent extends _component.default {
    runTests() {
      socket.send('npm test\r\n');
    }

    initTerminal(element) {
      term = new _xterm.Terminal();
      term.loadAddon(new _xtermAddonWebLinks.WebLinksAddon(undefined, undefined, true));
      term.open(element);
      term.focus();
      window.term = term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);

            socket.onopen = () => {
              term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
              term._initialized = true;
            };

            socket.onclose = () => {};

            socket.onerror = () => {};
          });
        });
      }, 0);
    }

  }, (_applyDecoratedDescriptor(_class.prototype, "runTests", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "runTests"), _class.prototype)), _class));
  _exports.default = TestRunnerComponent;

  Ember._setComponentTemplate(__COLOCATED_TEMPLATE__, TestRunnerComponent);
});
;define("ember-cli-ui/constants/blueprints", ["exports"], function (_exports) {
  'use strict';

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    Component: 'component',
    Route: 'route',
    Helper: 'helper',
    Service: 'service',
    Model: 'model',
    Util: 'util',
    Controller: 'controller',
    Mixin: 'mixin',
    Adapter: 'adapter',
    'Component-Class': 'component-class',
    'HTTP-Mock': 'http-mock',
    'HTTP-Proxy': 'http-proxy',
    'In-Repo-Addon': 'in-repo-addon',
    Lib: 'lib',
    Server: 'server',
    'Vendor-Shim': 'vendor-shim'
  };
  _exports.default = _default;
});
;define("ember-cli-ui/controllers/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ApplicationController extends Ember.Controller {}

  _exports.default = ApplicationController;
});
;define("ember-cli-ui/data-adapter", ["exports", "@ember-data/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _debug.default;
    }
  });
});
;define("ember-cli-ui/helpers/app-version", ["exports", "ember-cli-ui/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("ember-cli-ui/helpers/pluralize", ["exports", "ember-inflector/lib/helpers/pluralize"], function (_exports, _pluralize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _pluralize.default;
  _exports.default = _default;
});
;define("ember-cli-ui/helpers/singularize", ["exports", "ember-inflector/lib/helpers/singularize"], function (_exports, _singularize) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _singularize.default;
  _exports.default = _default;
});
;define("ember-cli-ui/helpers/svg-jar", ["exports", "ember-svg-jar/utils/make-helper", "ember-svg-jar/utils/make-svg"], function (_exports, _makeHelper, _makeSvg) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.svgJar = svgJar;
  _exports.default = void 0;

  function getInlineAsset(assetId) {
    try {
      /* eslint-disable global-require */
      return require(`ember-svg-jar/inlined/${assetId}`).default;
    } catch (err) {
      return null;
    }
  }

  function svgJar(assetId, svgAttrs) {
    return (0, _makeSvg.default)(assetId, svgAttrs, getInlineAsset);
  }

  var _default = (0, _makeHelper.default)(svgJar);

  _exports.default = _default;
});
;define("ember-cli-ui/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "ember-cli-ui/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("ember-cli-ui/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("ember-cli-ui/initializers/ember-data-data-adapter", ["exports", "@ember-data/debug/setup"], function (_exports, _setup) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _setup.default;
    }
  });
});
;define("ember-cli-ui/initializers/ember-data", ["exports", "ember-data", "ember-data/setup-container"], function (_exports, _emberData, _setupContainer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This code initializes EmberData in an Ember application.
  
    It ensures that the `store` service is automatically injected
    as the `store` property on all routes and controllers.
  */
  var _default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
  _exports.default = _default;
});
;define("ember-cli-ui/initializers/export-application-global", ["exports", "ember-cli-ui/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("ember-cli-ui/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (_exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
  _exports.default = _default;
});
;define("ember-cli-ui/modifiers/create-xterm", ["exports", "ember-modifier", "xterm", "xterm-addon-attach"], function (_exports, _emberModifier, _xterm, _xtermAddonAttach) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let socket = null;
  let term = null;
  let pid = null;

  function runRealTerminal() {
    term.loadAddon(new _xtermAddonAttach.AttachAddon(socket));
    term._initialized = true;
  }

  function runFakeTerminal() {}

  class CreateXtermModifier extends _emberModifier.default {
    didInstall() {
      term = new _xterm.Terminal();
      term.open(this.element);
      term.focus();
      window.term = this.term;
      term.onResize(size => {
        if (!pid) {
          return;
        }

        const cols = size.cols;
        const rows = size.rows;
        const url = 'http://localhost:3000/terminals/' + pid + '/size?cols=' + cols + '&rows=' + rows;
        fetch(url, {
          method: 'POST'
        });
      });
      const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
      const port = 3000;
      let socketURL = protocol + location.hostname + (port ? ':' + port : '') + '/terminals/'; // fit is called within a setTimeout, cols and rows need this.

      setTimeout(function () {
        fetch('http://localhost:3000/terminals?cols=' + term.cols + '&rows=' + term.rows, {
          method: 'POST'
        }).then(function (res) {
          res.text().then(function (processId) {
            pid = processId;
            socketURL += processId;
            socket = new WebSocket(socketURL);
            socket.onopen = runRealTerminal;
            socket.onclose = runFakeTerminal;
            socket.onerror = runFakeTerminal;
          });
        });
      }, 0);
    }

  }

  _exports.default = CreateXtermModifier;
});
;define("ember-cli-ui/modifiers/did-insert", ["exports", "@ember/render-modifiers/modifiers/did-insert"], function (_exports, _didInsert) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didInsert.default;
    }
  });
});
;define("ember-cli-ui/modifiers/did-update", ["exports", "@ember/render-modifiers/modifiers/did-update"], function (_exports, _didUpdate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _didUpdate.default;
    }
  });
});
;define("ember-cli-ui/modifiers/will-destroy", ["exports", "@ember/render-modifiers/modifiers/will-destroy"], function (_exports, _willDestroy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _willDestroy.default;
    }
  });
});
;define("ember-cli-ui/router", ["exports", "ember-cli-ui/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  class Router extends Ember.Router {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "location", _environment.default.locationType);

      _defineProperty(this, "rootURL", _environment.default.rootURL);
    }

  }

  _exports.default = Router;
  Router.map(function () {
    this.route('serve');
    this.route('test');
    this.route('lint');
    this.route('generate');
    this.route('destroy');
    this.route('install');
    this.route('build');
  });
});
;define("ember-cli-ui/routes/build", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class BuildRoute extends Ember.Route {}

  _exports.default = BuildRoute;
});
;define("ember-cli-ui/routes/destroy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class DestroyRoute extends Ember.Route {}

  _exports.default = DestroyRoute;
});
;define("ember-cli-ui/routes/generate", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class GenerateRoute extends Ember.Route {}

  _exports.default = GenerateRoute;
});
;define("ember-cli-ui/routes/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class IndexRoute extends Ember.Route {
    async model() {
      const response = await fetch('/project');
      const project = await response.json();
      return {
        project
      };
    }

  }

  _exports.default = IndexRoute;
});
;define("ember-cli-ui/routes/install", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class InstallRoute extends Ember.Route {}

  _exports.default = InstallRoute;
});
;define("ember-cli-ui/routes/lint", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class LintRoute extends Ember.Route {}

  _exports.default = LintRoute;
});
;define("ember-cli-ui/routes/serve", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class ServeRoute extends Ember.Route {}

  _exports.default = ServeRoute;
});
;define("ember-cli-ui/routes/test", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  class TestRoute extends Ember.Route {}

  _exports.default = TestRoute;
});
;define("ember-cli-ui/serializers/-default", ["exports", "@ember-data/serializer/json"], function (_exports, _json) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _json.default;
    }
  });
});
;define("ember-cli-ui/serializers/-json-api", ["exports", "@ember-data/serializer/json-api"], function (_exports, _jsonApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _jsonApi.default;
    }
  });
});
;define("ember-cli-ui/serializers/-rest", ["exports", "@ember-data/serializer/rest"], function (_exports, _rest) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rest.default;
    }
  });
});
;define("ember-cli-ui/services/store", ["exports", "ember-data/store"], function (_exports, _store) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _store.default;
    }
  });
});
;define("ember-cli-ui/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "L3aLyyt6",
    "block": "{\"symbols\":[],\"statements\":[[10,\"div\"],[14,0,\"main\"],[12],[2,\"\\n  \"],[10,\"nav\"],[12],[2,\"\\n    \"],[10,\"p\"],[14,0,\"text-center\"],[12],[10,\"img\"],[14,0,\"logo\"],[14,\"alt\",\"ember-cli-ui\"],[14,\"src\",\"/assets/images/logo.png\"],[12],[13],[2,\"\\n    \"],[13],[2,\"\\n    \"],[10,\"ul\"],[12],[2,\"\\n      \"],[10,\"li\"],[12],[8,\"link-to\",[],[[\"@route\"],[\"index\"]],[[\"default\"],[{\"statements\":[[2,\"Home\"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"],[13],[2,\"\\n    \"],[10,\"h3\"],[14,0,\"text-white\"],[12],[2,\"Tasks\"],[13],[2,\"\\n    \"],[10,\"ul\"],[12],[2,\"\\n      \"],[10,\"li\"],[12],[2,\"\\n        \"],[8,\"link-to\",[],[[\"@route\"],[\"serve\"]],[[\"default\"],[{\"statements\":[[2,\"\\n        Serve\"]],\"parameters\":[]}]]],[2,\"\\n      \"],[13],[2,\"\\n      \"],[10,\"li\"],[12],[2,\"\\n        \"],[8,\"link-to\",[],[[\"@route\"],[\"test\"]],[[\"default\"],[{\"statements\":[[2,\"\\n        Test\"]],\"parameters\":[]}]]],[13],[2,\"\\n      \"],[10,\"li\"],[12],[8,\"link-to\",[],[[\"@route\"],[\"lint\"]],[[\"default\"],[{\"statements\":[[2,\"Lint\"]],\"parameters\":[]}]]],[13],[2,\"\\n      \"],[10,\"li\"],[12],[8,\"link-to\",[],[[\"@route\"],[\"generate\"]],[[\"default\"],[{\"statements\":[[2,\"Generate\"]],\"parameters\":[]}]]],[13],[2,\"\\n      \"],[10,\"li\"],[12],[8,\"link-to\",[],[[\"@route\"],[\"destroy\"]],[[\"default\"],[{\"statements\":[[2,\"Destroy\"]],\"parameters\":[]}]]],[13],[2,\"\\n      \"],[10,\"li\"],[12],[8,\"link-to\",[],[[\"@route\"],[\"install\"]],[[\"default\"],[{\"statements\":[[2,\"Install\"]],\"parameters\":[]}]]],[13],[2,\"\\n      \"],[10,\"li\"],[12],[8,\"link-to\",[],[[\"@route\"],[\"build\"]],[[\"default\"],[{\"statements\":[[2,\"Build\"]],\"parameters\":[]}]]],[13],[2,\"\\n    \"],[13],[2,\"\\n  \"],[13],[2,\"\\n  \"],[10,\"div\"],[14,0,\"right_col\"],[12],[2,\"\\n    \"],[1,[30,[36,1],[[30,[36,0],null,null]],null]],[2,\"\\n  \"],[13],[2,\"\\n\"],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"-outlet\",\"component\"]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/build", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "0G0+P9aB",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Build your Ember project\"],[13],[2,\"\\n\"],[8,\"build-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/build.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/destroy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "pYMGA/Xa",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Destroy Blueprints\"],[13],[2,\"\\n\"],[8,\"destroy-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/destroy.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/generate", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "I0FXh4Jr",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Generate Blueprints\"],[13],[2,\"\\n\"],[8,\"generate-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/generate.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "iX0jyrzD",
    "block": "{\"symbols\":[\"@model\"],\"statements\":[[10,\"h1\"],[12],[1,[32,1,[\"project\",\"name\"]]],[13],[2,\"\\n\"],[10,\"p\"],[12],[1,[32,1,[\"project\",\"description\"]]],[13],[2,\"\\n\"],[10,\"p\"],[12],[2,\"Version: \"],[1,[32,1,[\"project\",\"version\"]]],[13],[2,\"\\n\"],[10,\"p\"],[12],[2,\"ember-cli: \"],[1,[30,[36,0],[[32,1,[\"project\",\"devDependencies\"]],\"ember-cli\"],null]],[13],[2,\"\\n\"],[10,\"p\"],[12],[2,\"Dependencies: \"],[1,[30,[36,0],[[32,1,[\"project\",\"dependencies\"]],\"length\"],null]],[13],[2,\"\\n\"],[10,\"p\"],[12],[2,\"Dev Dependencies: \"],[1,[32,1,[\"project\",\"devDependencies\",\"length\"]]],[13],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[\"get\"]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/install", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "6QJTQ/HG",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Install Ember Addons\"],[13],[2,\"\\n\"],[8,\"install-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/install.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/lint", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "eXWItSFV",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Lint\"],[13],[2,\"\\n\"],[8,\"lint-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/lint.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/serve", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "vGjqC9Qc",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Serve\"],[13],[2,\"\\n\"],[8,\"serve-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/serve.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/templates/test", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Nc0He5S3",
    "block": "{\"symbols\":[],\"statements\":[[10,\"h2\"],[12],[2,\"Test\"],[13],[2,\"\\n\"],[8,\"test-runner\",[],[[],[]],null],[2,\"\\n\"]],\"hasEval\":false,\"upvars\":[]}",
    "meta": {
      "moduleName": "ember-cli-ui/templates/test.hbs"
    }
  });

  _exports.default = _default;
});
;define("ember-cli-ui/transforms/boolean", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.BooleanTransform;
    }
  });
});
;define("ember-cli-ui/transforms/date", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.DateTransform;
    }
  });
});
;define("ember-cli-ui/transforms/number", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.NumberTransform;
    }
  });
});
;define("ember-cli-ui/transforms/string", ["exports", "@ember-data/serializer/-private"], function (_exports, _private) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _private.StringTransform;
    }
  });
});
;

;define('ember-cli-ui/config/environment', [], function() {
  var prefix = 'ember-cli-ui';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(decodeURIComponent(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("ember-cli-ui/app")["default"].create({"name":"ember-cli-ui","version":"0.3.0+334c566e"});
          }
        
//# sourceMappingURL=ember-cli-ui.map
