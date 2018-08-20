
const env = require('good-env')

env.ensure('LAZR_BUCKET')

module.exports = () => ({
  Bucket: env.get('LAZR_BUCKET'),
  Expires: env.getNumber('LAZR_EXPIRES', 60),
  ACL: env.get('LAZR_ACL', 'private'),
  lazrSignatureRoute: env.get('LAZR_SIGNATURE_ROUTE', '/lazr/signature')
})
