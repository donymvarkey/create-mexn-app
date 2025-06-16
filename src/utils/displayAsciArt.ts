import chalk from 'chalk';
import figlet from 'figlet';
import { APP } from '../constants/index.js';

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
