'use strict';

const fs = require('fs');
const zlib = require('zlib');
const walkSync = require('walk-sync');
const filesize = require('filesize');
const { getSpeeds } = require('./downloadTime');

module.exports = function(projectPath) {

  return walkSync(`${projectPath}/dist`, { globs: ['**/*.js','**/*.css'] })
    .map(file => {

      const filePath = `${projectPath}/dist/${file}`;
      let contentsBuffer = fs.readFileSync(filePath);
      let output = {
        name: file,
        size: filesize(contentsBuffer.length),
      };

      const gzipSize = contentsBuffer.length > 0 ? zlib.gzipSync(contentsBuffer).length : 0;
      output.gzipSize = filesize(gzipSize);
      output.speeds = getSpeeds(gzipSize);

      return output;
    });
}
