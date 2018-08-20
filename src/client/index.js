
const signaturePath = () => (
  Object.create({
    upload (data, name) {
      return new Promise((resolve, reject) => {
        this.getSignature(name)
          .then(spec => {
            upload(data, spec.signedRequest)
              .then(() => resolve(spec.url))
              .catch(err => reject(err))
          })
      })
    },

    getSignature (filename) {
      return new Promise((resolve, reject) => {
        const url = `${signaturePath}?filename=${filename}`
        request({ url })
          .then(result => resolve(result))
          .catch(err => reject(Error(err)))
      })
    }
  })
)

function request (opts) {
  const { method = 'GET' } = opts
  const url = opts.url
  const data = opts.data

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest() // eslint-disable-line
    xhr.open(method, url)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let response
          try {
            response = JSON.parse(xhr.responseText)
          } catch (e) {
            response = xhr.responseText
          }
          resolve(response)
        } else {
          reject(Error('An error has occured'))
        }
      }
    }
    xhr.send(data)
  })
}

function upload (data, url) {
  const method = 'PUT'
  return request({ url, data, method })
}

module.exports = signaturePath
