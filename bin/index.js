#!/usr/bin/env node


// validate that used node version is supported
const semver = require('semver');

const ver = process.versions.node.split('-')[0]; // explode and truncate tag from version

if (semver.satisfies(ver, '>=8.2.0')) {
  require('../build/lectures.js').run();
} else {
  console.log(require('chalk').red(`Node version ${ver} is not supported, please use Node.js 6.0 or higher.`));
  process.exit(1);
}
