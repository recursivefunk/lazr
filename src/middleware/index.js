
const path = require('path')
const mime = require('mime')
const cuid = require('cuid')
const defaults = require('../lib/defaults')
const Signature = require('../signature')

module.exports = (app, route = '/lazr/signature') => {
  app.use(route, (req, res) => {
    const filename = req.query.filename
    const contentType = mime.getType(filename)
    const ext = path.extname(filename)
    const uniqueKey = cuid()
    const tmpParams = {
      ContentType: contentType,
      Key: `${uniqueKey}${ext}`
    }
    const params = Object.assign(defaults(), tmpParams)
    Signature({ params })
      .gen()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(500).send(err))
  })
}
