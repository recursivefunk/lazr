
# Lazr [WIP]

## JavaScript

Server

```
export AMAZON_ACCESS_KEY_ID=myaccesskeyid
export AMAZON_SECRET_ACCESS_KEY=mysecretaccesskey
export LAZR_BUCKET=mybucket
```

To generate signatures yourself

```javascript
const Signature = require('lazr').signature

app.get('/signature', (req, res) => {
  const filename = req.params.filename
  const filetype = req.params.filetype
  const params = {
    Bucket: process.env.LAZR_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: filetype,
    ACL: 'public-read'
  }

  signature({ params }).gen()
    .then((result) => {
      // result.url, result.signedRequest
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})
```

Attach to your express server

```javascript
const express = require('express')
const Lazr = require('lazr')
const server = app.listen(3000)

// Requests to /lazr/signature/?filename=foo.png will generate 
// an upload signature and url and return it via the response
Lazr.attach(app, [path='/lazr/signature']/*path is optional*/)
```
