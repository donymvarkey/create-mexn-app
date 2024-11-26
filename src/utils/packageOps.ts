import fs from "fs";

/**
 * Updates the package.json file with provided details.
 */
export const updatePackageJson = async (
  packageJsonPath: string,
  projectName?: string
): Promise<void> => {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  if (projectName) {
    packageJson.name = projectName.toLowerCase().replace(/\s+/g, "-");
    packageJson.version = "1.0.0";
    packageJson.description = `APIs for ${projectName}`;
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
};
