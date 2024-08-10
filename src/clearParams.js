import { unlinkSync, existsSync } from 'fs';
import { getPaths } from './filePath.js';

const { filePath } = getPaths();

if (existsSync(filePath)) {
    unlinkSync(filePath);
    console.log('\x1b[32m%s\x1b[0m', 'Successfully cleared the parameters.json file.');
} else {
    console.log('\x1b[33m%s\x1b[0m', 'parameters.json file does not exist.');
}