
const path = require('path')
const mime = require('mime')
const cuid = require('cuid')
const defaults = require('../lib/defaults')
const Signature = require('../signature')
const signatureRoute = defaults().lazrSignatureRoute

module.exports = (app, route = signatureRoute) => {
  // middleware handler
  app.use(route, (req, res) => {
    // grab our file metadata
    const filename = req.query.filename
    const contentType = mime.getType(filename)
    const ext = path.extname(filename)
    // generate a random key if one wasn't passed along
    const uniqueKey = req.query.key || cuid()
    const tmpParams = {
      ContentType: contentType,
      Key: `${uniqueKey}${ext}`
    }
    // Use the params we've found. Anything not specified, use the
    // default value
    const params = Object.assign(defaults(), tmpParams)
    Signature({ params })
      .gen()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).send(err))
  })
}
