// postinstall.js
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

const relativePath = path.relative(process.cwd(), __dirname);
const fmDeployPath = path.join(relativePath, 'fmDeploy.js');

packageJson.scripts = packageJson.scripts || {};
packageJson.scripts['build:deploy'] = `npm run build && node ${fmDeployPath}`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));