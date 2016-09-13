var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	webpack = require("webpack"),
	webpackDevServer = require("webpack-dev-server"),
	webpackDevConfig = require("./webpack.dev.config.js"),
	webpackProductionConfig = require("./webpack.production.config.js"),
	gutil = require('gulp-util'),
	babel = require('babel-core/register'),
	mocha = require('gulp-mocha');


gulp.task('html', function () {
    return gulp.src('src/index.html')
				.pipe(gulp.dest('dist'));
});

gulp.task("webpack:server", function(callback) {

	// modify some webpack config options
	var myConfig = Object.create(webpackDevConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	var server = new webpackDevServer(webpack(myConfig), {
		//noInfo: true,
		//watch: true,
		historyApiFallback: true,
		contentBase: './dist',
		hot: true,
		progress: true,
		open: true,
		stats: {
			colors: true
		}
	});

	server.listen(3000, "0.0.0.0", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:3000");
	});

});

gulp.task("build", ['html', 'test'], function () {
    // run webpack
    webpack(webpackProductionConfig, function (err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
    });
});

gulp.task('test', function () {
	return gulp.src('./test/**/*.spec.js', { read: false })
		.pipe(mocha({
			compilers: {
				js: babel
			}
	}));
});

gulp.task('watch', function () {
	gulp.watch('./src/index.html', ['html']);
	gulp.watch('.src/js/**/*.js', ['test']);
});

gulp.task('dev', ['default']);

gulp.task('default', ['webpack:server', 'watch']);