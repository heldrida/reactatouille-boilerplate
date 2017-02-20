var args = require('yargs').argv
var clear = require('cli-clear')

if (args.env && ['staging', 'production'].indexOf(args.env) > -1) {
  process.env.NODE_ENV = args.env
} else {
  process.env.NODE_ENV = 'development'
}

var config = require('./config')
var gulp = require('gulp')
var webpack = require('webpack')
var webpackStagingConfig = require('./webpack.staging.config.js')
var webpackProductionConfig = require('./webpack.production.config.js')
var gutil = require('gulp-util')
var babel = require('babel-core/register')
var mocha = require('gulp-mocha')
var spawn = require('child_process').spawn
var port = 3000
var open = require('open')
var git = require('gulp-git')
var chalk = require('chalk')
var figlet = require('figlet')
var clean = require('gulp-clean')
var nullCompiler = require('./nullCompiler') // nullCompiler var won't be used (keep require)
var standard = require('gulp-standard')
var rename = require('gulp-rename')

function getDistributionDir () {
  var dir = process.env.NODE_ENV === 'production' ? 'dist/production' : 'dist/staging'
  return dir
}

gulp.task('html', function () {
  return gulp
         .src('src/index.html')
         .pipe(gulp.dest(getDistributionDir()))
})

gulp.task('images', function () {
  return gulp
         .src('src/images/**/*')
         .pipe(gulp.dest(getDistributionDir() + '/images'))
})

gulp.task('build', ['clean', 'server-script-transpiler'], function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      gulp.start('_build-production')
      break
    case 'staging':
      gulp.start('_build-staging')
      break
    default:
      console.log('Please provide the environment argument!')
  }
})

gulp.task('_build-staging', ['test', 'html', 'images'], function (cb) {
  // run webpack
  webpack(webpackStagingConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack:errors]', stats.compilation.errors.toString({
      colors: true
    }))
    gutil.log('[webpack:warnings]', stats.compilation.warnings.toString({
      colors: true
    }))
    console.log('webpack compile success.')
    cb(err)
  })
})

gulp.task('_build-production', ['test', 'html', 'images'], function (cb) {
  // run webpack
  webpack(webpackProductionConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack:errors]', stats.compilation.errors.toString({
      colors: true
    }))
    gutil.log('[webpack:warnings]', stats.compilation.warnings.toString({
      colors: true
    }))
    console.log('webpack compile success.')
    cb(err)
  })
})

// todo: decide if called push or remote
// so far I decided to call it deploy (because the boilerplate, hopes the dev
// sitcks with a PaaS / Heroku kind of)
gulp.task('deploy', function () {
  config.git.remoteList.forEach(function (v, k) {
    git.push(v, ['master'], null, function (err) {
      if (err) {
        throw err
      }
    })
  })
})

gulp.task('unit_test', function (cb) {
  gulp.src('./test/unit_tests/**/*.spec.js', { read: false })
    .pipe(mocha({
      compilers: {
        js: babel
      }
    }))
    .once('end', function () {
      cb()
    })
})

gulp.task('test', ['unit_test'])

gulp.task('openBrowser', function () {
  open('http://localhost:' + port, function (err) {
    if (err) {
      throw err
    }
  })
})

gulp.task('watch', function () {
  gulp.watch('./src/index.html', ['html'])
  gulp.watch('./src/js/**/*.js', ['test'])
  gulp.watch('./src/js/**/*.js')
    .on('change', function (ev) {
      return gulp.src('./src/js' + ev.path.split('src/js')[1])
        .pipe(standard())
        .pipe(standard.reporter('default', {
          breakOnError: true,
          quiet: true
        }))
    })
  gulp.watch('./src/images/**/*', ['images'])
})

gulp.task('node-server', function (cb) {
  var cmd = spawn('node', ['server.js'], { stdio: 'inherit' })
  cmd.on('close', function (code) {
    console.log('my-task exited with code ' + code)
    cb(code)
  })
})

gulp.task('preview', function (cb) {
  var cmd = spawn('node', ['server.js'], { stdio: 'inherit' })

  cmd.on('close', function (code) {
    console.log('my-task exited with code ' + code)
    cb(code)
  })

  setTimeout(function () {
    open('http://localhost:' + port, function (err) {
      if (err) throw err
    })
  }, 1800)
})

gulp.task('banner', function () {
  clear()
  console.log(
    chalk.magenta(
      figlet.textSync('Reactatouille', { horizontalLayout: 'full' })
    ),
    chalk.yellow.bold('\n' + ' ' + 'Boilerplate'),
    chalk.yellow('by Punkbit'),
    '\n',
    '\n'
  )
})

gulp.task('clean', function () {
  return gulp.src(getDistributionDir(), { read: false })
      .pipe(clean({force: true}))
})

gulp.task('standardjs', function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('server-script-transpiler', function () {
  return gulp.src('./server.dev.js')
        .pipe(gbabel({
          presets: ['es2015']
        }))
        .pipe(rename({
          basename: 'server',
          suffix: '.prod',
          extname: '.js'
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.doneCallback = function (err) {
  process.exit(err ? 1 : 0)
}

gulp.task('default', ['banner', 'node-server', 'watch'])
