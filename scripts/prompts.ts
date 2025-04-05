import inquirer from 'inquirer';
import chalk from 'chalk';

export interface ProjectOptions {
  projectName: string;
  includeUtils: boolean;
  includeLib: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
}

export async function promptForProjectDetails(): Promise<ProjectOptions> {
  console.log(chalk.blue.bold('✨ Configure your TypeScript project'));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: chalk.cyan('📦 What is the name of your project?'),
      default: 'ts-project',
      validate: (input: string) => {
        if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
        return chalk.red(
          'Project name may only include letters, numbers, hyphens, and underscores'
        );
      },
    },
    {
      type: 'list',
      name: 'includeUtils',
      message: chalk.cyan('🛠️  Include utils directory?'),
      choices: [
        { name: chalk.green('Yes - Add utility functions'), value: true },
        { name: chalk.yellow('No - Skip this directory'), value: false },
      ],
    },
    {
      type: 'list',
      name: 'includeLib',
      message: chalk.cyan('📚 Include lib directory?'),
      choices: [
        { name: chalk.green('Yes - Add library modules'), value: true },
        { name: chalk.yellow('No - Skip this directory'), value: false },
      ],
    },
    {
      type: 'list',
      name: 'packageManager',
      message: chalk.cyan('📦 Select package manager:'),
      choices: [
        { name: chalk.blueBright('npm'), value: 'npm' },
        { name: chalk.cyanBright('yarn'), value: 'yarn' },
        { name: chalk.magentaBright('pnpm'), value: 'pnpm' },
        { name: chalk.yellowBright('bun'), value: 'bun' },
      ],
      default: 'npm',
    },
  ]);

  console.log(chalk.green.bold('✅ Configuration complete!'));
  return answers as ProjectOptions;
}
