#! /usr/bin/env node

require('babel-polyfill')

var spawn = require('child_process').spawn,
	chalk = require('chalk'),
	figlet = require('figlet'),
	program = require('commander'),
	Promise = require("bluebird"),
	fs = Promise.promisifyAll(require('fs-extra')),
	path = require('path'),
	rootDir = path.resolve(__dirname, '..'),
	clear = require("cli-clear"),
	projectName = ''

// Clear the screen
clear()

// Show the startup banner
console.log(
	chalk.magenta(
		figlet.textSync('Reactatouille', { horizontalLayout: 'full' })
	),
	chalk.yellow.bold('\n' + ' ' + 'Boilerplate CLI'),
	chalk.yellow('by Punkbit'),
	'\n',
	'\n'
)

// Set command line program parameters
program
	.version(require('../package.json').version)
	.usage('[project name]')
	.parse(process.argv);

// Set the name
projectName = program.args[0]

// Show help if user did not provide a project name
if (!projectName) {

	program.help()

} else {

	//
	fs.copyAsync(rootDir + '/template', projectName, { clobber: true })
		.then(function (err) {

			// Show the initialisation text, white space added to text align
			console.log(chalk.blue(' ' + 'Creating the project directory `' + projectName + '`...'))
			console.log('\n')

			if (err) {

				return console.error(chalk.red.bold(err))

			} else {

				console.log(chalk.green(' ' + 'Success! Your project boilerplate is ready!'))
				console.log(chalk.yellow(' ' + 'Remember to `cd ' + projectName + '` and run the `npm install`'))
				console.log(chalk.yellow(' ' + 'Also there, you will find the boilerplate README file containing instructions to run the server, build, etc.'))
				console.log(chalk.green(' ' + 'Happy coding yo!'))
				console.log('\n')

			}

		})

}
