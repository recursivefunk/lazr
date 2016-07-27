
exports.client= () => {
  // Uploader for the browser
  return require('./lazr')
}
exports.signature = require('./signature')
exports.attach = require('./middleware')
