# Create Node App

A CLI tool to scaffold a new Node.js project from a Git template. It simplifies project initialization, customizes package.json, and sets up a fresh Git repository.

## Features

- Clone a Node.js project boilerplate from a Git repository.
- Update package.json with project-specific details (e.g., name, version, description).
- Automatically initialize a new Git repository.
- Include Prettier and ESLint configurations for industry-standard code quality.

## Installation

Install globally using `npm` or `yarn`:

```bash
$ npm install -g create-node-app
```

Or run directly with `npx`:

```bash
$ npx create-node-app
```

## Usage

Command Syntax

```bash
$ create-node-app [project-name] [options]
```

## Options

| Option        | Description                                   |
| :------------ | :-------------------------------------------- |
| -v, --version | Displays the current version of the CLI tool. |
| -h , --help   | Displays help information about the CLI tool. |

## Examples

Create a new project in a directory:

```bash
$ create-node-app my-new-project
```

Use the current directory as the project root:

```bash
$ create-node-app
```

### View CLI version and Help

```bash
$ create-node-app -v
```

```bash
$ create-node-app -h
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
    $ git clone https://github.com/donymvarkey/create-node-app.git
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
    $ create-node-app --help
    ```

### Directory Structure

```plaintext
create-node-app/
├── dist/ # Contains the build of the create-node-app
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
