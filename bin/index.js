#! /usr/bin/env node

require('babel-polyfill')

var spawn = require('child_process').spawn,
	chalk = require('chalk'),
	figlet = require('figlet'),
	program = require('commander')

spawn('clear', [null], { stdio: 'inherit' })

console.log(
	chalk.magenta(
		figlet.textSync('Reacstart', { horizontalLayout: 'full' })
	),
	chalk.yellow.bold('\n' + ' ' + 'Boilerplate CLI'),
	chalk.yellow('by Punkbit'),
	'\n',
	'\n'
)

program
	.version(require('../package.json').version)
	.usage('[options] [project name]')
	.parse(process.argv);

var pname = program.args[0]

if (!pname) {
	program.help();
} else {
	gs(pname);
}