var config = require('./config');
var environments = ['staging', 'production'];
var args = require('yargs').argv;

// Ensure correct context before importing anything else (config file(s), etc)
if (args.env && environments.indexOf(args.env) > -1) {
	process.env.NODE_ENV = args.env;
} else {
	process.env.NODE_ENV = 'development';
}

var gulp = require('gulp'),
	webpack = require("webpack"),
	webpackDevServer = require("webpack-dev-server"),
	webpackDevConfig = require("./webpack.dev.config.js"),
	webpackStagingConfig = require("./webpack.staging.config.js"),
	webpackProductionConfig = require("./webpack.production.config.js"),
	gutil = require('gulp-util'),
	babel = require('babel-core/register'),
	mocha = require('gulp-mocha'),
	spawn = require('child_process').spawn,
	port = config.defaultDevPort,
	open = require('open'),
	git = require('gulp-git'),
	chalk = require('chalk'),
	figlet = require('figlet'),
	clean = require('gulp-clean'),
	nullCompiler = require('./nullCompiler');

function getDistributionDir() {
	var baseDir = 'dist';
	return baseDir + '/' + process.env.NODE_ENV;
}

gulp.task('html', function () {
    return gulp.src('src/index.html')
				.pipe(gulp.dest(getDistributionDir()));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
				.pipe(gulp.dest(getDistributionDir() + '/images'));
});

// the tasks html and images exist in the `_build-env` to avoid running
// in parallel with the `clean` task
gulp.task("build", ["test", "clean"], function () {
	switch(process.env.NODE_ENV) {
		case 'production':
			gulp.start('_build-production');
		break;
		case 'staging':
			gulp.start('_build-staging');
		break;
		default:
			console.log('Please provide the environment argument!')
	}
});

gulp.task("_build-staging", ["html", "images"], function (cb) {
    // run webpack
    webpack(webpackStagingConfig, function (err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack:errors]", stats.compilation.errors.toString({
			colors: true
		}));
		gutil.log("[webpack:warnings]", stats.compilation.warnings.toString({
			colors: true
		}));
		console.log('webpack compile success.');
		cb(err); // this does not gulp exit for some reason
    });
});
gulp.task("_build-production", ["html", "images"], function (cb) {
    // run webpack
    webpack(webpackProductionConfig, function (err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack:errors]", stats.compilation.errors.toString({
			colors: true
		}));
		gutil.log("[webpack:warnings]", stats.compilation.warnings.toString({
			colors: true
		}));
		console.log('webpack compile success.');
		cb(err); // this does not gulp exit for some reason
    });
});

// todo: decide if called push or remote
// so far I decided to call it deploy (because the boilerplate, hopes the dev
// sitcks with a PaaS / Heroku kind of)
gulp.task('deploy', function(){
	config.git.remoteList.forEach(function (v, k) {
		git.push(v, ['master'], null, function (err) {
			if (err) throw err;
		});
	});
});

gulp.task('unit_test', function (cb) {
	gulp.src('./test/unit_tests/**/*.spec.js', { read: false })
		.pipe(mocha({
			compilers: {
				js: babel
			}
		}))
		.once('error', function (err) {
			cb(err);
		})
		.once('end', function () {
			cb();
		});
});

gulp.task('test', ['unit_test']);

gulp.task('watch', function () {
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('./src/js/**/*.js', ['test']);
	gulp.watch('./src/images/**/*', ['images'])
});

gulp.task('node-server', function (cb) {
	var cmd = spawn('node', ['server.js'], { stdio: 'inherit' });
	cmd.on('close', function (code) {
		console.log('my-task exited with code ' + code);
		cb(code);
	});
});

gulp.task('preview', function (cb) {

	var n = (['production', 'staging'].indexOf(process.argv[4]) > -1 && process.argv[4]) || false;

	if (n) {
		process.env.NODE_ENV = n;

		var cmd = spawn('node', ['server.js'], { stdio: 'inherit' });

		cmd.on('close', function (code) {
			console.log('my-task exited with code ' + code);
			cb(code);
		});

		setTimeout(function () {
			open('http://localhost:' + port, function (err) {
				if (err) throw err;
			});
		}, 1800);

	} else {
		console.log('Error: use the command `gulp preview --env [ENVIRONMENT]` to preview!')
	}


});

gulp.task('banner', function () {
	spawn('clear', [null], { stdio: 'inherit' });
	console.log(
		chalk.magenta(
			figlet.textSync('Reactatouille', { horizontalLayout: 'full' })
		),
		chalk.yellow.bold('\n' + ' ' + 'Boilerplate'),
		chalk.yellow('by Punkbit'),
		'\n',
		'\n'
	);
});

gulp.task('clean', function () {
	// returns a promise, so gulp will know when complete
	return gulp.src(getDistributionDir(), { read: false })
			.pipe(clean({force: true}));
});

// exit once all complete (avoid gulp-mocha to hang on complete)
gulp.doneCallback = function (err) {
	process.exit(err ? 1 : 0);
}

gulp.task('default', ['banner', 'node-server', 'watch']);
