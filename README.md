[![Build Status](https://travis-ci.org/heldrida/reactatouille-boilerplate.svg?branch=master)](https://travis-ci.org/heldrida/reactatouille-boilerplate)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

<p align="center" style="margin: 30px 0;">
  <img src="https://raw.githubusercontent.com/heldrida/reactatouille-boilerplate/master/template/src/images/logo-reactatouille-boilerplate.png?201701241142" height="200">
</p>
<p align="left">
	Reactatouille is a command-line tool to help quickly start and build a new React project, <code>using Redux, Webpack, Gulp (You can add your own tasks, yo!), HMR/Hot Module Reload, Sass (architecture best practices), Jest, Enzyme, gsap and the Express server</code>.
</p>

### Pre-requisities

```
Nodejs & NPM
```

## Getting Started

These instructions will get you a copy of the command line tool, that you'll be able to use to generate or quick start a new project boilerplate. To do so please run the command below, that will install `reactatouille` has a global:

```
npm install -g reactatouille
```

## Quick look

<p align="center" style="margin: 30px 0;">
  <img align="center" src="https://raw.githubusercontent.com/heldrida/reactatouille-boilerplate/master/media/cli-gif-animation.gif?201702281714" width="500">
</p>

## Usage

The following command will generate a new boilerplate for you in your desired location:

```
reactatouille [project name]
```

It'll generate the `project_name` directory for  you, with all the Boilerplate template files, where you'll also find a README file containing further instructions to: run the development server, build for staging or production, test, etc.

To generate a new Component, make sure you are in the Project root, src or js directory, then run the command:

```
reactatouille -c <Name...>
```

or, more verbose

```
reactatouille --create-component <Name...>
```

A new component is generated in the [projectRoot]/src/js/<newComponent>. This is work in progress, so you still have to make modifications, such as, include the reducer for this component (if required) in [projectRoot]/src/js/rootReducer.js and also change the name in the <newComponent>/constants.js, etc.

## Organizing the Redux application

The first time you browse the javascript source directory you may find the way files are organized unusual. The approach Reactatouille exposes is based on an article published by Jack Hsu; A very good read, that explains how to better organize code in the context of a React and Redux application but not exclusively ( https://jaysoo.ca/2016/02/28/organizing-redux-application/ ). While opinionated, you may want to organize it differently, as it was in previous versions of Reactatouille.

## Built With

* ReactJS
* React Router 4
* Webpack 2
* SASS
* ES2015
* GULP
* JEST
* ENZYME
* GSAP
* STANDARDJS
* UNIVERSAL / ISOMORPHIC
* REDUX DEVTOOLS (Browser extension support)

### Logo

<div>Icon Transformed from the original made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
