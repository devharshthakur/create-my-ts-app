export const PRETTIER_CONFIG = `// prettier.config.mjs
export default {
    semi: true, // Use semicolons at the end of statements
    singleQuote: true, // Use single quotes instead of double quotes
    trailingComma: 'es5', // Trailing commas where valid in ES5 (objects, arrays, etc.)
    tabWidth: 2, // Number of spaces per indentation level
    printWidth: 80, // Specify the line length that the printer will wrap on
    bracketSpacing: true, // Print spaces between brackets in object literals
    arrowParens: 'avoid', // Avoid parentheses when possible for arrow functions
    endOfLine: 'lf', // Enforce linefeed (LF) as the end of line character
    htmlWhitespaceSensitivity: 'ignore', // Ignore whitespace sensitivity in HTML
    quoteProps: 'as-needed', // Only add quotes around object properties when required
    jsxSingleQuote: true, // Use single quotes in JSX
    embeddedLanguageFormatting: 'auto', // Format embedded code (e.g., inside markdown)
};
`;

export const TSCONFIG_JSON = `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "declaration": true,
    "sourceMap": true,
    "rootDir": "."
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules", "dist"]
}`;

export const APP_TS = `// app.ts - Main application logic
export function App():void {
  /** Your main code*/
  console.log("Code is running successfully");
}
`;

export const MAIN_TS = `// main.ts - Entry point
import { App } from './app.js';

function main() {
  App();
}

main();
`;

export const UTILS_INDEX_TS = `// utils/index.ts
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));
`;

export const LIB_INDEX_TS = `// lib/index.ts
export class Library {
  public process(data: any): any {
    return data;
  }
}
`;
