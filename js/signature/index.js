
const aws = require('aws-sdk')
const component = require('stampit')
const P = require('bluebird')

const Signature = component()
  .init(function({ instance }) {
    this._s3 = instance.s3 || new aws.S3()
    this._params = instance.params || {}
  })
  .methods({
    gen() {
      return new P((resolve, reject) => {
        if (!this.isConfigured()) {
          return reject(`You must configure a key for this signature`)
        }
        this._s3.getSignedUrl('putObject', this._params, (err, data) => {
          if (err) {
            return reject(err)
          }
          const bucket = this._params.Bucket
          const key = this._params.Key
          resolve({
            signedRequest: data,
            url: `https://${bucket}.s3.amazon.com/${key}`
          })
        })
      })
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

