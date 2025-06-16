import chalk from 'chalk';
import figlet from 'figlet';
import { APP } from '../constants/index.js';

/**
 * Displays the application's ASCII art banner in the console using the 'figlet' library.
 * The banner includes the application name, description, and version, styled with 'chalk'.
 *
 * @remarks
 * - Uses the 'Doom' font for ASCII art.
 * - Outputs additional application metadata below the banner.
 * - Handles and logs errors if ASCII art generation fails.
 *
 * @public
 */
export const displayAsciiArt = () => {
  figlet.text(
    'create-mexn-app',
    {
      font: 'Doom',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 120,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(chalk.cyanBright(data));
      console.log(chalk.greenBright(APP.description));
      console.log(chalk.greenBright(`version v${APP.version}`));
    },
  );
};
