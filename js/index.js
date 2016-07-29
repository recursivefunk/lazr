
if (!isServer) {
  exports.client = require('./client')
}

exports.genSig = function (opts) {
  return require('./signature')(opts).gen()
}

exports.attach = require('./middleware')

function isServer() {
  return !(typeof window != 'undefined' && window.document)
}
