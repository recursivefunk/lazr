
exports.client = require('./client')

exports.genSig = opts => require('./signature')(opts).gen()

exports.attach = require('./middleware')

function isServer() {
  return !(typeof window != 'undefined' && window.document)
}
