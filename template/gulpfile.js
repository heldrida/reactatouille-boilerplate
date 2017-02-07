var args = require('yargs').argv;
var clear = require('cli-clear');

if (args.env && ['staging', 'production'].indexOf(args.env) > -1) {
	process.env.NODE_ENV = args.env;
} else {
	process.env.NODE_ENV = 'development';
}

var config = require('./config'),
	gulp = require('gulp'),
	webpack = require("webpack"),
	webpackDevServer = require("webpack-dev-server"),
	webpackDevConfig = require("./webpack.dev.config.js"),
	webpackStagingConfig = require("./webpack.staging.config.js"),
	webpackProductionConfig = require("./webpack.production.config.js"),
	gutil = require('gulp-util'),
	babel = require('babel-core/register'),
	mocha = require('gulp-mocha'),
	spawn = require('child_process').spawn,
	port = 3000,
	open = require('open'),
	git = require('gulp-git'),
	chalk = require('chalk'),
	figlet = require('figlet'),
	clean = require('gulp-clean'),
	nullCompiler = require('./nullCompiler');

function getDistributionDir() {
	var dir = process.env.NODE_ENV === 'production' ? 'dist/production' : 'dist/staging';
	return dir;
}

gulp.task('html', function () {
    return gulp.src('src/index.html')
				.pipe(gulp.dest(getDistributionDir()));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
				.pipe(gulp.dest(getDistributionDir() + '/images'));
});

gulp.task("build", ['clean'], function () {
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

gulp.task("_build-staging", ['test', 'html', 'images'], function (cb) {
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
		cb(err);
    });
});
gulp.task("_build-production", ['test', 'html', 'images'], function (cb) {
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
		cb(err);
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
		.once('end', function () {
			cb();
		});
});

gulp.task('test', ['unit_test']);

gulp.task('openBrowser', function () {
  open('http://localhost:' + port, function (err) {
  	if (err) throw err;
  });
});

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

});

gulp.task('banner', function () {
	clear();
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
	return gulp.src(getDistributionDir(), { read: false })
			.pipe(clean({force: true}));
});

gulp.doneCallback = function (err) {
	process.exit(err ? 1 : 0);
}

gulp.task('default', ['banner', 'node-server', 'watch']);
