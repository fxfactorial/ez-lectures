#!/usr/bin/env node

'use strict';

// validate that used node version is supported
var semver = require('semver');
var ver = process.versions.node;
ver = ver.split('-')[0]; // explode and truncate tag from version

if (semver.satisfies(ver, '>=8.2.0')) {
  require('../build/lectures.js').run();
} else {
  console.log(
    require('chalk').red(
      'Node version ' + ver + ' is not supported, please use Node.js 6.0 or higher.'
    )
  );
  process.exit(1);
}
