
exports.client= () => {
  // Uploader for the browser
  return require('./client')
}
exports.signature = require('./signature')
exports.attach = require('./middleware')
