
# Lazr [WIP]

## JavaScript

Server

```
export AMAZON_ACCESS_KEY_ID=myaccesskeyid
export AMAZON_SECRET_ACCESS_KEY=mysecretaccesskey
export LAZR_BUCKET=mybucket
```

Attach to your express server

```javascript
let server
const express = require('express')
const Lazr = require('lazr')

// Requests to /lazr/signature/?filename=foo.png will generate 
// an upload signature and url and return it via the response
Lazr.attach(app, [path='/lazr/signature']/*path is optional*/)

server = app.listen(3000)
```

You may want to manually generate signatures to have more control over S3
parameters. Also, mime types are generated using [node-mime](https://github.com/broofa/node-mime) 
so if you need more control over that process, you can mount your own route 

```javascript
const Lazr = require('lazr')

app.get('/signature', (req, res) => {
  const filename = req.params.filename
  const filetype = determineFiletypeSomehow(filename)
  const params = {
    Bucket: process.env.LAZR_BUCKET,
    Key: filename,
    Expires: 60, // default
    ContentType: filetype,
    ACL: 'public-read' // default
  }

  Lazr.genSig({ params })
    .then((result) => {
      // result.url, result.signedRequest
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})
```

