#!/usr/bin/env node

/* globals require process  */

'use strict';

process.title = 'ember-cli-ui';
console.log('Ember cli UI');
const startServer = require('../server');
startServer(process.cwd());
