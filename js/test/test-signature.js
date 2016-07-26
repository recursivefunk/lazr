
require('dotenv').config({ path: 'js/test/test.env' })

const test = require('tape')
const cuid = require('cuid')
const aws = require('aws-sdk')
const Signature = require('../../index').Signature
const getParams  = () => {
  return {
    BUCKET: process.env.LAZR_BUCKET,
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

