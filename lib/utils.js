import chalk from 'chalk';

function errorOut(message) {
  console.error(chalk.red(message));
  process.exit(-1);
}

const HELP_PROMPT = `Arguments:

--src-slides  \t\tProvide the source slides JSON data, see README of project for structure expected
--dest        \t\tProvide the destination path, otherwise will dump result in current directory as index.html
--watch       \t\tWatch the input data so that ez-lectures just rebuilds automatically, great for development
--code-theme  \t\tName of CSS theme to use for code highlighting, defaults to ocean. See https://github.com/isagalaev/highlight.js/tree/master/src/styles for choices.
--slide-theme \t\tName of CSS theme to use for general theme styling, defaults to sky. See https://github.com/hakimel/reveal.js/tree/master/css/theme for all choices`;

function getHelp() {
  console.log(chalk.cyan(HELP_PROMPT));
  process.exit(0);
}

export { errorOut, getHelp };
