
const signaturePath = () => (
  Object.create({
    /**
     * Upload the given data and use the specified name as the file name
     *
     * @param data The data to be uploaded
     * @param name The file name to be used
     *
     */
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

    /**
     * Requests a signed URL from our server to which we can send a PUT
     * request with our file as a payload
     *
     * @param filename The name of the file we want to use
     *
     */
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

/**
 * Send a HTTP request using XMLHttpRequest. Use the specified method
 *
 * @param opts Options for the HTTP request such as method, url, and
 * optional data
 *
 */
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

/**
 * Send a PUT request with the specified data to the specified URL
 *
 * @param data Data to be uploaded
 * @param url The target URL for the PUT request
 *
 */
function upload (data, url) {
  const method = 'PUT'
  return request({ url, data, method })
}

module.exports = signaturePath
