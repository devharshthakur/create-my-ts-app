import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import { ProjectOptions, promptForProjectDetails } from './prompts.js';
import { createDirectory, createFile } from '../util/file.js';
import { initializeGit } from '../util/git.js';
import {
  MAIN_TS,
  TSCONFIG_JSON,
  PRETTIER_CONFIG,
  UTILS_INDEX_TS,
  LIB_INDEX_TS,
} from '../config/config.js';

// Get current file's directory with ESM support
const __filename = fileURLToPath(import.meta.url);

interface PackageInfo {
  name: string;
  version: string;
}

/**
 * Fetches the latest version of a package from npm registry
 */
async function getPackageLatestVersion(packageName: string): Promise<string> {
  try {
    const { stdout } = await execa('npm', ['view', packageName, 'version']);
    return `^${stdout.trim()}`;
  } catch (error) {
    console.error(
      chalk.yellow(
        `⚠️ Failed to fetch version for ${packageName}, using latest`
      )
    );
    return 'latest';
  }
}

/**
 * Fetches latest versions for all packages in parallel
 */
async function getPackagesLatestVersions(
  packages: string[]
): Promise<Record<string, string>> {
  console.log(chalk.cyan('📦 Fetching latest package versions...'));

  const packageVersionsPromises = packages.map(
    async (pkg): Promise<PackageInfo> => {
      const version = await getPackageLatestVersion(pkg);
      return { name: pkg, version };
    }
  );

  const packageVersions = await Promise.all(packageVersionsPromises);

  return packageVersions.reduce<Record<string, string>>(
    (acc, { name, version }) => {
      acc[name] = version;
      return acc;
    },
    {}
  );
}

async function createPackageJson(projectPath: string, projectName: string) {
  // List of development dependencies to fetch versions for
  const devDependencies = ['@types/node', 'typescript', 'prettier'];

  // Fetch latest versions for all packages
  const devDependenciesWithVersions =
    await getPackagesLatestVersions(devDependencies);

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
      start: 'tsc && node dist/main.js',
    },
    keywords: ['typescript', 'cli'],
    author: '',
    license: 'MIT',
    devDependencies: devDependenciesWithVersions,
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

    // Install dependencies using selected package manager
    console.log(
      chalk.cyan(
        `\n📦 Installing dependencies using ${options.packageManager}...`
      )
    );

    try {
      const installCommand = 'install';
      await execa(options.packageManager, [installCommand], {
        cwd: projectPath,
        stdio: 'inherit',
      });
      console.log(chalk.green('✅ Dependencies installed successfully!'));
    } catch (error) {
      console.error(
        chalk.yellow(
          `⚠️ Failed to install dependencies with ${options.packageManager}.`
        )
      );
      console.error(
        chalk.yellow('Please run the install command manually after setup.')
      );
    }

    const packageManagerCommands = {
      npm: { install: 'npm install', dev: 'npm run dev' },
      yarn: { install: 'yarn install', dev: 'yarn dev' },
      pnpm: { install: 'pnpm install', dev: 'pnpm dev' },
      bun: { install: 'bun install', dev: 'bun dev' },
    };

    const successMessage = boxen(
      `${chalk.green.bold(`✨ Project "${options.projectName}" created successfully!`)}\n\n` +
        `${chalk.cyan.bold('📂 Project structure:')}\n` +
        `${chalk.white(`  ${options.projectName}/`)}\n` +
        `${chalk.white(`  ├─ main.ts          ${chalk.gray('→ Entry point')}`)}\n` +
        (options.includeUtils
          ? `${chalk.white(`  ├─ utils/           ${chalk.gray('→ Utility functions')}`)}\n`
          : '') +
        (options.includeLib
          ? `${chalk.white(`  ├─ lib/             ${chalk.gray('→ Library modules')}`)}\n`
          : '') +
        `${chalk.white(`  ├─ tsconfig.json    ${chalk.gray('→ TypeScript config')}`)}\n` +
        `${chalk.white(`  └─ package.json     ${chalk.gray('→ Project metadata')}`)}\n\n` +
        `${chalk.cyan.bold('🚀 Next steps:')}\n` +
        `${chalk.white(`  cd ${options.projectName}`)}\n` +
        (packageManagerCommands[options.packageManager].install !==
        packageManagerCommands[options.packageManager].dev
          ? `${chalk.white(`  ${packageManagerCommands[options.packageManager].dev}`)}\n`
          : `${chalk.white(`  ${packageManagerCommands[options.packageManager].dev}`)}\n`),
      {
        padding: 1,
        margin: 1,
        borderColor: 'green',
        title: '🎉 Success',
        titleAlignment: 'center',
      }
    );

    console.log(successMessage);
  } catch (error) {
    console.error(chalk.red('❌ Failed to create project structure:'), error);
  }
}

export async function run(): Promise<void> {
  const banner = boxen(chalk.cyan.bold('✨ TypeScript Project Generator ✨'), {
    padding: 1,
    margin: 1,
    borderColor: 'cyan',
    textAlignment: 'center',
    borderStyle: 'round',
  });

  console.log(banner);

  try {
    const options = await promptForProjectDetails();
    await createProjectStructure(options);
  } catch (error) {
    console.error(chalk.red('❌ An error occurred:'), error);
    process.exit(1);
  }
}
