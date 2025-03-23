import { run } from '../scripts/project.js';

function runCLI(): void {
  try {
    run();
  } catch (error) {
    const err = error as Error;
    console.error(`Error running the command: ${err.message}`);
    process.exit(1);
  }
}

export default runCLI;
