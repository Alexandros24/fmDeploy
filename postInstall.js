// postinstall.js
const fs = require('fs');
const path = require('path');

// Define the path to the main package.json file at the root of the project
const packageJsonPath = path.join(__dirname, '..', '..', 'package.json');
const packageJson = require(packageJsonPath);

const relativePath = path.relative(path.join(__dirname, '..', '..'), __dirname);
const fmDeployPath = path.join(relativePath, 'fmDeploy.js');

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['build:deploy'] = `npm run build && node ${fmDeployPath}`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));