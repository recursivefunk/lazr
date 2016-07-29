
exports.client = () => {
  // Uploader for the browser
  return require('./client')
}

exports.genSig = (opts) => {
  const Signature = require('./signature')
  return Signature(opts).gen()
}

exports.attach = require('./middleware')
