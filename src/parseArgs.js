const yargs = require('yargs');
const path = require('path');

module.exports = function parseArgs() {
  return yargs
    .option('url', {
      alias: 'u',
      description: 'URL of the website to load',
      type: 'string',
      demandOption: true,
    })
    .option('icon', {
      alias: 'i',
      description: 'Path to the tray icon',
      type: 'string',      
    })
    .help()
    .alias('help', 'h')
    .argv;
};
