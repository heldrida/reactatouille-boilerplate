/* 
  This effectively filters the server config and spits out only stuff needed by the client
  https://github.com/lorenwest/node-config/wiki/Webpack-Usage
 */
const config = require('config')
const _ = require('lodash')
const blackList = ['myParamNotForClientSide'] // keys we don't want on the client, can be dot notation to reference deep keeps
const clientConfig = _.cloneDeep(config)
blackList.forEach(blacklistItem => {
  var keyToDelete = clientConfig
  blacklistItem.split('.').forEach((branch, i, a) => {
    if (i === a.length - 1) {
      delete keyToDelete[branch]
    } else {
      keyToDelete = keyToDelete[branch]
    }
  })
})
module.exports = clientConfig
