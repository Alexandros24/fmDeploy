/**
 * This script is used to deploy the widget to FileMaker.
 * It uploads the index.html file to the specified FileMaker server.
 * Use the npm run build:deploy command to run this script.
 * The Web Widgets database table must have the following fields:
 * - html: Text field to store the HTML content of the widget
 * - name: Text field to store the name of the widget (This field need to be unique and not empty)
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import readline from 'readline';
import path from 'path';

// Create readline interface
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Read the built index.html file
const indexHtml = readFileSync('dist/index.html', 'utf8');

// Get the name of the current directory
const directoryName = path.basename(process.cwd());
// Extract the template name from the directory name
const widgetName = directoryName.replace('fmwidget-', '');

// Function to prompt the user for each parameter
function promptForParameter(parameterName) {
	return new Promise((resolve, reject) => {
		rl.question(`Enter ${parameterName}: `, (answer) => {
			resolve(answer);
		});
	});
}

// Function to prompt the user for all parameters
async function promptForParameters() {
    const filePath = path.join(__dirname, 'parameters.json');
    let parameters = {};

    if (existsSync(filePath)) {
        const rawData = readFileSync(filePath);
        parameters = JSON.parse(rawData);
    }

    const fmServer = parameters.fmServer || await promptForParameter('FileMaker Server');
    const fmFile = parameters.fmFile || await promptForParameter('FileMaker File');
    const fmTable = parameters.fmTable || await promptForParameter('FileMaker Table');
    const usr = parameters.usr || await promptForParameter('FileMaker Username');
    const pwd = parameters.pwd || await promptForParameter('FileMaker Password');

    const newParameters = { fmServer, fmFile, fmTable, usr, pwd };
    writeFileSync(filePath, JSON.stringify(newParameters));

    return newParameters;
}

// Get parameters from user input
console.log('\x1b[34m%s\x1b[0m', `Please enter the following parameters to deploy the widget with name '${widgetName}' to FileMaker:`);
promptForParameters()
	.then(params => {
		if (!params.fmServer.startsWith('https://'))
  			params.fmServer = 'https://' + params.fmServer;
		
		// Define the OData endpoint
		const odataEndpoint = `${params.fmServer}/fmi/odata/v4/${params.fmFile}/${params.fmTable}`;

		// Define the data to be uploaded
		const data = {
			'html': indexHtml // Replace 'htmlContent' with your field name
		};

		// Define the headers for the request
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': `Basic ${Buffer.from(`${params.usr}:${params.pwd}`).toString('base64')}`
		};

		const fmUrl = `${odataEndpoint}('${params.widgetName}')`;

		// Try to update the record first
		const patchUrl = fmUrl;
		const patchOptions = {
			method: 'PATCH',
			headers: headers,
			body: JSON.stringify(data)
		};

		// Make the PATCH request
		return fetch(patchUrl, patchOptions)
			.then(response => {
				// If the response is OK, parse it as JSON
				return response.json();
			})
			.then(data => {
				console.log('\x1b[32m%s\x1b[0m', 'Successfully uploaded the index.html file to the FileMaker server.');
			})
			.catch(error => {
				console.error('\x1b[31m%s\x1b[0m', 'An error occurred while uploading the index.html file to the FileMaker server:', error);
			});
	})
	.catch(error => {
		console.error('\x1b[31m%s\x1b[0m', 'Error:', error);
	})
	.finally(() => {
		// Close readline interface
		rl.close();
	});
