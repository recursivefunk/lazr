const mime = require('mime')
const defaults = require('../lib/defaults')
const Signature = require('../signature')

module.exports = (app, path='/lazr/signature') => {
  app.use(path, (req, res) => {
    const filename = req.query.filename
    const contentType = mime.lookup(filename)
    const tmpParams = {
      ContentType: contentType,
      Key: filename
    }
    const params = Object.assign(defaults(), tmpParams);
    Signature({ params }).gen()
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => res.status(500).send(err))
  })
}
