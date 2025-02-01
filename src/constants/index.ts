export const GIT_TEMPLATE_URL = 'github:donymvarkey/create-mexn-app-templates';

export const APP = {
  name: 'create-mexn-app',
  description: 'A CLI tool to scaffold a new MongoDB-Express-Node app',
};

export const getDotEnvContents = (projectName: string): string => {
  return `
PORT=8000 #Define your app port. Defaults to 3000
SIGNATURE=super_secret_signature #Provide a key for signing JWTs
MONGO_URL=mongodb://localhost:27017/${projectName} #Provide the DB URL Defaults to localhost
`;
};

const TEMPLATES = {
  CommonJS: 'cjs',
  ESModules: 'esm-js',
  Typescript: 'esm-ts',
};

type TemplateOptions = keyof typeof TEMPLATES;

export const getTemplateRepo = (option: TemplateOptions) => {
  return TEMPLATES[option];
};
