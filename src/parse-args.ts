import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * Parse command-line arguments
 * @returns Parsed command-line arguments
 */
export default function parseArgs(): { url: string; icon?: string; } {
  console.log(hideBin(process.argv));
  const argv = yargs(hideBin(process.argv))
    .options({
      "url": { type: 'string', description: 'URL of the website to load' },
      "u": { type: 'string', description: 'URL of the website to load' },
      "icon": { type: 'string', description: 'Path to the tray icon' },
      "i": { type: 'string', description: 'Path to the tray icon' },
    })
    .parseSync();
  argv.url = argv.url ?? argv.u;
  argv.icon = argv.icon ?? argv.i;

  console.log(JSON.stringify(argv))
  return argv as {
    url: string;
    icon?: string;
  };
}