import path from 'path';
import chalk from 'chalk';
import { execa } from 'execa';
import { createFile } from './file.js';

/**
 * Initializes a git repository in the given directory
 */
export async function initializeGit(projectPath: string) {
  try {
    await execa('git', ['init'], { cwd: projectPath });
    console.log(chalk.green('Initialized git repository'));

    // Create .gitignore
    const gitignore = `node_modules/
    dist/
    .DS_Store
    *.log
    `;

    await createFile(path.join(projectPath, '.gitignore'), gitignore);
  } catch (error) {
    console.log(
      chalk.yellow('Could not initialize git repository. Is git installed?')
    );
  }
}
