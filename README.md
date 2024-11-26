# Create Mexn App [![npm version](https://img.shields.io/npm/v/create-mexn-app.svg)](https://www.npmjs.com/package/create-node-app)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

A CLI tool to scaffold a new Node.js+Express+MongoDB project from a Git template. It simplifies project initialization, customizes package.json, and sets up a fresh Git repository. Inspired from create-react-app

## Features

- Clone a Node.js project boilerplate from a Git repository.
- Update package.json with project-specific details (e.g., name, version, description).
- Automatically initialize a new Git repository.
- Include Prettier and ESLint configurations for industry-standard code quality.

## Installation

Install globally using `npm` or `yarn`:

```bash
$ npm install -g create-mexn-app
```

Or run directly with `npx`:

```bash
$ npx create-mexn-app
```

## Usage

Command Syntax

```bash
$ create-mexn-app [project-name] [options]
```

## Options

| Option        | Description                                   |
| :------------ | :-------------------------------------------- |
| -v, --version | Displays the current version of the CLI tool. |
| -h , --help   | Displays help information about the CLI tool. |

## Examples

Create a new project in a directory:

```bash
$ create-mexn-app my-new-project
```

Use the current directory as the project root:

```bash
$ create-mexn-app
```

### View CLI version and Help

```bash
$ create-mexn-app -v
```

```bash
$ create-mexn-app -h
```

### Features Breakdown

1.  #### Clone template from remote repository
    The CLI tool clones the provided template repository into the specified project directory. It uses `simple-git` for reliable Git operations.
2.  #### Update package.json
    The tool customizes the package.json file of the cloned template:
    - Updates the name, version, and description fields.
3.  #### Fresh Git Initialization
    After cloning:
    - Removes the existing .git folder from the template.
    - Initializes a new Git repository.
    - Creates an initial commit for the scaffolded code.
4.  #### Prettier and ESLint Setup

        The tool ensures your project starts with:

        - Prettier for code formatting.

        - ESLint for identifying syntax and style issues.
        - husky precommit hook.

### Requirements

- Node.js 16.0.0 or higher.
- Git installed on your machine.

### Development

### Setup for Local Development

1.  Clone this repository:

    ```bash
    $ git clone https://github.com/donymvarkey/create-mexn-app.git
    ```

2.  Install dependencies:

    ```bash
    $ npm install
    ```

3.  Link the CLI tool locally:

    ```bash
    $ npm link
    ```

4.  Test the CLI:
    ```bash
    $ create-mexn-app --help
    ```

### Directory Structure

```plaintext
create-mexn-app/
├── dist/ # Contains the build of the create-mexn-app
├── src/
│ ├── constants/
| | ├── index.ts # Constants used in the project
│ ├── utils/
│ │ ├── directoryOps.ts # Directory related operations
│ │ ├── displayAsciArt.ts # Methods to display the ASCII art for the cli
│ │ ├── gitOps.ts # Git related operations
│ │ ├── packageOps.ts # Package.json handling
│ │ └── utils.ts # Other utility functions
│ ├── cli.ts # Entry point for the CLI
│ ├── version.ts # Version handling for the cli
│ └── utils.ts # Reusable utility functions
├── .gitignore # Gitignore file
├── tsconfig.json # typescript config
├── package-lock.json # lock file
├── package.json # Project metadata
└── README.md # Documentation
```

### Available Scripts

1. Lint Code:
   ```bash
    $ npm run lint
   ```
2. Build:
   ```bash
   $ npm run build
   ```
3. Run Locally:
   ```bash
   $ npm start
   ```

### License

This project is licensed under the MIT License.
