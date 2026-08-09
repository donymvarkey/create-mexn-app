import chalk from 'chalk';
import gradient from 'gradient-string';
import { APP } from '../constants/index.js';

export const displayAsciiArt = () => {
  const coolGradient = gradient(['#00C9FF', '#92FE9D', '#00F2FE', '#4FACFE']);

  console.log(
    '\n  ┌──────────────────────────────────────────────────────────────┐',
  );
  console.log(
    '  │                                                              │',
  );
  console.log(
    `  │   ${coolGradient('⚡ CREATE MEXN APP')}  ${chalk.dim(`v${APP.version}`)}`,
  );
  console.log(
    `  │   ${chalk.dim('MongoDB · Express · Node.js Scaffolding CLI')}`,
  );
  console.log(
    '  │                                                              │',
  );
  console.log(
    '  └──────────────────────────────────────────────────────────────┘\n',
  );
};
