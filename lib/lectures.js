/** Edgar Aroutiounian, twitter.com/@edgararout */

import fs from 'fs-extra';
import minimist from 'minimist';
import chalk from 'chalk';

import { errorOut, getHelp } from './utils';
import buildLectures from './buildLectures';

const argv = minimist(process.argv.slice(2));

module.exports.run = async () => {
  const { help, dest, watch } = argv;
  if (help) {
    getHelp();
  }
  if (argv['src-slides'] == null) {
    errorOut('Must provide source slides file path');
  }
  const b = buildLectures.bind(
    null,
    dest == null ? 'index.html' : dest,
    argv['src-slides'],
    argv['code-theme'],
    argv['slide-theme'],
  );
  console.log(chalk.cyan('Building lectures'));
  try {
    await b();
    if (watch != null) {
      fs.watch(argv['src-slides'], async (evType) => {
        if (evType === 'change') {
          console.log(chalk.cyan('Rebuilding lectures'));
          await b();
        }
      });
    }
  } catch ({ message }) {
    errorOut(`Could not build lecture notes, reason: ${message}`);
  }
};
