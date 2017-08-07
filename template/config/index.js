/*
 * Create separate clientSideOnly config file, to NOT expose credentials or other private data
 */
var config = {
  param1: '', // example
  param2: process.env.NODE_ENV === 'production' ? 'foo' : 'bar', // example
  git: {
    remoteList: ['origin', 'heroku'] // add any other remotes here
  },
  appName: 'reactatouille Boilerplate', // your app name here
  buildName: 'Reactatouille Boilerplate' + ' | ' + (process.env.NODE_ENV || 'development') + ' | ' + '201708041331',
  defaultPort: 3000,
  myParamNotForClientSide: {
    prop1: 'foobar',
    prop2: 'barfoo'
  }
}

module.exports = config

