import inquirer from 'inquirer';

export interface ProjectOptions {
  projectName: string;
  includeUtils: boolean;
  includeLib: boolean;
}

export async function promptForProjectDetails(): Promise<ProjectOptions> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is the name of your project?',
      default: 'ts-project',
      validate: (input: string) => {
        if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
        return 'Project name may only include letters, numbers, hyphens, and underscores';
      },
    },
    {
      type: 'list',
      name: 'includeUtils',
      message: 'Include utils directory?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
    },
    {
      type: 'list',
      name: 'includeLib',
      message: 'Include lib directory?',
      choices: [
        { name: 'Yes', value: true },
        { name: 'No', value: false },
      ],
    },
  ]);

  return answers as ProjectOptions;
}
