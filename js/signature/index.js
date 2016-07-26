
const aws = require('aws-sdk')
const component = require('stampit')

const Signature = component()
  .init(function({ instance }) {
    this._s3 = instance.s3 || new aws.S3()
    this._params = instance.params || {}
  })
  .methods({
    configure({ Expires, ContentType, Key, ACL, Bucket }) {

    },

    isConfigured() {
      return checkConfig(this) ? true : false
    }
  })

module.exports = (opts) => {
  return Signature.create(opts)
}

function checkConfig(ctx) {
  return (ctx._s3 && ctx._params.Key && ctx._params.Key !== '')
}

