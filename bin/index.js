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
  var originDir = rootDir + '/template/src/js/example'
  var distDir = findJsPath(name) // find the path for the user
  if (distDir) {
    fs.copyAsync(originDir, distDir, { clobber: true })
      .then(function (err) {
          // Show the initialization text, white space added to text align
        console.log(chalk.blue(' ' + 'Creating the React component directory `' + name + '`...'))
        console.log('\n')
        if (err) {
          return console.error(chalk.red.bold(err))
        } else {
          console.log(chalk.green(' ' + 'The component was created successfully!'))
          console.log(chalk.yellow(' ' + 'This is a work in progress, so meanwhile you have to add the component to `root/src/js/rootReducer.js`'))
          console.log(chalk.yellow(' ' + 'and also modify the name in the `root/src/js/[component]/constants.js`, etc. My apologies!'))
          console.log(chalk.green(' ' + 'Thank you!'))
          console.log('\n')
        }
      })
  } else {
    console.log(chalk.red('Oops! Are you in a Reactatouille Project root, source or js directory?'))
    console.log('\n')
  }
}

function findJsPath (name) {
  // Known directories
  var cwd = path.resolve('./')
  var parentDir = path.resolve('../')
  var listCwd = getDirectoryFileList(cwd)
  var listParent = getDirectoryFileList(parentDir)

  // User may be in the project [ROOT]
  if (isDir(listCwd, validateRootDir)) {
    return path.resolve('./src/js' + '/' + name)
  }

  // User may be in the dir [root/src]
  if (isDir(listParent, validateSrcDir)) {
    return path.resolve('./js' + '/' + name)
  }

  // Use may be in the dir [root/src/js]
  if (isDir(listCwd, validateJsDir)) {
    return path.resolve('./' + name)
  }
}

function getDirectoryFileList (srcpath) {
  return fs.readdirSync(srcpath)
    .filter(file => fs.lstatSync(path.join(srcpath, file)))
}

function isDir (ls, cb) {
  return typeof cb === 'function' && cb(ls)
}

function validateRootDir (ls) {
  try {
    var pkg = require(path.resolve('./') + '/package.json') || {}
    var devDependencies = JSON.stringify(pkg.devDependencies).toLowerCase()
    return ls.indexOf('src') > -1 &&
            ls.indexOf('server.dev.js') > -1 &&
            ls.indexOf('webpack.dev.config.js') > -1 &&
            devDependencies.indexOf('react') > -1 &&
            devDependencies.indexOf('reactatouille') > -1
  } catch (e) {
    return false
  }
}

function validateSrcDir (ls) {
  try {
    var pkg = require(path.resolve('../') + '/package.json') || {}
    var devDependencies = JSON.stringify(pkg.devDependencies).toLowerCase()
    var cwd = path.resolve('./')
    var listCwd = getDirectoryFileList(cwd)
    return ls.indexOf('src') > -1 &&
            ls.indexOf('server.dev.js') > -1 &&
            ls.indexOf('webpack.dev.config.js') > -1 &&
            listCwd.indexOf('js') > -1 &&
            listCwd.indexOf('index.ejs') > -1 &&
            devDependencies.indexOf('react') > -1 &&
            devDependencies.indexOf('reactatouille') > -1
  } catch (e) {
    return false
  }
}

function validateJsDir (ls) {
  try {
    var pkg = require(path.resolve('../../') + '/package.json') || {}
    var devDependencies = JSON.stringify(pkg.devDependencies).toLowerCase()
    return ls.indexOf('index.js') > -1 &&
            ls.indexOf('root.js') > -1 &&
            ls.indexOf('routes.js') > -1 &&
            devDependencies.indexOf('react') > -1 &&
            devDependencies.indexOf('reactatouille') > -1
  } catch (e) {
    return false
  }
}
