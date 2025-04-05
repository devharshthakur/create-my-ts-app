<h1 align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="30" height="30" alt="TypeScript">
  create-my-ts-app
</h1>

<p align="center">
  <strong>Generate TypeScript projects with a clean structure in seconds</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ht-create-tsapp"><img src="https://img.shields.io/npm/v/ht-create-tsapp.svg" alt="npm version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>
  <a href="#"><img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript"></a>
  <a href="#"><img src="https://img.shields.io/badge/ESM-Ready-yellow" alt="ESM Ready"></a>
</p>

## ✨ Features

<table>
  <tr>
    <td>
      <h3>🚀 Modern Setup</h3>
      <ul>
        <li>Latest TypeScript configuration</li>
        <li>ES Modules by default</li>
        <li>Type-safe throughout</li>
      </ul>
    </td>
    <td>
      <h3>🛠️ Developer Experience</h3>
      <ul>
        <li>Prettier pre-configured</li>
        <li>Optimized tsconfig.json</li>
        <li>Git repository initialized</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <h3>📦 Package Manager Choice</h3>
      <ul>
        <li>Support for npm, yarn, pnpm or bun</li>
        <li>Automatic dependency installation</li>
      </ul>
    </td>
    <td>
      <h3>📁 Flexible Structure</h3>
      <ul>
        <li>Optional utils directory</li>
        <li>Optional lib directory</li>
        <li>Clean, organized layout</li>
      </ul>
    </td>
  </tr>
</table>

## 🚀 Installation

```bash
# Install globally
npm install -g ht-create-tsapp

# Or use directly with npx
npx ht-create-tsapp
```

## 📋 Usage

Simply run the command and follow the interactive prompts:

```bash
ht-create-tsapp
```

<details>
<summary><strong>🔍 Interactive prompts guide</strong></summary>

The CLI will guide you through the setup process:

1. **Project name** - Name for your TypeScript project
2. **Utils directory** - Whether to include utility functions
3. **Lib directory** - Whether to include library modules
4. **Package manager** - Choose from npm, yarn, pnpm, or bun

</details>

## 📂 Project Structure

Your generated project will have the following structure:

<pre>
<code>your-project-name/
├── <span style="color:#3498db">dist/</span>               <span style="color:#7f8c8d"># Compiled JavaScript files</span>
├── <span style="color:#3498db">scripts/</span>            <span style="color:#7f8c8d"># Script files</span>
├── <span style="color:#3498db">lib/</span>                <span style="color:#7f8c8d"># (Optional) Library modules</span>
├── <span style="color:#3498db">utils/</span>              <span style="color:#7f8c8d"># (Optional) Utility functions</span>
├── <span style="color:#e67e22">main.ts</span>             <span style="color:#7f8c8d"># Entry point</span>
├── <span style="color:#e67e22">package.json</span>        <span style="color:#7f8c8d"># Project dependencies and scripts</span>
├── <span style="color:#e67e22">tsconfig.json</span>       <span style="color:#7f8c8d"># TypeScript configuration</span>
├── <span style="color:#e67e22">prettier.config.mjs</span> <span style="color:#7f8c8d"># Prettier configuration</span>
└── <span style="color:#e67e22">.gitignore</span>          <span style="color:#7f8c8d"># Git ignore rules</span>
</code>
</pre>

## 📜 Available Scripts

Your generated project includes these npm scripts:

| Script | Description |
|--------|-------------|
| `dev` | Runs TypeScript compiler in watch mode |
| `build` | Compiles TypeScript to JavaScript |
| `format` | Formats code with Prettier |
| `start` | Builds and runs the compiled application |

> **Note:** The script commands will automatically use your selected package manager.

## 🌱 Getting Started After Installation

```bash
# Navigate to your project directory
cd your-project-name

# Start development (with your chosen package manager)
npm run dev  # or yarn dev, pnpm dev, bun dev
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -am 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Harsh Thakur**

## 🙏 Acknowledgements

- [TypeScript](https://www.typescriptlang.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [Chalk](https://github.com/chalk/chalk)
- [Boxen](https://github.com/sindresorhus/boxen)
- [Execa](https://github.com/sindresorhus/execa)

---

<p align="center">
  <sub>Built with ❤️ for TypeScript developers</sub>
</p>
