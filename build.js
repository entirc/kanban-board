const shell = require('shelljs')

const successMessage = 'The build folder is ready to be deployed.'
const result = shell.exec('timeout react-scripts build -t 1m')

if (result.stdout.includes(successMessage))
  process.exit(0)
else
  process.exit(result.code)
