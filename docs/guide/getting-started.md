# Getting Started

`create-mexn-app` is a modern CLI tool to quickly generate an Express & MongoDB application, saving you the hassle of setting up configurations over and over.

## Installation & Usage

You can use `npx` to run the tool without installing it globally:

```bash
npx create-mexn-app my-new-api
```

If you prefer, install it globally:

```bash
npm install -g create-mexn-app
create-mexn-app my-new-api
```

## Interactive Prompts

By default, the CLI will ask you a series of questions:

1. **Template**: Choose between TypeScript, ECMAScript (ESM), and CommonJS.
2. **Swagger Docs**: Choose whether to automatically inject `swagger-autogen` for automated API documentation.
3. **Git Initialization**: Choose if you want a fresh git repo and an initial commit.
4. **Package Manager**: Choose npm, yarn, pnpm, or bun.

## Non-Interactive Mode (Flags)

For automation or CI/CD, you can bypass the prompts by using flags:

```bash
npx create-mexn-app my-app -t ts -p bun --yes --swagger
```

### Options

| Flag                    | Description                             |
| ----------------------- | --------------------------------------- |
| `-t, --template`        | Specify `cjs`, `esm`, or `ts`           |
| `-p, --package-manager` | Specify `npm`, `yarn`, `pnpm`, or `bun` |
| `-y, --yes`             | Accept all default choices              |
| `--skip-install`        | Skip dependency installation            |
| `--no-git`              | Skip git repository initialization      |
| `--swagger`             | Automatically inject swagger autogen    |
