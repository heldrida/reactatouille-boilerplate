var config = {
  param1: '', // example
  param2: process.env.NODE_ENV === 'production' ? 'foo' : 'bar', // example
  git: {
    remoteList: ['origin', 'heroku'] // add any other remotes here
  },
  app_name: 'reactatouille Boilerplate', // your app name here
  build_name: 'Reactatouille Boilerplate' + ' | ' + (process.env.NODE_ENV || 'development') + ' | ' + '201702062335'
}

// Modified production configuration parameters
if (process.env.NODE_ENV === 'production') {
  config.param1 = 'valueProduction'
}

module.exports = config
