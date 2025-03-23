import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import boxen from 'boxen';
import { ProjectOptions, promptForProjectDetails } from './prompts.js';
import { createDirectory, createFile } from '../util/file.js';
import { initializeGit } from '../util/git.js';
import {
  APP_TS,
  MAIN_TS,
  TSCONFIG_JSON,
  PRETTIER_CONFIG,
  UTILS_INDEX_TS,
  LIB_INDEX_TS,
} from '../config/config.js';

// Get current file's directory with ESM support
const __filename = fileURLToPath(import.meta.url);

async function createPackageJson(projectPath: string, projectName: string) {
  const packageJson = {
    name: projectName,
    version: '0.1.0',
    description: 'TypeScript project generated with ts-project-generator',
    type: 'module',
    main: 'dist/main.js',
    bin: {
      [projectName]: './dist/main.js',
    },
    scripts: {
      dev: 'tsc --watch',
      build: 'tsc',
      format: 'prettier --write "**/*.{ts,js,json,md}"',
      start: 'node dist/main.js',
    },
    keywords: ['typescript', 'cli'],
    author: '',
    license: 'MIT',
    devDependencies: {
      '@types/node': 'latest',
      typescript: 'latest',
      prettier: 'latest',
    },
  };

  await createFile(
    path.join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
}

export async function createProjectStructure(options: ProjectOptions) {
  const projectPath = path.resolve(process.cwd(), options.projectName);

  try {
    // Create project directory
    await createDirectory(projectPath);

    // Create subdirectories
    await createDirectory(path.join(projectPath, 'scripts'));
    if (options.includeUtils) {
      await createDirectory(path.join(projectPath, 'utils'));
    }
    if (options.includeLib) {
      await createDirectory(path.join(projectPath, 'lib'));
    }

    // Create main files
    await createFile(path.join(projectPath, 'app.ts'), APP_TS);
    await createFile(path.join(projectPath, 'main.ts'), MAIN_TS);

    // Create config files
    await createFile(path.join(projectPath, 'tsconfig.json'), TSCONFIG_JSON);
    await createFile(
      path.join(projectPath, 'prettier.config.mjs'),
      PRETTIER_CONFIG
    );

    // Create package.json
    await createPackageJson(projectPath, options.projectName);

    // Create directory-specific files
    if (options.includeUtils) {
      await createFile(
        path.join(projectPath, 'utils', 'index.ts'),
        UTILS_INDEX_TS
      );
    }
    if (options.includeLib) {
      await createFile(path.join(projectPath, 'lib', 'index.ts'), LIB_INDEX_TS);
    }

    // Initialize git repository
    await initializeGit(projectPath);

    const successMessage = boxen(
      `${chalk.green(`Project "${options.projectName}" created successfully!`)}\n\n` +
        `${chalk.cyan('Next steps:')}\n` +
        `${chalk.white(`  cd ${options.projectName}`)}\n` +
        `${chalk.white('  npm install')}\n` +
        `${chalk.white('  npm run dev')}`,
      {
        padding: 1,
        margin: 1,
        borderColor: 'green',
        title: 'Success',
        titleAlignment: 'center',
      }
    );

    console.log(successMessage);
  } catch (error) {
    console.error(chalk.red('Failed to create project structure:'), error);
  }
}

export async function run() {
  const banner = boxen(chalk.cyan('TypeScript Project Generator'), {
    padding: 1,
    margin: 1,
    borderColor: 'cyan',
    textAlignment: 'center',
  });

  console.log(banner);

  try {
    const options = await promptForProjectDetails();
    await createProjectStructure(options);
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
    process.exit(1);
  }
}
