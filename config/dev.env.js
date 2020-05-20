var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_CAS: '"/cas"',
  API_POS: '"/pos"',
  API_OTHER: '"/interfacePlatform"',
  API_MOXIE: '"/moxie"',
})
