
const aws = require('aws-sdk')
const component = require('stampit')

const s3 = new aws.S3()

const Signature = component()
  .init(function() {})
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
  return (ctx._key && ctx._key !== '')
}

