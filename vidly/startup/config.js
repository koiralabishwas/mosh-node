const config = require('config')
const error = require('../middleware/error')

module.exports = function () {
  if (!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR : JWT Private Key is not defined ')
  }
}