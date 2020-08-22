#!/usr/bin/env node

/* globals require process  */

'use strict';

console.log('Ember cli UI');
const startServer = require('../server');
startServer(process.cwd());
