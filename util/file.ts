import fs from 'fs/promises';
import chalk from 'chalk';

/**
 * Creates a directory if it doesn't exist
 */
export async function createDirectory(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(chalk.green(`Created directory: ${dir}`));
  } catch (error) {
    console.error(chalk.red(`Failed to create directory: ${dir}`), error);
    throw error;
  }
}

/**
 * Creates a file with the given content
 */
export async function createFile(filePath: string, content: string) {
  try {
    await fs.writeFile(filePath, content);
    console.log(chalk.green(`Created file: ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Failed to create file: ${filePath}`), error);
    throw error;
  }
}
