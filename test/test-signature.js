
require('dotenv').config({ path: 'test/test.env' })

const test = require('tape')
const cuid = require('cuid')
const Lazr = require('../src/index')
const getParams = () => ({
  Bucket: process.env.LAZR_BUCKET,
  Key: cuid(),
  Expires: 60,
  ContentType: 'application/javascript',
  ACL: 'public-read'
})

test('signature generation works', (t) => {
  const params = getParams()
  const key = params.Key
  const bucket = params.Bucket
  Lazr.genSig({ params })
    .then((result) => {
      const accessKey = process.env.AMAZON_ACCESS_KEY_ID
      const expectedUrl = `https://s3.amazonaws.com/${bucket}/${key}`
      const signedPrefix = `${expectedUrl}?AWSAccessKeyId=${accessKey}`
      const prefixIndex = result.signedRequest.indexOf(signedPrefix)
      t.equal(result.url, expectedUrl, 'url is correct')
      t.end(0, prefixIndex, 'signature starts with correct value')
    })
    .catch((err) => {
      console.error(err)
      t.fail(err)
    })
})
