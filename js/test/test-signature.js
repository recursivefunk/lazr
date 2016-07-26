
require('dotenv').config({ path: 'js/test/test.env' })

const test = require('tape')
const Signature = require('../../index').Signature

test('configuration', (t) => {
  const sig = Signature()
  const isConfigured = sig.isConfigured()
  t.equal(false, isConfigured, 'signature is not configured')
  t.end();
})

