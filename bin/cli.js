#!/usr/bin/env node

/* globals require process __dirname */

'use strict';

console.log('Ember cli UI');
const startServer = require('../server');
startServer(process.cwd());

/*
const { spawn } = require('child_process');
const env = Object.assign({}, process.env);
env['EMBER_CLI_PROJECT_PATH'] = process.cwd();
const ls = spawn('ember', ['serve'], {
  cwd: __dirname,
  env: env
});
*/

//console.log(process.cwd());
//console.log(__dirname);
//console.log(process.env.PWD);
//ls.stdout.pipe(process.stdout);
//ls.stderr.pipe(process.stderr);


