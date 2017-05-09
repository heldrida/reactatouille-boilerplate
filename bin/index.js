#! /usr/bin/env node

require('babel-polyfill')

var chalk = require('chalk')
var figlet = require('figlet')
var program = require('commander')
var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs-extra'))
var path = require('path')
var rootDir = path.resolve(__dirname, '..')
var clear = require('cli-clear')
var version = require('../package.json').version

// Set options
program
  .version(version)
  .option('-n, --new-project <Name...>', 'New project', createNewProject)
  .option('-c, --create-component <Name...>', 'Create Component', createNewComponent)
  .parse(process.argv)

// Default to createNewProject fn
if (program.args.length > 0) {
  var projectName = program.args[0]
  if (projectName) {
    // Clear the screen
    clear()
    // Show initial screen
    startScreen()
    // Create the project
    createNewProject(projectName)
  }
}

function startScreen () {
  // Show the startup banner
  console.log(
    chalk.magenta(
      figlet.textSync('Reactatouille', { horizontalLayout: 'full' })
    ),
    chalk.yellow.bold('\n' + ' ' + 'Boilerplate CLI' + ' ' + 'v' + version),
    chalk.yellow('by Punkbit'),
    '\n',
    '\n'
  )
}

function createNewProject (projectName) {
  // Show help if user did not provide a project name
  if (!projectName) {
    program.help()
  } else {
    //
    fs.copyAsync(rootDir + '/template', projectName, { clobber: true })
      .then(function (err) {
        // Show the initialization text, white space added to text align
        console.log(chalk.blue(' ' + 'Creating the project directory `' + projectName + '`...'))
        console.log('\n')

        if (err) {
          return console.error(chalk.red.bold(err))
        } else {
          console.log(chalk.green(' ' + 'Success! Your project boilerplate is ready!'))
          console.log(chalk.yellow(' ' + 'Remember to `cd ' + projectName + '` and run the `npm install`'))
          console.log(chalk.yellow(' ' + 'There, you\'ll find the boilerplate README file containing instructions to run the server, build, etc.'))
          console.log(chalk.green(' ' + 'Happy coding yo!'))
          console.log('\n')
        }
      })
  }
}

function createNewComponent (name) {
  console.log('TODO: createNewComponent')
}
