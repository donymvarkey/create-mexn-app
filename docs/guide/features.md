# Features

`create-mexn-app` provides a battery-included experience without being overly opinionated.

### 1. Robust Templates

Templates are maintained externally to keep the CLI lightweight. Each template provides:

- **Express 4.x** with robust middleware (`helmet`, `cors`, `morgan`, `rate-limiter`).
- **Mongoose** integrated cleanly.
- Security best practices (`xss-clean`, `express-mongo-sanitize`).
- **Zod** for schema validation.
- Standardized error handling mechanism.

### 2. Swagger Automation

If you select the Swagger option during setup, the CLI will:

1. Inject `swagger-ui-express` into `dependencies` and `swagger-autogen` into `devDependencies`.
2. Generate a `swagger.ts` or `swagger.js` configuration file automatically targeting your primary routes.
3. Inject a `npm run swagger` script into your `package.json`.

### 3. Smart Git Initialization

The CLI completely clears the `.git` directory coming from the remote boilerplate and cleanly runs `git init -b main`. It also interacts safely with target directories—warning you and offering the choice to cleanly overwrite existing paths without destroying their existing git histories!

### 4. Lightning Fast

Powered by `giget`, it pulls template tarballs without requiring full git history downloads, meaning project setup is virtually instantaneous.
