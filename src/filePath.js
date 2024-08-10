import { homedir } from 'os';
import path from 'path';

export function getPaths() {
	const homeDir = homedir();
	const dirPath = path.join(homeDir, '.npm', '.fmDeploy');
	const filePath = path.join(dirPath, 'parameters.json');
	return { dirPath, filePath };
}

