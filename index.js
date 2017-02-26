// TODO: refactor and import from /lib directory instead
// the `./template` is only for the current dev environment
// has it requires the correct context that is failing at the moment
// because of the symlink of npm link
module.exports = {
  loadImage: function (filename) {
    var img
    if (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]') {
      try {
        img = require('../../src/images/' + filename)
      } catch (e) {
        // Development only
        img = require('./template/src/images/' + filename)
      }
    } else {
      img = '/assets/images/' + filename
    }
    return img
  },
  isBrowser: function () {
    return (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]')
  }
}
