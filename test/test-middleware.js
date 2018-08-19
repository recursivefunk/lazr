
require('dotenv').config({ path: 'test/test.env' })

const test = require('tape')
const request = require('request')
const express = require('express')
const env = require('good-env')
const Lazr = require('../src/index')
const getExpressApp = () => express()
const bucket = env.get('LAZR_BUCKET')

test('it works', (t) => {
  let server
  const app = getExpressApp()
  const key = 'foo.js'
  const path = '/lazr/signature'
  const query = `?filename=${key}`
  Lazr.attach(app)
  server = app.listen(4000)

  request(`http://localhost:4000${path}${query}`, (err, res, body) => {
    if (err) {
      t.fail(err)
    } else {
      let result
      try {
        result = JSON.parse(body)
        t.equals(
          result.signedRequest.startsWith(`https://${bucket}.s3.amazonaws.com`),
          true,
          'Signed request points to correct bucket'
        )
        t.equals(
          result.url.startsWith(`https://s3.amazonaws.com/${bucket}`),
          true,
          'URL is OK'
        )
        server.close()
        t.end()
      } catch (err) {
        t.fail(err)
      }
    }
  })
})
