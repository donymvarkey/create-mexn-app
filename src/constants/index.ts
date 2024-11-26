export const GIT_TEMPLATE_URL =
  "https://github.com/donymvarkey/nodejs-server-boilerplate.git";

export const APP = {
  name: "create-node-app",
  description: "CLI tool for creating a new Node.js Project",
};

export const getDotEnvContents = (projectName: string): string => {
  return `
PORT=8000 #Define your app port. Defaults to 3000
SIGNATURE=super_secret_signature #Provide a key for signing JWTs
MONGO_URL=mongodb://localhost:27017/${projectName} #Provide the DB URL Defaults to localhost
`;
};
