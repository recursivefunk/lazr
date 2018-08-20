
const aws = require('aws-sdk')

/**
 * Generate a signed URL for uploading and return it to the client
 *
 * @param s3 an instance of the aws.S3 class
 * @param params parameters for the S3
 *
 */
const Signature = function ({ s3 = new aws.S3(), params = {} }) {
  return Object.create({
    gen () {
      return new Promise((resolve, reject) => {
        if (!this.isConfigured()) {
          return reject(Error(`You must configure a key for this signature`))
        }
        if (params.lazrSignatureRoute) {
          delete params.lazrSignatureRoute
        }
        s3.getSignedUrl('putObject', params, (err, data) => {
          if (err) {
            return reject(err)
          }
          const bucket = params.Bucket
          const key = params.Key
          resolve({
            signedRequest: data,
            url: `https://s3.amazonaws.com/${bucket}/${key}`
          })
        })
      })
    },

    isConfigured () {
      return (s3 && params.Key && params.Key !== '')
    }
  })
}

module.exports = Signature
