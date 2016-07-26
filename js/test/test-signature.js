
require('dotenv').config({ path: 'js/test/test.env' })

const test = require('tape')
const cuid = require('cuid')
const Signature = require('../../index').Signature
const getParams  = () => {
                  return {
    Bucket: process.env.LAZR_BUCKET,
    Key: cuid(),
    Expires: 60,
    ContentType: 'application/javascript',
    ACL: 'public-read'
  }
}

test('configuration is false when not configured', (t) => {
  const sig = Signature()
  let isConfigured = sig.isConfigured()
  t.equal(false, isConfigured, 'signature is not configured')
  t.end();
})

test('configuration is true when configured', (t) => {
  const params = getParams()
  const sig = Signature({ params })
  let isConfigured = sig.isConfigured()
  t.equal(true, isConfigured, 'signature is configured')
  t.end();
})

test('signature generation works', (t) => {
  const params = getParams()
  const sig = Signature({ params })
  const key = params.Key
  const bucket = params.Bucket
  sig.gen()
    .then((result) => {
      const accessKey = process.env.AMAZON_ACCESS_KEY_ID
      const expectedUrl = `https://${bucket}.s3.amazon.com/${key}`
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


