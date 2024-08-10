// postinstall.js
import { writeFileSync, readFileSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the main package.json file at the root of the project
const packageJsonPath = join(__dirname, '..', '..', '..', 'package.json');

// Read and parse the package.json file
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const relativePath = relative(join(__dirname, '..', '..', '..'), __dirname);

const fmDeployPath = join(relativePath, 'fmDeploy.js');
const clearParamsPath = join(relativePath, 'clearParams.js');

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['fmdeploy:build'] = `npm run build && node ${fmDeployPath}`;
packageJson.scripts['fmdeploy:clearParams'] = `node ${clearParamsPath}`;

writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));