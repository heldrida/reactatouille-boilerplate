# Reaclux Boilerplate

A React Redux Webpack Gulp Sass Mocha Enzyme Chai Boilerplate

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
Clone the repository to your local environment, install any dependencies and install the packages. Run the development command to start a local server, run the test command to run unit tests and the build command to create a new version for release.
Use the `config.js` in the root to set any parameters, such as the `repository remote list`, it's recommended to use a PaaS like Heroku or alike to easy deployment.

### Prerequisities

```
NodeJS + NPM
```

### Installing

```
npm install
```

### Build for distribution

You must run the build commands to generate a bundle js, css, images, fonts, etc, to distribute it into your test, staging or production environments. To so, you can run the commands below, that will generate the files under the `/dist` directory.

```
gulp build --env staging
```

Or,

```
gulp build --env production
```

### Development

```
gulp
```

### Test runner

```
gulp test
```

### Tests

The tests are split in two different categories, Unit and End-to-end (integration) tests. These are run separately, there are two different tasks for that matter: `gulp unit_test` & `gulp end2end_test`. 

### Preview the app for distribution

Run the command below to create a small web server to serve the app that exists for distribution ( remember to run the build command to create the `dist` directory for the desired `environment`).

```
gulp preview --env staging
```

Or

```
gulp preview --env production
```

### Build architecture

Find the source code under the `src` directory for javascript and `sass` for the stylesheets. Before modifying ensure that the development watcher is running by running the development watch command (see development notes). The `dist` directory holds the files ready for distribution.

## Built With

* ReactJS
* Webpack
* SASS
* ES2015
* GULP
* MOCHA
* CHAI
* ENZYME
* ZOMBIEJS

### References

	> Warning: [react-router] You cannot change ; it will be ignored

		https://github.com/gaearon/react-hot-loader/issues/298#issuecomment-262115089
		https://github.com/gaearon/react-hot-loader/issues/298#issuecomment-262115089


	> Testing Reactjs components:

		https://facebook.github.io/react/docs/test-utils.html
		http://airbnb.io/enzyme/index.html
		http://chaijs.com/
		https://medium.com/@jerrymao/testing-react-js-components-with-enzyme-mocha-and-chai-534c7f000976#.nafxdk7pj
		http://www.bebetterdeveloper.com/coding/getting-started-react-mocha.html
		https://medium.freecodecamp.com/react-unit-testing-with-mocha-and-enzyme-77d18b6875cb#.eynaminv6
		https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha

### Todo

	> Implement Sinonjs:

		http://sinonjs.org/

	> Implement flow: static type checker for javascript

		https://flowtype.org/
