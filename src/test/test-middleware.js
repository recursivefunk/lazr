
require('dotenv').config({ path: 'src/test/test.env' })

const test = require('tape')
const request = require('request')
const express = require('express')
const Lazr = require('../index')
const getExpressApp = () => {
  return express()
}

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
        t.ok(result.signedRequest)
        t.ok(result.url)
        server.close()
        t.end()
      } catch (err) {
        t.fail(err)
      }
    }
  })
})
