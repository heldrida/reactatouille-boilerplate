const arrayToTxtFile = require('array-to-txt-file')
const path = require('path')
const findUp = require('find-up')
const fs = require('fs')
var filePath
var chalk = require('chalk')
var figlet = require('figlet')

module.exports = function (name, errCallback) {
  function readFile (filePath, strToInsert, cb) {
    fs.readFile(filePath, function (err, f) {
      if (err) {
        return false
      }
      const array = f.toString().split('\n')
      if (typeof cb === 'function') {
        cb(array, strToInsert)
      }
    })
  }

  function arrayToTextFile (fileArray) {
    arrayToTxtFile(fileArray, filePath, err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(chalk.yellow(' ' + 'Updated the rootReducer.js with the new component info!'))
      console.log('\n')
    })
  }

  function findNeedle (textArr, needle) {
    var index
    for (var i = 0; i < textArr.length; i++) {
      if (isNeedle(needle, textArr[i])) {
        index = i
      }
    }
    return index
  }

  function isNeedle (needle, text) {
    return text.indexOf(needle) > -1
  }

  function insertAtIndex (textArr, index, strToInsert) {
    textArr.splice(index + 1, 0, strToInsert)
    return textArr
  }

  function handleFile (textArr, strToInsert) {
    try {
      const index1 = findNeedle(textArr, 'const rootReducer')
      const index2 = findNeedle(textArr, "from 'react-router-redux'")
      const resArr1 = insertAtIndex(textArr, index1, strToInsert[0])
      const resArr2 = insertAtIndex(resArr1, index2, strToInsert[1])
      arrayToTextFile(resArr2, filePath)
    } catch (e) {
      throw new Error('HandleFile Error: File not generated!')
    }
  }

  function getReducerTextInsert (name) {
    return '[' + name + '.constants.NAME]: ' + name + '.reducer'
  }

  var tabSpace = '  '
  var strToInsert = []
  strToInsert[0] = getReducerTextInsert(name)
  strToInsert[0] = tabSpace + strToInsert + ','
  strToInsert[1] = 'import ' + name + ' from \'./' + name + '\''

  findUp(['src/js/rootReducer.js']).then(function (path) {
    if (path) {
      filePath = path
      readFile(filePath, strToInsert, handleFile)
    } else {
      errCallback()
    }
  })
}
