
exports.client = require('./client')

exports.generateSignature = opts => require('./signature')(opts).gen()

exports.attach = require('./middleware')

function isServer() {
  return !(typeof window != 'undefined' && window.document)
}
