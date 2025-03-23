# 📦 ht-create-tsapp

A powerful CLI tool for scaffolding TypeScript projects with a predefined structure. Get your next TypeScript project up and running in seconds!

[![npm version](https://img.shields.io/npm/v/ht-create-tsapp.svg)](https://www.npmjs.com/package/ht-create-tsapp)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Features

- 🚀 Quick project setup with best practices
- 📁 Customizable directory structure
- 🔧 Pre-configured TypeScript and Prettier settings
- 🧩 Optional utilities and libraries
- 🧪 Modern ES Modules setup

## 🚀 Installation

You can install globally:

```bash
npm install -g ht-create-tsapp
```

Or use it directly with npx:

```bash
npx ht-create-tsapp
```

## 📋 Usage

Run the command and follow the interactive prompts:

```bash
ht-create-tsapp
```

The CLI will guide you through setting up your project by asking for:

- 📝 Project name
- 🔧 Whether to include a utils directory
- 📚 Whether to include a lib directory

## 📂 Generated Project Structure

Depending on your choices, your project will have the following structure:

```
your-project-name/
├── dist/               # Compiled JavaScript files
├── scripts/            # Script files
├── lib/                # (Optional) Library files
├── utils/              # (Optional) Utility functions
├── app.ts              # Main application logic
├── main.ts             # Entry point
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── prettier.config.mjs # Prettier configuration
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## 🛠️ Project Configuration

## 📜 Available Scripts

Your generated project will include these npm scripts:

| Script | Description |
|--------|-------------|
| `npm run dev` | Runs TypeScript compiler in watch mode |
| `npm run build` | Compiles TypeScript to JavaScript |
| `npm run format` | Formats code with Prettier |
| `npm start` | Runs the compiled application |

## 🌱 Getting Started After Installation

After creating your project, you can get started with:

```bash
# Navigate to your project directory
cd your-project-name

# Install dependencies
npm install

# Start development
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👤 Author

**Harsh Thakur**

## 🙏 Acknowledgements

- [TypeScript](https://www.typescriptlang.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [Chalk](https://github.com/chalk/chalk)
- [Boxen](https://github.com/sindresorhus/boxen)

---

<p align="center">Made with ❤️ for TypeScript developers</p>
