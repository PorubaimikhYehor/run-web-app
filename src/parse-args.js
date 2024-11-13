const yargs = require('yargs');
const path = require('path');
/**
 * parce command line arguments
 * @returns parced command line arguments
 */
function parseArgs() {
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

module.exports = parseArgs;