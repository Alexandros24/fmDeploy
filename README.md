# FM Deploy

FM Deploy is a npm module that deploys a FileMaker web widget to a FileMaker Pro file using both OData and the FileMaker Data API.

## Installation

To install the module, add it to your project using npm:

```npm install fmdeploy```

## Usage
After installation, the **build:deploy** script is added to your package.json file by the postInstall.js script. This script deploys the widget to the specified FileMaker server.

The parameters for the FileMaker server are stored in a parameters.json file in the same directory as the fmDeploy.js script. If this file exists, the script will use the parameters from the file. If not, it will prompt the user for the parameters.

The parameters are:

* FileMaker Server
* FileMaker File
* FileMaker Table
* FileMaker Username
* FileMaker Password

To run the script, use the **build:deploy** npm script:

```npm run build:deploy```


## Contributing
If you want to contribute to this project, please submit a pull request.

## License
This project is licensed under the MIT License.