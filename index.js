// TODO: refactor and import from /lib directory instead
// the `./template` is only for the current dev environment
// has it requires the correct context that is failing at the moment
// because of the symlink of npm link
// NOTE:  set the NPM_PACKAGE_DEV by running the command, than initialize the node server
// http://stackoverflow.com/questions/42473864/work-around-to-unsolved-npm-link-symlink-requires/42476085
module.exports = {
  loadImage: function (filename) {
    if (process.env.NODE_ENV === 'development' && (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]')) {
      return (process.env.NPM_PACKAGE_DEV === 1 && require('./template/src/images/' + filename) ||
            require('../../src/images/' + filename))
    } else {
      return '/assets/images/' + filename
    }
  },
  isBrowser: function () {
    return (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]')
  }
}
