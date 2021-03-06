
# Lazr

[![Circle CI](https://circleci.com/gh/recursivefunk/lazr.png?circle-token=09d1018ae7992b0d555c1e3b78c138d054e9236f)](https://circleci.com/gh/recursivefunk/lazr)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

![laser](https://media2.giphy.com/media/RGz2rvIfZ9hU4/200.gif)


## Quick Start

You'll need to configure your environment

```
export AMAZON_ACCESS_KEY_ID=myaccesskeyid
export AMAZON_SECRET_ACCESS_KEY=mysecretaccesskey
export LAZR_BUCKET=mybucket
export LAZR_ACL=private
export LAZR_SIGNATURE_ROUTE=/lazr/signature
```

Use Lazr's middleware in your server

```javascript
const app = require('express')()
const Lazr = require('lazr')
const path = '/lazr/signature'
let server

// GET requests to /lazr/signature/?filename=foo.png will generate
// an upload signature and url and return it via the response. Here's
// where you also pass in the path at which lazr will listen for signature 
// requests. `path` is not required - '/lazr/signature' is the default
// value
Lazr.attach(app, path)

server = app.listen(3000)
```

## More Control

You may want to manually generate signatures to have more control over S3 parameters. Also, mime types are generated using [node-mime](https://github.com/broofa/node-mime) so if you need more control over that process, you can mount your own route

```javascript
const Lazr = require('lazr')

app.get('/lazr/signature', (req, res) => {
  const filename = req.params.filename
  const filetype = determineFiletypeSomehow(filename)
  const params = {
    Bucket: process.env.LAZR_BUCKET,
    Key: generateUniqueKeySomehow(filename),
    Expires: 60, // default
    ContentType: filetype,
    ACL: 'public-read' // default is 'private'
  }

  Lazr.generateSignature({ params })
    .then(result => {
      // result.url, result.signedRequest
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})
```

On the client

```javascript
import { client } from 'lazr'

// Pass in the signature endpoint configured on the server. 
// If you use the default `/lazr/signature` you don't have 
// to pass in anything
client('/lazr/signature')
   // Assume file is a File object. Read more at
   // https://developer.mozilla.org/en-US/docs/Web/API/File
  .upload(file, file.name)
    .then(url => $(`#image`).attr('src', url))
    .catch(err => alert('oh no!'))
```
