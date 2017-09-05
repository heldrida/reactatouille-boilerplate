export const styleObjectParser = (str) => {
  var obj = {}
  str.split(';').forEach(function (str) {
    var arr = str.split(':')
    obj[arr[0]] = arr[1]
  })
  return obj
}

export const isBrowser = () => {
  return typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]'
}

export const loadImage = (filename) => {
  if (process.env.NODE_ENV === 'development' &&
      (typeof window !== 'undefined' && ({}).toString.call(window) === '[object Window]')) {
    return require('../../images/' + filename)
  } else {
    return '/assets/images/' + filename
  }
}
