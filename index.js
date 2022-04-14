/* eslint-disable no-console */

const yargs = require('yargs');
const path = require('path');
const run = require('./export');

process.on('unhandledRejection', (e) => {
  console.error(e);
  throw e;
});

process.on('uncaughtException', (e) => {
  console.error(e);
});

const { argv } = yargs
  .usage('$0 <source.drawio> -o [target]')
  .option('o', {
    alias: 'output',
    demandOption: true,
    default: 'a.png',
    describe: 'output file',
    type: 'string',
  });

console.log(argv._[0])
console.log(path.extname(argv.output).replace(/^\./, ''))
console.log(argv.output)
if (argv._.length !== 1) {
  throw new Error('Exactly one file at a time');
}

// module.exports = () => run({
run({
  file: argv._[0],
  format: path.extname(argv.output).replace(/^\./, ''),
  path: argv.output,
});
