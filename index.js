module.exports = {
  loadImage: function (filename) {
    var img
    if (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]') {
      img = require('../../src/images/' + filename) /* require('./template/src/images/' + filename) */
    } else {
      img = '/assets/images/' + filename
    }
    return img
  }
}
