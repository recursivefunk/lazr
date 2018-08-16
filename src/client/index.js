
import P from 'bluebird'

export default (signaturePath) => {
  return Object.create({
    upload(data, name) {
      return new P((resolve, reject) => {
        this.getSignature(name).then(performUpload)

        function performUpload(spec) {
          upload(data, spec.signedRequest)
            .then(() => resolve(spec.url))
            .catch((err) => reject(err))
        }
      })
    },

    getSignature(filename) {
      return new P((resolve, reject) => {
        const url = `${signaturePath}?filename=${filename}`
        request({ url })
          .then((result) => resolve(result))
          .catch((err) => {
            reject(Error(err))
          })
      })
    },
  })
}

function request(opts) {
  const { method = 'GET' } = opts
  const url = opts.url
  const data = opts.data

  return new P((resolve, reject) => {
    const xhr = new XMLHttpRequest()
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

function upload(data, url) {
  const method = 'PUT'
  return request({ url, data, method })
}
